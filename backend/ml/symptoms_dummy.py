import sys
import random
import json

def predict():
    # deseases = ["Fauleritis", "morbus stinkefuß", "Kotzeritis", "Idiotie", "schnupfige malicus", "tropische Darmwinde", "lokale Gesichtsdystopie", "massive Hirnfehlstellung", "chronische kognitive Blockade"]
    codes =  ["00581", "00804", "01186", "0309", "03840", "0389", "04104", "04184", "05371", "07020", "07054", "0778", "07953", "08882"]
    found = []
    for i in range(5):
        entry = {
                "icd9_code": random.choice(codes),
                "accuracy": round(random.uniform(0,1), 2)
            }
        found.append(entry)
    res = {"deseases": found}
    print(json.dumps(res))
    return json.dumps(res)

if __name__ == '__main__':
    # predict(sys.argv[1])
    predict()