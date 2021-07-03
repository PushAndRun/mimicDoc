import sys
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
import numpy as np
from joblib import load
import warnings
import json

warnings.filterwarnings("ignore")

path = os.getcwd()
os.chdir(path+"/ml/")

def predict(input=''):
    """
    Returns  5 diagnoses with the highest prediction

    Args:
        input: a string of space separated symptoms
        "78009 78820 79902"
    Returns:
        a tuple of 5 diagnoses
        ""('25000', '4019', '41401', '42731', '4280')""
    """

    mlb = load('diagnoses_enc.pkl')
    clf = load('LogReg_pipeline.joblib')

    ans = clf.predict_proba([input])
    ans = ans[0]
    idx = (-ans).argsort()[:5]
    ans = np.zeros(4121)
    ans[idx] = 1
    ans = ans.astype(int)
    ans = np.reshape(ans, (1, 4121))
    ans = mlb.inverse_transform(ans)[0]

    output = json.dumps(list(ans))
    print("{\"diagnoses\" : "+output+"}")

    return ans

if __name__ == '__main__':
    predict(sys.argv[1])