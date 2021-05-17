// path mit dem er aufgerufen wurde: /api/request
var express = require('express')
var router = express.Router()
const diagnoses = require('../endpoints').csvData
const DiagnosisModel = require('./DiagnosisModel')
const Patient = require('../patients/PatientModel')
const RequestModel = require('./RequestModel')
const verifyToken = require('../auth/VerifyToken')
//const predict = require('../../ml/predict')

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



router.post('/', verifyToken, async (req,res,next) => {
    // Patient in der DB Suchen mit Name und GebDatum
    let newPatient = await Patient.findOne({name: req.body.patient.name, "medicalData.dateOfBirth": req.body.patient.dateOfBirth})
    console.log(newPatient)
    console.log(req.body)
    // Patient anlegen
    // Wenn Patient noch nicht angelegt wurde (check mit name+geburtsdatum)
    if(!newPatient){
        newPatient  = await Patient.create({
            name: req.body.patient.name,
            email: "not implemented in Frontend yet",
            medicalData: {
                dateOfBirth: req.body.patient.dateOfBirth,
                gender: req.body.patient.gender,
                weight: req.body.patient.weight,
                height: req.body.patient.height,
                bloodType: req.body.patient.medicalData.bloodtypes,
                diagnoses: req.body.patient.medicalData.diagnoses
            },
            user: req.userId
        })

    }

    let unconvertedDiagnoses = req.body.patient.medicalData.diagnoses;
    const convertedDiagnoses = [String];
    for (x in unconvertedDiagnoses){
        console.log("looking for:" + x);
        if (!isNaN(x)){
            let diagToNum = null;
            DiagnosisModel.findOne({$or: [{short_title: x}, {long_titel: x}]}, function(err, diagnosisRes){
                if (err) {console.log("error while searching " + x + " in our db" + err)};
                if (!diagnosisRes){console.log(x + ' is not a short_titel diagnosis')};
                diagToNum = diagnosisRes.icd9_code;
                console.log("found " + x + " in Db as" + diagToNum);
            })
            if (diagToNum != null){
                convertedDiagnoses.push(diagToNum)
            }
        }
    }

    // TODO: Prediction von ML einholen - placeholder for now
    // let prediction = predict.predict("76,M,97,76,40,259,5,24,17,37.002880708670915,136,306,232,,0389;78559;5849;4275;41071;4280;6826;4254;2639").split("\n");
    let prediction = [0,14]   //pseudo
    let death_prediction = prediction[0]
    let stay_prediction = prediction[1]

    // Request in der DB ablegen
    RequestModel.create({
        survival: death_prediction,
        stay: stay_prediction,
        bloodpressure: {
            meanbp_mean: req.body.patient.medicalData.bloodpressure.mean,
            meanbp_min: req.body.patient.medicalData.bloodpressure.min,
            meanbp_max: req.body.patient.medicalData.bloodpressure.max
        },
        respiratory: {
            resprate_mean: req.body.patient.medicalData.resprate.mean,
            resprate_min: req.body.patient.medicalData.resprate.min,
            resprate_max: req.body.patient.medicalData.resprate.max
        },
        tempc_mean: req.body.patient.medicalData.temperature.mean,
        glucose: {
            glucose_min: req.body.patient.medicalData.glucose.min,
            glucose_max: req.body.patient.medicalData.glucose.max,
            glucose_mean: req.body.patient.medicalData.glucose.mean
        },
        patient_history: req.body.patient.medicalData.patient_history,
        diagnoses: req.body.patient.medicalData.diagnoses,
        created: new Date(),
        patient: newPatient._id
    }, 
    function (err, request) {
        if (err) {
            console.log(err)
            return res.status(500).send("There was a problem putting the request into DB`.");}
        Patient.findByIdAndUpdate(newPatient._id, { "$push": { "requests": request._id} },
        function (err, patient) {
            if (err) return res.status(500).send("There was a problem updating the patient."+ err);
            return
        });
        // On success send back full request including survival prediction
        res.status(200).send(request);
      })
})

// get all saved requests
router.get('/', verifyToken, async (req,res,next) => {
    //get all Requests
    RequestModel.find({},function (err, requests) {
        if (err) return res.status(500).send("There was a problem registering the user`.");
        res.status(200).send(requests);
      })
})


//Pseudo-Output
router.get('/',(req,res,next) => {
    res.send(`Patient will spend ${getRandomInt(365)} days on ICU with a certainty of ${getRandomInt(100)}%.`)
})

module.exports = router