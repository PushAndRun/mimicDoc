// path mit dem er aufgerufen wurde: /api/request
var express = require('express')
var router = express.Router()
const diagnoses = require('../endpoints').csvData
const DiagnosisModel = require('./DiagnosisModel')
var User = require('../user/UserModel');
const Patient = require('../patients/PatientModel')
const RequestModel = require('./RequestModel')
const verifyToken = require('../auth/VerifyToken')
const predict = require('../predict')

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function calculateAge(dob) {
    dt = new Date();
    var diff = dt.getTime() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function convertDiagsToNums(unconvertedDiagnoses) {
    return unconvertedDiagnoses.map(x => {
        if (isNaN(x)) {
            console.log(x + ' is not a number');
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

router.post('/', verifyToken, async (req, res, next) => {
    // Patient in der DB Suchen mit Name und GebDatum
    let newPatient = await Patient.findOne({ name: req.body.patient.name, "medicalData.dateOfBirth": req.body.patient.dateOfBirth })
    console.log(newPatient)
    console.log(req.body)
    // Patient anlegen
    // Wenn Patient noch nicht angelegt wurde (check mit name+geburtsdatum)
    if (!newPatient) {
        newPatient = await Patient.create({
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
        // push patient to user
        User.findByIdAndUpdate(req.userId,
            { "$push": { "patients": newPatient._id } },
            function (err, user) {
                if (err) return res.status(500).send("There was a problem updating the user." + err);
            })

    }

    //res.status(500).send(await convertDiagsToNums(req.body.patient.medicalData.diagnoses));
    //return res.status(500).send(unconvertedDiagnoses);

    // TODO: Prediction von ML einholen - placeholder for now
    // let prediction = await predict("76,M,97,
    // 76,40,259,
    // 5,24,17,
    // 37.002880708670915,
    // 136,306,232,,
    // 0389;78559;5849;4275;41071;4280;6826;4254;2639");
    // format age,gender,weight,meanbp_mean,meanbp_min,meanbp_max,resprate_min,resprate_max,resprate_mean,tempc_mean,glucose_min,glucose_max,glucose_mean,patient_history,diagnoses

    let prediction = await predict("" +
        calculateAge(newPatient.medicalData.dateOfBirth) + "," +
        newPatient.medicalData.gender + "," +
        newPatient.medicalData.weight + "," +
        req.body.patient.medicalData.bloodpressure.mean + "," +
        req.body.patient.medicalData.bloodpressure.min + "," +
        req.body.patient.medicalData.bloodpressure.max + "," +
        req.body.patient.medicalData.resprate.min + "," +
        req.body.patient.medicalData.resprate.max + "," +
        req.body.patient.medicalData.resprate.mean + "," +
        req.body.patient.medicalData.temperature.mean + "," +
        req.body.patient.medicalData.glucose.min + "," +
        req.body.patient.medicalData.glucose.max + "," +
        req.body.patient.medicalData.glucose.mean + "," +
        req.body.patient.medicalData.patient_history.join(";").replace(/\[/g, '').replace(/]/g, '') + "," +
        req.body.patient.medicalData.diagnoses.join(";").replace(/\[/g, '').replace(/]/g, '')
    );
    //let prediction = [0,14]   //pseudo
    let death_prediction = prediction[0]
    let stay_prediction = prediction[1]
    console.log("prediction: death: " + death_prediction + " - stay: " + stay_prediction);

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
                return res.status(500).send("There was a problem putting the request into DB`.");
            }
            request.populate('patient').exec(function (err, request){
                 // On success send back full request including survival prediction
                 res.status(200).send(request);   
                })
        })
})

// get all saved requests
router.get('/', verifyToken, async (req, res, next) => {
    //get all Requests
    RequestModel.find({}, function (err, requests) {
        if (err) return res.status(500).send("There was a problem registering the user`.");
        res.status(200).send(requests);
    })
})


//Pseudo-Output
router.get('/', (req, res, next) => {
    res.send(`Patient will spend ${getRandomInt(365)} days on ICU with a certainty of ${getRandomInt(100)}%.`)
})

module.exports = router