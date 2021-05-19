import pandas as pd
import pickle as pk
import sys
import numpy as np
from tensorflow import keras
pd.options.mode.chained_assignment = None

def load_diagnose_data():
    diagnoses = []
    vdiagnoses = []

    with open('ml/db_diagnoses_dict.csv', 'r') as f:

        for line in f:
            diagnoses.append(line.strip("\n").split(",")[0])

    with open('ml/db_patient_history_dict.csv', 'r') as f:

        for line in f:
            vdiagnoses.append(line.strip("\n").split(",")[0])

    return np.asarray(diagnoses[1:]), np.asarray(vdiagnoses[1:])


def diagnoses_to_matrix(diagnoses, patient_history, diagnoses_dict, patient_history_dict):
    Xd = np.zeros((len(diagnoses), len(diagnoses_dict)))

    for i, ds in enumerate(diagnoses):
        lst = str(ds).split(';')

        for d in lst:
            Xd[i][diagnoses_dict == d] = 1

    Xph = np.zeros((len(diagnoses), len(patient_history_dict)))

    for i, phs in enumerate(patient_history):
        lst = str(phs).split(';')

        for ph in lst:
            Xph[i][[patient_history_dict == ph]] = 1

    X = np.concatenate((Xd, Xph), axis=1)
    # X = Xd

    return X


def predict():
    # input = line as a string with the following headers separated by ',':
    # age,gender,weight,meanbp_mean,meanbp_min,meanbp_max,resprate_min,resprate_max,resprate_mean,tempc_mean,
    # glucose_min,glucose_max,glucose_mean,diagnoses,patient_history
    # Bsp.: input = '76,M,97,76,40,259,5,24,17,37.002880708670915,136,306,232,,0389;78559;5849;4275;41071;4280;6826;4254;2639'
    patient_data = sys.argv[1]
    datapoint = np.zeros((453,))
    data = patient_data.split(',')
    datapoint[0] = float(data[0])
    if data[1] == 'M':
        datapoint[1] = 1
    else:
        datapoint[1] = -1
    datapoint[2] = float(data[2])
    datapoint[3] = float(data[3])
    datapoint[4] = float(data[4])
    datapoint[5] = float(data[5])
    datapoint[6] = float(data[6])
    datapoint[7] = float(data[7])
    datapoint[8] = float(data[8])
    datapoint[9] = float(data[9])
    datapoint[10] = float(data[10])
    datapoint[11] = float(data[11])
    datapoint[12] = float(data[12])
    patient_history = [data[13]]
    diagnoses = [data[14]]

    diagnoses_dict, patient_history_dict = load_diagnose_data()
    diagnoses_vector = diagnoses_to_matrix(diagnoses, patient_history, diagnoses_dict, patient_history_dict)

    pca_reload = pk.load(open("ml/pca.pkl", 'rb'))
    v = pca_reload.transform(diagnoses_vector)

    datapoint[13:] = v

    datapoint = datapoint.reshape(1, -1)
    scaler = pk.load(open("ml/scaler.pkl", 'rb'))
    normed_datapoint = scaler.transform(datapoint)

    model_class = keras.models.load_model("ml/model_class")
    result_class = model_class.predict(normed_datapoint)
    print(float(result_class))

    model_reg = keras.models.load_model("ml/model_reg")
    result_reg = model_reg.predict(normed_datapoint)
    print(float(result_reg))
    #sys.stdout.flush()

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    predict()


