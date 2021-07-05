// path mit dem er aufgerufen wurde: /api/request
var express = require("express");
var router = express.Router();
const diagnoses = require("../endpoints").csvData;
const DiagnosisModel = require("./DiagnosisModel");
var User = require("../user/UserModel");
const Patient = require("../patients/PatientModel");
const RequestModel = require("./RequestModel");
const verifyToken = require("../auth/VerifyToken");
const predict = require("../predict");

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function calculateAge(dob) {
  now = new Date();
  var diff = now.getFullYear() - new Date(dob).getFullYear();
  return diff;
}

function convertDiagsToNums(unconvertedDiagnoses) {
  return unconvertedDiagnoses.map((x) => {
    if (isNaN(x)) {
      console.log(x + " is not a number");
      DiagnosisModel.findOne({ short_title: x }, function (err, diagnosisRes) {
        if (err) {
          //console.log("error while searching " + x + " in our db" + err)
        } else if (!diagnosisRes) {
          //console.log(x + ' is not a short_titel diagnosis')
        } else {
          let diagToNum = diagnosisRes.icd9_code.toString();
          console.log("found " + x + " in Db as " + diagToNum);
          return diagToNum;
        }
        return "5";
      });
    } else {
      return x;
    }
  });
}

router.post("/", verifyToken, async (req, res, next) => {
  // Patient in der DB Suchen mit Name und GebDatum
  let newPatient = await Patient.findOne({
    name: req.body.patient.name,
    "medicalData.dateOfBirth": req.body.patient.dateOfBirth,
  });
  // Patient anlegen
  // Wenn Patient noch nicht angelegt wurde (check mit name+geburtsdatum)
  if (!newPatient) {
    newPatient = await Patient.create({
      name: req.body.patient.name,
      email: "not implemented in Frontend yet",
      medicalData: {
        dateOfBirth: new Date(req.body.patient.dateOfBirth),
        gender: req.body.patient.gender,
        weight: req.body.patient.weight,
        height: req.body.patient.height,
        diagnoses: req.body.patient.medicalData["diagnoses"],
      },
      user: req.userId,
    });
    // push patient to user
    User.findByIdAndUpdate(
      req.userId,
      { $push: { patients: newPatient._id } },
      function (err, user) {
        if (err)
          return res
            .status(500)
            .send("There was a problem updating the user." + err);
      }
    );
  }




  let prediction = await predict('predict.py',
      (req.body.patient.patient_id || "") +
      "," +
      (req.body.patient.medicalData.hadm_id || "") +
      "," +
      (req.body.patient.medicalData.icustay_id || "") +
      "," +
      (req.body.patient.medicalData.hospstay_seq || "") +
      "," +
      (req.body.patient.medicalData.total_hospstays || "") +
      "," +
      (req.body.patient.medicalData.length_of_stay_hospital || "") +
      "," +
      (req.body.patient.medicalData.icustay_seq || "") +
      "," +
      (req.body.patient.medicalData.number_of_icu_stays || "") +
      "," +
      (req.body.patient.medicalData.length_of_stay_icu || "") +
      "," +
      (req.body.patient.medicalData.total_length_of_stay_icu || "") +
      "," +
      (req.body.patient.medicalData.days_to_death || "") +
      "," +
      (req.body.patient.medicalData.died_in_hospital || "") +
      "," +
      (calculateAge(newPatient.medicalData.dateOfBirth).toString() || "") +
      "," +
      (req.body.patient.gender || "") +
      "," +
      (req.body.patient.weight || "") +
      "," +
      (req.body.patient.height || "") +
      "," +
      (req.body.patient.medicalData.heartrate.mean || "") +
      "," +
      (req.body.patient.medicalData.heartrate.min || "") +
      "," +
      (req.body.patient.medicalData.heartrate.max || "") +
      "," +
      (req.body.patient.medicalData.meanbp.mean || "") +
      "," +
      (req.body.patient.medicalData.meanbp.min || "") +
      "," +
      (req.body.patient.medicalData.meanbp.max || "") +
      "," +
      (req.body.patient.medicalData.resprate.mean || "") +
      "," +
      (req.body.patient.medicalData.resprate.min || "") +
      "," +
      (req.body.patient.medicalData.resprate.max || "") +
      "," +
      (req.body.patient.medicalData.tempc.mean || "") +
      "," +
      (req.body.patient.medicalData.tempc.min || "") +
      "," +
      (req.body.patient.medicalData.tempc.max || "") +
      "," +
      (req.body.patient.medicalData.spo2.mean || "") +
      "," +
      (req.body.patient.medicalData.spo2.min || "") +
      "," +
      (req.body.patient.medicalData.spo2.max || "") +
      "," +
      (req.body.patient.medicalData.glucose.mean || "") +
      "," +
      (req.body.patient.medicalData.glucose.min || "") +
      "," +
      (req.body.patient.medicalData.glucose.max || "") +
      "," +
      (req.body.patient.medicalData.received_dialysis || "") +
      "," +
      (req.body.patient.medicalData.received_ventilation || "") +
      "," +
      (req.body.patient.medicalData.urineoutput || "") +
      "," +
      (req.body.patient.medicalData.mingcs || "") +
      "," +
      (req.body.patient.medicalData.gcsmotor || "") +
      "," +
      (req.body.patient.medicalData.gcsverbal || "") +
      "," +
      (req.body.patient.medicalData.gcseyes || "") +
      "," +
      (req.body.patient.medicalData.aniongap.min || "") +
      "," +
      (req.body.patient.medicalData.aniongap.max || "") +
      "," +
      (req.body.patient.medicalData.albumin.min || "") +
      "," +
      (req.body.patient.medicalData.albumin.max || "") +
      "," +
      (req.body.patient.medicalData.bands.min || "") +
      "," +
      (req.body.patient.medicalData.bands.max || "") +
      "," +
      (req.body.patient.medicalData.bicarbonate.min || "") +
      "," +
      (req.body.patient.medicalData.bicarbonate.max || "") +
      "," +
      (req.body.patient.medicalData.bilirubin.min || "") +
      "," +
      (req.body.patient.medicalData.bilirubin.max || "") +
      "," +
      (req.body.patient.medicalData.creatinine.min || "") +
      "," +
      (req.body.patient.medicalData.creatinine.max || "") +
      "," +
      (req.body.patient.medicalData.chloride.min || "") +
      "," +
      (req.body.patient.medicalData.chloride.max || "") +
      "," +
      (req.body.patient.medicalData.hematocrit.min || "") +
      "," +
      (req.body.patient.medicalData.hematocrit.max || "") +
      "," +
      (req.body.patient.medicalData.hemoglobin.min || "") +
      "," +
      (req.body.patient.medicalData.hemoglobin.max || "") +
      "," +
      (req.body.patient.medicalData.lactate.min || "") +
      "," +
      (req.body.patient.medicalData.lactate.max || "") +
      "," +
      (req.body.patient.medicalData.platelet.min || "") +
      "," +
      (req.body.patient.medicalData.platelet.max || "") +
      "," +
      (req.body.patient.medicalData.potassium.min || "") +
      "," +
      (req.body.patient.medicalData.potassium.max || "") +
      "," +
      (req.body.patient.medicalData.ptt.min || "") +
      "," +
      (req.body.patient.medicalData.ptt.max || "") +
      "," +
      (req.body.patient.medicalData.inr.min || "") +
      "," +
      (req.body.patient.medicalData.inr.max || "") +
      "," +
      (req.body.patient.medicalData.pt.min || "") +
      "," +
      (req.body.patient.medicalData.pt.max || "") +
      "," +
      (req.body.patient.medicalData.sodium.min || "") +
      "," +
      (req.body.patient.medicalData.sodium.max || "") +
      "," +
      (req.body.patient.medicalData.bun.min || "") +
      "," +
      (req.body.patient.medicalData.bun.max || "") +
      "," +
      (req.body.patient.medicalData.wbc.min || "") +
      "," +
      (req.body.patient.medicalData.wbc.max || "") +
      "," +
      (
        // commented out in case symptoms are not used in prediction
        //req.body.patient.medicalData.symptoms.join(" ") || 
      "") +
      "," +
      (req.body.patient.medicalData.patient_history || "") +
      "," +
      (req.body.patient.medicalData.accident_causes || "") +
      "," +
      (req.body.patient.medicalData.diagnoses || "")
  );


  console.log(req.body.patient.medicalData.symptoms)
  console.log(typeof prediction)  
  console.log("prediction:"+ prediction)
  let death_prediction = prediction[0];
  let stay_prediction = prediction[1];
  console.log(
    "prediction: death: " + death_prediction + " - stay: " + stay_prediction
  );

  // Request in der DB ablegen
  RequestModel.create(
    {
      patient: newPatient._id,
      created: new Date(),
      survival: death_prediction,
      stay: stay_prediction,

      hadm_id: req.body.patient.medicalData.hadm_id,
      icustay_id: req.body.patient.medicalData.icustay_id,
      hospstay_seq: req.body.patient.medicalData.hospstay_seq,
      total_hospstays: req.body.patient.medicalData.total_hospstays,
      length_of_stay_hospital:
        req.body.patient.medicalData.length_of_stay_hospital,
      icustay_seq: req.body.patient.medicalData.icustay_seq,
      number_of_icu_stays: req.body.patient.medicalData.number_of_icu_stays,
      length_of_stay_icu: req.body.patient.medicalData.length_of_stay_icu,
      total_length_of_stay_icu:
        req.body.patient.medicalData.total_length_of_stay_icu,
      days_to_death: req.body.patient.medicalData.days_to_death,
      died_in_hospital: req.body.patient.medicalData.died_in_hospital,

      age: calculateAge(newPatient.medicalData.dateOfBirth),
      gender: req.body.patient.gender,
      weight: req.body.patient.weight,
      height: req.body.patient.height,

      heartrate: {
        mean: req.body.patient.medicalData.heartrate.mean,
        min: req.body.patient.medicalData.heartrate.min,
        max: req.body.patient.medicalData.heartrate.max,
      },
      meanbp: {
        mean: req.body.patient.medicalData.meanbp.mean,
        min: req.body.patient.medicalData.meanbp.min,
        max: req.body.patient.medicalData.meanbp.max,
      },
      resprate: {
        mean: req.body.patient.medicalData.resprate.mean,
        min: req.body.patient.medicalData.resprate.min,
        max: req.body.patient.medicalData.resprate.max,
      },
      tempc: {
        mean: req.body.patient.medicalData.tempc.mean,
        min: req.body.patient.medicalData.tempc.min,
        max: req.body.patient.medicalData.tempc.max,
      },
      spo2: {
        mean: req.body.patient.medicalData.spo2.mean,
        min: req.body.patient.medicalData.spo2.min,
        max: req.body.patient.medicalData.spo2.max,
      },
      glucose: {
        glucose_min: req.body.patient.medicalData.glucose.min,
        glucose_max: req.body.patient.medicalData.glucose.max,
        glucose_mean: req.body.patient.medicalData.glucose.mean,
      },

      received_dialysis: req.body.patient.medicalData.received_dialysis,
      received_ventilation: req.body.patient.medicalData.received_ventilation,

      urineoutput: req.body.patient.medicalData.urineoutput,
      mingcs: req.body.patient.medicalData.mingcs,
      gcsmotor: req.body.patient.medicalData.gcsmotor,
      gcsverbal: req.body.patient.medicalData.gcsverbal,
      gcseyes: req.body.patient.medicalData.gcseyes,

      aniongap: {
        min: req.body.patient.medicalData.aniongap.min,
        max: req.body.patient.medicalData.aniongap.max,
      },
      albumin: {
        min: req.body.patient.medicalData.albumin.min,
        max: req.body.patient.medicalData.albumin.max,
      },
      bands: {
        min: req.body.patient.medicalData.bands.min,
        max: req.body.patient.medicalData.bands.max,
      },
      bicarbonate: {
        min: req.body.patient.medicalData.bicarbonate.min,
        max: req.body.patient.medicalData.bicarbonate.max,
      },
      bilirubin: {
        min: req.body.patient.medicalData.bilirubin.min,
        max: req.body.patient.medicalData.bilirubin.max,
      },
      creatinine: {
        min: req.body.patient.medicalData.creatinine.min,
        max: req.body.patient.medicalData.creatinine.max,
      },
      chloride: {
        min: req.body.patient.medicalData.chloride.min,
        max: req.body.patient.medicalData.chloride.max,
      },
      hematocrit: {
        min: req.body.patient.medicalData.hematocrit.min,
        max: req.body.patient.medicalData.hematocrit.max,
      },
      hemoglobin: {
        min: req.body.patient.medicalData.hemoglobin.min,
        max: req.body.patient.medicalData.hemoglobin.max,
      },
      lactate: {
        min: req.body.patient.medicalData.lactate.min,
        max: req.body.patient.medicalData.lactate.max,
      },
      platelet: {
        min: req.body.patient.medicalData.platelet.min,
        max: req.body.patient.medicalData.platelet.max,
      },
      potassium: {
        min: req.body.patient.medicalData.potassium.min,
        max: req.body.patient.medicalData.potassium.max,
      },
      ptt: {
        min: req.body.patient.medicalData.ptt.min,
        max: req.body.patient.medicalData.ptt.max,
      },
      inr: {
        min: req.body.patient.medicalData.inr.min,
        max: req.body.patient.medicalData.inr.max,
      },
      pt: {
        min: req.body.patient.medicalData.pt.min,
        max: req.body.patient.medicalData.pt.max,
      },
      sodium: {
        min: req.body.patient.medicalData.sodium.min,
        max: req.body.patient.medicalData.sodium.max,
      },
      bun: {
        min: req.body.patient.medicalData.bun.min,
        max: req.body.patient.medicalData.bun.max,
      },
      wbc: {
        min: req.body.patient.medicalData.wbc.min,
        max: req.body.patient.medicalData.wbc.max,
      },

      symptoms: req.body.patient.medicalData.symptoms,
      patient_history: req.body.patient.medicalData.patient_history,
      accident_causes: req.body.patient.medicalData.accident_causes,
      diagnoses: req.body.patient.medicalData.diagnoses,
    },
    function (err, request) {
      if (err) {
        console.log("err:" + err);
        return res
          .status(500)
          .send("There was a problem putting the request into DB`.");
      }
      // update patient with request
      console.log("search patient");
      Patient.findByIdAndUpdate(
        newPatient._id,
        { $push: { requests: request._id } },
        function (err, patient) {
          if (err) {
            console.log("err:" + err);
            return res
              .status(500)
              .send("There was a problem putting the request into DB`.");
          }
          if (!patient) {
            console.log("no patient with this id");
          }
        }
      );
      // return request - can only populate with find
      RequestModel.findById(request._id)
        .populate("patient")
        .exec((err, request) => {
          if (err) {
            console.log("err:" + err);
            return res
              .status(500)
              .send("There was a problem putting the request into DB`.");
          }
          res.status(200).send(request);
        });
    }
  );
});

// get all saved requests
router.get("/", verifyToken, async (req, res, next) => {
  //get all Requests
  RequestModel.find({}, function (err, requests) {
    if (err)
      return res.status(500).send("There was a problem registering the user`.");
    res.status(200).send(requests);
  });
});

//Pseudo-Output
router.get("/", (req, res, next) => {
  res.send(
    `Patient will spend ${getRandomInt(
      365
    )} days on ICU with a certainty of ${getRandomInt(100)}%.`
  );
});

module.exports = router;
