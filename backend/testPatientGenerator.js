const getLine = require("get-line");
const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");
const random_name = require("node-random-name");
const oneYear = 31556952000;

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

//SET NUMBER OF PATIENTS TO READ FROM FILE
let patients_to_read = 100;
let count = 0;
let patientArray = [];

const rowToAPIFormat = (row) => {
    const dateofBirth = new Date(2021-parseInt(row.age),1,1) 
    const gen = row.gender == "M" ? "male":"female"
    const now = new Date()
    const dateofbirth = now.setFullYear(now.getFullYear()-row.age)
    let patient = {
        "name": random_name({random:Math.random, gender:gen}),
        "gender": row.gender,
        "weight": row.weight,
        "height": row.height,
        "dateOfBirth":dateofBirth,
        "medicalData":{
            "bloodtypes":"A",
            "diagnoses":row.diagnoses,
            "hospstay_seq":row.hospstay_seq,
            "total_hospstays": row.total_hospstays,
            "length_of_stay_hospital": row.length_of_stay_hospital,
            "length_of_stay_icu":row.length_of_stay_icu,
            "total_length_of_stay_icu":row.total_length_of_stay_icu,
            "days_to_death":row.days_to_death,
            "received_dialysis":row.received_dialysis,
            "received_ventilation":row.received_ventilation,
            "urineoutput":row.urineoutput,
            "mingcs":row.mingcs,
            "gcsmotor":row.gcsmotor,
            "gcsverbal":row.gcsverbal,
            "gcseyes":row.gcseyes,
            "heartrate":{
                "mean":row.resprate_mean,
                "min":row.resprate_min,
                "max":row.resprate_max
            },
            "meanbp":{
                "mean":row.meanbp_mean,
                "min":row.meanbp_min,
                "max":row.meanbp_max
            },
            "resprate":{
                "mean":row.resprate_mean,
                "min":row.resprate_min,
                "max":row.resprate_max
            },
            "tempc":{
                "mean":row.tempc_mean,
                "min":row.tempc_min,
                "max":row.tempc_max
            },
            "spo2":{
                "mean":row.spo2_mean,
                "min":row.spo2_min,
                "max":row.spo2_max
            },
            "glucose":{
                "mean":row.glulcose_mean,
                "min":row.glucose_min,
                "max":row.glucose_max
            },
            "aniongap":{
                "min":row.aniongap_min,
                "max":row.aniongap_max
            },
            "albumin":{
                "min":row.albumin_min,
                "max":row.albumin_max
            },
            "bands":{
                "min":row.bands_min,
                "max":row.bands_max
            },
            "bicarbonate":{
                "min":row.bicarbonate_min,
                "max":row.bicarbonate_max
            },
            "bilirubin":{
                "min":row.bilirubin_min,
                "max":row.bilirubin_max
            },
            "creatinine":{
                "min":row.creatinine_min,
                "max":row.creatinine_max
            },
            "chloride":{
                "min":row.chloride_min,
                "max":row.chloride_max
            },
            "hematocrit":{
                "min":row.hematocrit_min,
                "max":row.hematocrit_max
            },
            "hemoglobin":{
                "min":row.hemoglobin_min,
                "max":row.hemoglobin_max
            },
            "lactate":{
                "min":row.lactate_min,
                "max":row.lactate_max
            },
            "platelet":{
                "min":row.platelet_min,
                "max":row.platelet_max
            },
            "potassium":{
                "min":row.potassium_min,
                "max":row.potassium_max
            },
            "ptt":{
                "min":row.ptt_min,
                "max":row.ptt_max
            },
            "inr":{
                "min":row.inr_min,
                "max":row.inr_max
            },
            "pt":{
                "min":row.pt_min,
                "max":row.pt_max
            },
            "sodium":{
                "min":row.sodium_min,
                "max":row.sodium_max
            },
            "bun":{
                "min":row.bun_min,
                "max":row.bun_max
            },
            "wbc":{
                "min":row.wbc_min,
                "max":row.wbc_max
            }
        }
    }
    format = {
        "patient":patient
    }
    return format
}

fs.createReadStream("./backend/admissions.csv")
  .pipe(csv())
  .on("data", (row) => {
    if (count < patients_to_read && parseInt(row.age) < 101) {
      patientArray.push(rowToAPIFormat(row));
    }
    count++;
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
    storeData(patientArray, "patientdata100.json");
    writeWrapper();
  });

/// ---- WRITE PATIENTS TO DB
const User = { name: "leon", pw: "leon" };
const url = "http://robodoc.purryto.de:8081/api";
const n_users = 10;

async function getUserToken() {
  return await axios
    .post(url + "/auth/login/", User)
    .then((response) => response.data.token);
}

async function writeWrapper() {
  let token = await getUserToken();

  axios.defaults.headers.common["x-access-token"] = token;

  for (let [index, patient] of patiens.entries()) {
    console.log("rqeuested ", patient)
    if(index >= n_users){
        break;
    }
    try {
      const response = await axios.post(url + "/request", patient);
      //.then(response=>response.data);
    } catch (error) {
      console.log(error);
    }
    await sleep(15000)
  }
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 
