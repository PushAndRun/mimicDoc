import pandas as pd
import pickle as pk
import sys
import numpy as np
from tensorflow import keras

pd.options.mode.chained_assignment = None
np.set_printoptions(threshold=sys.maxsize)


def load_disease_data():
    symptoms = []
    history = []
    diagnoses = []

    with open('../../db/symptoms_dict.csv', 'r') as f:
        for line in f:
            split = line.strip("\n").split(",")
            symptoms.append([split[0], split[1], split[2]])

    with open('../../db/patient_history_dict.csv', 'r') as f:
        for line in f:
            split = line.strip("\n").split(",")
            history.append([split[0], split[1], split[2]])

    with open('../../db/diagnoses_dict.csv', 'r') as f:
        for line in f:
            split = line.strip("\n").split(",")
            diagnoses.append([split[0], split[1], split[2]])

    return np.asarray(symptoms[1:]), np.asarray(history[1:]), np.asarray(diagnoses[1:])


def diseases_to_matrix(symptoms, patient_history, diagnoses, symptoms_dict, patient_history_dict, diagnoses_dict):
    Xs = np.zeros((len(diagnoses), len(symptoms_dict)))

    for i, ss in enumerate(symptoms):
        lst = str(ss).split(';')

        for s in lst:
            Xs[i][symptoms_dict == s] = 1

    Xph = np.zeros((len(diagnoses), len(patient_history_dict)))

    for i, phs in enumerate(patient_history):
        lst = str(phs).split(';')

        for ph in lst:
            Xph[i][patient_history_dict == ph] = 1

    Xd = np.zeros((len(diagnoses), len(diagnoses_dict)))

    for i, ds in enumerate(diagnoses):
        lst = str(ds).split(';')

        for d in lst:
            Xd[i][diagnoses_dict == d] = 1

    X = np.concatenate((Xs, Xph), axis=1)
    X = np.concatenate((X, Xd), axis=1)

    return X

def get_sparse_columns(raw_df, limit):
    print(f"Under {limit * 100}% filled:")
    sparse_columns = []

    for c in raw_df.columns:
        rate = (sum(raw_df[c] == raw_df[c]) / len(raw_df))

    if rate < limit:
        print(f"\t{c}: {rate:.2f}")
        sparse_columns.append(c)

    return sparse_columns

def fill_nan_with_mean(df, column):
    mean_df = pd.read_csv("../../db/admission_means.csv")
    df[column][0] = mean_df[column][0] if df[column][0] == "" else df[column][0]

    return df

def clean_df(raw_df, limit=0.2):
    # copy dataframe
    df = raw_df.copy()

    # pop standard columns
    df.pop('patient_id')
    df.pop('hadm_id')
    df.pop('icustay_id')
    df.pop('hospstay_seq')
    df.pop('icustay_seq')
    df.pop('total_hospstays')
    df.pop('number_of_icu_stays')
    df.pop('length_of_stay_icu')
    df.pop('total_length_of_stay_icu')
    df.pop('accident_causes')

    if(len(df) > 1):
        # pop sparse columns
        sparse_columns = get_sparse_columns(raw_df, limit)

        for c in sparse_columns:
            df.pop(c)

        # pop sparse rows
            df.dropna(thresh=12, inplace=True)

    # fill nan values
    dont_fill = ["symptoms",
                 "patient_history",
                 "diagnoses",
                 "length_of_stay",
                 "died_in_hospital",
                 "gender",
                 "length_of_stay_hospital",
                 "length_of_stay_icu",
                 "days_to_death"]

    for c in df.columns:
        if not c in dont_fill:
            df = fill_nan_with_mean(df, c)

    df.gender[df.gender != df.gender] = 0.5

    print()
    # clean data
    df = df.astype({"age": float,
                            "weight": float,
                            "glucose_max": float,
                            "glucose_mean": float})

    df.age[df.age > 90] = 90
    df.gender[df.gender == 'M'] = 1
    df.gender[df.gender == 'F'] = 0
    df.weight[df.weight > 300] = 300
    df.glucose_max[df.glucose_max > 1000] = 1000
    df.glucose_mean[df.glucose_mean > 1000] = 1000
    df.died_in_hospital[df.died_in_hospital == 't'] = 1
    df.died_in_hospital[df.died_in_hospital == 'f'] = 0


    # extract diseases
    symptoms_raw = df.symptoms
    df.pop('symptoms')
    diagnoses_raw = df.diagnoses
    df.pop('diagnoses')
    patient_history_raw = df.patient_history
    df.pop('patient_history')

    return df, symptoms_raw, diagnoses_raw, patient_history_raw


def predict(input_csv):
    with open("../../db/admissions.csv") as f:
        header_str = f.readline()

    headers = header_str.strip("\n").split(',')
    patient_data = np.asarray(input_csv.strip("\n").split(','))[None, :]

    patient_df = pd.DataFrame(patient_data, columns=headers)
    df, symptoms_raw, diagnoses_raw, patient_history_raw = clean_df(patient_df)

    symptoms_dict, patient_history_dict, diagnoses_dict = load_disease_data()
    diagnoses_vector = diseases_to_matrix(symptoms_raw, patient_history_raw, diagnoses_raw, symptoms_dict[:,0], patient_history_dict[:,0], diagnoses_dict[:,0])

    pca_reload = pk.load(open("pca.pkl", 'rb'))
    v = pca_reload.transform(diagnoses_vector)

    df = pd.concat([df, pd.DataFrame(v)], axis=1)

    dih = df.pop("died_in_hospital")[0]
    losh = df.pop("length_of_stay_hospital")[0]
    df.pop("days_to_death")

    scaler = pk.load(open("scaler.pkl", 'rb'))
    normed_datapoint = scaler.transform(df.values)

    model_class = keras.models.load_model("model_class")
    result_class = model_class.predict(normed_datapoint)

    model_reg = keras.models.load_model("model_reg")
    result_reg = model_reg.predict(normed_datapoint)

    #print(f"actual: {float(result_class):.4f}, expected: {dih}");
    #print(f"actual: {float(result_reg):.4f}, expected: {losh}");

    print(f"died_in_hospital:{float(result_class):.4f}")
    print(f"length_of_stay:{float(result_reg):.4f}")

    return


if __name__ == '__main__':
    predict(sys.argv[1])
