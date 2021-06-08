import pandas as pd
import pickle as pk
import sys
import numpy as np
from tensorflow import keras
import matplotlib.pyplot as plt
pd.options.mode.chained_assignment = None


def load_disease_data():
    symptoms = []
    history = []
    diagnoses = []

    with open('/content/drive/MyDrive/uni/RoboDoc/db/symptoms_dict.csv', 'r') as f:
        for line in f:
            split = line.strip("\n").split(",")
            symptoms.append([split[0], split[1], split[2]])

    with open('/content/drive/MyDrive/uni/RoboDoc/db/patient_history_dict.csv', 'r') as f:
        for line in f:
            split = line.strip("\n").split(",")
            history.append([split[0], split[1], split[2]])

    with open('/content/drive/MyDrive/uni/RoboDoc/db/diagnoses_dict.csv', 'r') as f:
        for line in f:
            split = line.strip("\n").split(",")
            diagnoses.append([split[0], split[1], split[2]])

    return np.asarray(symptoms[1:]), np.asarray(history[1:]), np.asarray(diagnoses[1:])


def diseases_to_matrix(symptoms, patient_history, diagnoses, symptoms_dict, patient_history_dict, diagnoses_dict):
    Xs = np.zeros((len(diagnoses), len(symptoms_dict)))

    for i, ss in enumerate(symptoms):
        lst = str(ss).split(';')

        for s in lst:
            Xs[i][[symptoms_dict == s]] = 1

    Xph = np.zeros((len(diagnoses), len(patient_history_dict)))

    for i, phs in enumerate(patient_history):
        lst = str(phs).split(';')

        for ph in lst:
            Xph[i][[patient_history_dict == ph]] = 1

    Xd = np.zeros((len(diagnoses), len(diagnoses_dict)))

    for i, ds in enumerate(diagnoses):
        lst = str(ds).split(';')

        for d in lst:
            Xd[i][diagnoses_dict == d] = 1

    X = np.concatenate((Xs, Xph), axis=1)
    X = np.concatenate((X, Xd), axis=1)

    return X


def clean_df(raw_df):
    mean_value_dict = {
        "age": 50.0,
        "gender": 0.5,
        "weight": 70.0,
        "meanbp_mean": 70.0,
        "meanbp_min": 70.0,
        "meanbp_max": 70.0,
        "resprate_min": 70.0,
        "resprate_max": 70.0,
        "resprate_mean": 70.0,
        "tempc_mean": 38.0,
        "glucose_min": 70.0,
        "glucose_max": 70.0,
        "glucose_mean": 70.0,
    }

    df = raw_df.copy()
    df.pop('patient_id')
    df.pop('hadm_id')
    df.pop('icustay_id')
    df.pop('hospstay_seq')
    df.pop('icustay_seq')

    df.age[raw_df.age > 90] = 90
    df.age[raw_df.age == None] = mean_value_dict['age']

    df.gender[raw_df.gender == 'M'] = 1
    df.gender[raw_df.gender == 'F'] = 0
    df.gender[raw_df.gender == None] = mean_value_dict['gender']

    df.weight[raw_df.weight > 300] = 300
    df.weight[raw_df.weight == None] = mean_value_dict['weight']

    df.pop('height')

    df.meanbp_mean[raw_df.meanbp_mean == None] = mean_value_dict['meanbp_mean']
    df.meanbp_min[raw_df.meanbp_min == None] = mean_value_dict['meanbp_min']
    df.meanbp_max[raw_df.meanbp_max == None] = mean_value_dict['meanbp_max']

    df.resprate_min[raw_df.resprate_min == None] = mean_value_dict['resprate_min']
    df.resprate_max[raw_df.resprate_max == None] = mean_value_dict['resprate_max']
    df.resprate_mean[raw_df.resprate_mean == None] = mean_value_dict['resprate_mean']


    df.tempc_mean[raw_df.tempc_mean == None] = mean_value_dict['tempc_mean']

    df.glucose_min[raw_df.glucose_min == None] = mean_value_dict['glucose_min']
    df.glucose_max[raw_df.glucose_max == None] = mean_value_dict['glucose_max']
    df.glucose_mean[raw_df.glucose_mean == None] = mean_value_dict['glucose_mean']

    symptoms_raw = df.symptoms
    df.pop('symptoms')
    diagnoses_raw = df.diagnoses
    df.pop('diagnoses')
    patient_history_raw = df.patient_history
    df.pop('patient_history')

    df.pop('number_of_icu_stays')
    df.pop('length_of_stay_icu')
    df.pop('days_to_death')
    df.pop('length_of_stay_hospital')
    df.pop('died_in_hospital')
    df.pop('total_length_of_stay_icu')

    return df, symptoms_raw, diagnoses_raw, patient_history_raw


def predict():
    # input like in ../../db/admissions.csv
    header_str = "patient_id,hadm_id,icustay_id,hospstay_seq,icustay_seq,age,gender,weight,height,meanbp_mean,meanbp_min,meanbp_max,resprate_min,resprate_max,resprate_mean,tempc_mean,glucose_min,glucose_max,glucose_mean,symptoms,patient_history,diagnoses,length_of_stay_hospital,number_of_icu_stays,length_of_stay_icu,total_length_of_stay_icu,days_to_death,died_in_hospital"

    headers = header_str.split(',')

    patient_data = np.asarray(sys.argv[1].split(','))[None, :]
    print(patient_data.shape)

    patient_df = pd.DataFrame(patient_data, columns=headers)
    df, symptoms_raw, diagnoses_raw, patient_history_raw = clean_df(patient_df)

    symptoms_dict, patient_history_dict, diagnoses_dict = load_disease_data()
    diagnoses_vector = diseases_to_matrix(symptoms_raw, patient_history_raw, diagnoses_raw, symptoms_dict[:,0], patient_history_dict[:,0], diagnoses_dict[:,0])

    """
    pca_reload = pk.load(open("pca.pkl", 'rb'))
    v = pca_reload.transform(diagnoses_vector)
    print(v.shape)

    datapoint[13:] = v
    print(datapoint.shape)

    datapoint = datapoint.reshape(1, -1)
    scaler = pk.load(open("scaler.pkl", 'rb'))
    normed_datapoint = scaler.transform(datapoint)
    print(normed_datapoint.shape)

    model_class = keras.models.load_model("model_class")
    result_class = model_class.predict(normed_datapoint)
    print(float(result_class))

    model_reg = keras.models.load_model("model_reg")
    result_reg = model_reg.predict(normed_datapoint)
    print(float(result_reg))
    """


def print_me(X, predicted, std = 2.3):
    
    """
    Saves an image of a histogram showing the predicted value and it's std.

    Args:
        X: np array consisting of the length of stay of all patients. 
        std: The value of the standard deviation.
        Predicted: The predicted length of stay of the patient.
        
    Returns:
        A saved image with the name "plot.png".
        
    An example of a call would be: print_me(X, 1.27, 2.3)
    where 1.27 is a predicted length of stay returned by the model.
    """ 
    
    plt.figure(figsize=(12,8))
    plt.hist(patients['length_of_stay_hospital'], bins=300, density=True, alpha=1, rwidth=1, color='black')
    plt.axvspan(max(0, predicted - std), predicted, color='r', alpha=0.5, lw=0)
    plt.axvspan(predicted, predicted + std, color='r', alpha=0.5, lw=0)
    plt.xlim(0, min(predicted + 30, 100))
    plt.axvline(predicted, ls='--', c='r', label='Predicted = ' + f'{predicted:0.2f}')
    plt.xlabel("Length of stay", fontsize=15)
    _=plt.legend(loc='upper right', fontsize=15)
    plt.savefig('plot.png', dpi=300, bbox_inches='tight')

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    predict()


