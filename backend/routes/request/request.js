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
    now = new Date();
    var diff = now.getFullYear() - new Date(dob).getFullYear()
    return diff
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
        console.log(req.body.patient.dateOfBirth)
        newPatient = await Patient.create({
            name: req.body.patient.name,
            email: "not implemented in Frontend yet",
            medicalData: {
                dateOfBirth: new Date(req.body.patient.dateOfBirth),
                gender: req.body.patient.gender,
                weight: req.body.patient.weight,
                height: req.body.patient.height,
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

    // format:  hospstay_seq,total_hospstays,length_of_stay_hospital,length_of_stay_icu,total_length_of_stay_icu
    //          days_to_death,age,weight,height,heartrate_mean,heartrate_min,heartrate_max,meanbp_mean,meanbp_min,meanbp_max
    //          resprate_mean,resprate_min,resprate_max,tempc_mean,tempc_min,tempc_max,spo2_mean,spo2_min,spo2_max
    //          glucose_mean,glucose_min,glucose_max,received_dialysis,received_ventilation,urineoutput,mingcs
    //          gcsmotor,gcsverbal,gcseyes,aniongap_min,aniongap_max,albumin_min,albumin_max,bands_min,bands_max
    //          bicarbonate_min,bicarbonate_max,bilirubin_min,bilirubin_max,creatinine_min,creatinine_max
    //          chloride_min,chloride_max,hematocrit_min,hematocrit_max,hemoglobin_min,hemoglobin_max,lactate_min,lactate_max
    //          platelet_min,platelet_max,potassium_min,potassium_max,ptt_min,ptt_max,inr_min,inr_max,pt_min,pt_max
    //          sodium_min,sodium_max,bun_min,bun_max,wbc_min,wbc_max


    let prediction = await predict("" +
        req.body.patient.medicalData.hospstay_seq + "," +
        req.body.patient.medicalData.total_hospstays + "," + // not shure how total should be calculated?
        req.body.patient.medicalData.length_of_stay_hospital + "," +
        req.body.patient.medicalData.length_of_stay_icu + "," +
        req.body.patient.medicalData.total_length_of_stay_icu + "," + // not shure how total should be calculated?
        req.body.patient.medicalData.days_to_death + "," +
        calculateAge(newPatient.medicalData.dateOfBirth) + "," +
        newPatient.medicalData.weight + "," +
        newPatient.medicalData.height + "," +
        req.body.patient.medicalData.heartrate.mean + "," +
        req.body.patient.medicalData.heartrate.min + "," +
        req.body.patient.medicalData.heartrate.max + "," +
        req.body.patient.medicalData.meanbp.mean + "," +
        req.body.patient.medicalData.meanbp.min + "," +
        req.body.patient.medicalData.meanbp.max + "," +
        req.body.patient.medicalData.resprate.mean + "," +
        req.body.patient.medicalData.resprate.min + "," +
        req.body.patient.medicalData.resprate.max + "," +
        req.body.patient.medicalData.tempc.mean + "," +
        req.body.patient.medicalData.tempc.min + "," +
        req.body.patient.medicalData.tempc.max + "," +
        req.body.patient.medicalData.spo2.mean + "," +
        req.body.patient.medicalData.spo2.min + "," +
        req.body.patient.medicalData.spo2.max + "," +
        req.body.patient.medicalData.glucose.mean + "," +
        req.body.patient.medicalData.glucose.min + "," +
        req.body.patient.medicalData.glucose.max + "," +
        req.body.patient.medicalData.received_dialysis + "," +
        req.body.patient.medicalData.received_ventilation + "," +
        req.body.patient.medicalData.urineoutput + "," +
        req.body.patient.medicalData.mingcs + "," +
        req.body.patient.medicalData.gcsmotor + "," +
        req.body.patient.medicalData.gcsverbal + "," +
        req.body.patient.medicalData.gcseyes + "," +
        req.body.patient.medicalData.aniongap.min + "," +
        req.body.patient.medicalData.aniongap.max + "," +
        req.body.patient.medicalData.albumin.min + "," +
        req.body.patient.medicalData.albumin.max + "," +
        req.body.patient.medicalData.bands.min + "," +
        req.body.patient.medicalData.bands.max + "," +
        req.body.patient.medicalData.bicarbonate.min + "," +
        req.body.patient.medicalData.bicarbonate.max + "," +
        req.body.patient.medicalData.bilirubin.min + "," +
        req.body.patient.medicalData.bilirubin.max + "," +
        req.body.patient.medicalData.creatinine.min + "," +
        req.body.patient.medicalData.creatinine.max + "," +
        req.body.patient.medicalData.chloride.min + "," +
        req.body.patient.medicalData.chloride.max + "," +
        req.body.patient.medicalData.hematocrit.min + "," +
        req.body.patient.medicalData.hematocrit.max + "," +
        req.body.patient.medicalData.hemoglobin.min + "," +
        req.body.patient.medicalData.hemoglobin.max + "," +
        req.body.patient.medicalData.lactate.min + "," +
        req.body.patient.medicalData.lactate.max + "," +
        req.body.patient.medicalData.platelet.min + "," +
        req.body.patient.medicalData.platelet.max + "," +
        req.body.patient.medicalData.potassium.min + "," +
        req.body.patient.medicalData.potassium.max + "," +
        req.body.patient.medicalData.ptt.min + "," +
        req.body.patient.medicalData.ptt.max + "," +
        req.body.patient.medicalData.inr.min + "," +
        req.body.patient.medicalData.inr.max + "," +
        req.body.patient.medicalData.pt.min + "," +
        req.body.patient.medicalData.pt.max + "," +
        req.body.patient.medicalData.sodium.min + "," +
        req.body.patient.medicalData.sodium.max + "," +
        req.body.patient.medicalData.bun.min + "," +
        req.body.patient.medicalData.bun.max + "," +
        req.body.patient.medicalData.wbc.min + "," +
        req.body.patient.medicalData.wbc.max
    );
    
    /* 
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
    ); */

    //let prediction = [0,14]   //pseudo
    let death_prediction = prediction[0]
    let stay_prediction = prediction[1]
    console.log("prediction: death: " + death_prediction + " - stay: " + stay_prediction);

    // Request in der DB ablegen
    RequestModel.create({
        survival: death_prediction,
        stay: stay_prediction,
        glucose: {
            glucose_min: req.body.patient.medicalData.glucose.min,
            glucose_max: req.body.patient.medicalData.glucose.max,
            glucose_mean: req.body.patient.medicalData.glucose.mean
        },

        hospstay_seq: req.body.patient.medicalData.hospstay_seq,
        total_hospstays: req.body.patient.medicalData.total_hospstays,
        length_of_stay_hospital: req.body.patient.medicalData.length_of_stay_hospital,
        length_of_stay_icu: req.body.patient.medicalData.length_of_stay_icu,
        total_length_of_stay_icu: req.body.patient.medicalData.total_length_of_stay_icu,
        days_to_death: req.body.patient.medicalData.days_to_death,
        age: calculateAge(newPatient.medicalData.dateOfBirth),

        heartrate:{
            mean: req.body.patient.medicalData.heartrate.mean,
            min: req.body.patient.medicalData.heartrate.min,
            max: req.body.patient.medicalData.heartrate.max
        },
        meanbp:{
            mean: req.body.patient.medicalData.meanbp.mean,
            min: req.body.patient.medicalData.meanbp.min,
            max: req.body.patient.medicalData.meanbp.max
        },
        resprate:{
            mean: req.body.patient.medicalData.resprate.mean,
            min: req.body.patient.medicalData.resprate.min,
            max: req.body.patient.medicalData.resprate.max
        },
        tempc: {
            mean: req.body.patient.medicalData.tempc.mean,
            min: req.body.patient.medicalData.tempc.min,
            max: req.body.patient.medicalData.tempc.max
        },
        spo2: {
            mean: req.body.patient.medicalData.spo2.mean,
            min: req.body.patient.medicalData.spo2.min,
            max: req.body.patient.medicalData.spo2.max
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
            max: req.body.patient.medicalData.aniongap.max
        },
        albumin: {
            min: req.body.patient.medicalData.albumin.min,
            max: req.body.patient.medicalData.albumin.max
        },
        bands: {
            min: req.body.patient.medicalData.bands.min,
            max: req.body.patient.medicalData.bands.max
        },
        bicarbonate: {
            min: req.body.patient.medicalData.bicarbonate.min,
            max: req.body.patient.medicalData.bicarbonate.max
        },
        bilirubin: {
            min: req.body.patient.medicalData.bilirubin.min,
            max: req.body.patient.medicalData.bilirubin.max
        },
        creatinine:{
            min: req.body.patient.medicalData.creatinine.min,
            max: req.body.patient.medicalData.creatinine.max
        },
        chloride: {
            min: req.body.patient.medicalData.chloride.min,
            max: req.body.patient.medicalData.chloride.max
        },
        hematocrit:{
            min: req.body.patient.medicalData.hematocrit.min,
            max: req.body.patient.medicalData.hematocrit.max
        },
        hemoglobin: {
            min: req.body.patient.medicalData.hemoglobin.min,
            max: req.body.patient.medicalData.hemoglobin.max
        },
        lactate: {
            min: req.body.patient.medicalData.lactate.min,
            max: req.body.patient.medicalData.lactate.max
        },
        platelet: {
            min: req.body.patient.medicalData.platelet.min,
            max: req.body.patient.medicalData.platelet.max
        },
        potassium: {
            min: req.body.patient.medicalData.potassium.min,
            max: req.body.patient.medicalData.potassium.max
        },
        ptt: {
            min: req.body.patient.medicalData.ptt.min,
            max: req.body.patient.medicalData.ptt.max
        },
        inr: {
            min: req.body.patient.medicalData.inr.min,
            max: req.body.patient.medicalData.inr.max
        },
        pt: {
            min: req.body.patient.medicalData.pt.min,
            max: req.body.patient.medicalData.pt.max
        },
        sodium: {
            min: req.body.patient.medicalData.sodium.min,
            max: req.body.patient.medicalData.sodium.max
        },
        bun: {
            min: req.body.patient.medicalData.bun.min,
            max: req.body.patient.medicalData.bun.max
        },
        wbc: {
            min: req.body.patient.medicalData.wbc.min,
            max: req.body.patient.medicalData.wbc.max
        },
        patient_history: req.body.patient.medicalData.patient_history,
        diagnoses: req.body.patient.medicalData.diagnoses,
        created: new Date(),
        patient: newPatient._id
    },function (err, request) {
        if (err) {
            console.log("err:"+err)
            return res.status(500).send("There was a problem putting the request into DB`.");
        }
        // update patient with request
        console.log("search patient")
        Patient.findByIdAndUpdate(newPatient._id, { "$push": { "requests": request._id } }, 
        function (err,patient){
            if (err) {
                console.log("err:"+err)
                return res.status(500).send("There was a problem putting the request into DB`.");
            }
            if (!patient){console.log("no patient with this id")} else {console.log(patient)}
        })
        // return request - can only populate with find
        RequestModel.findById(request._id).populate('patient').exec((err, request) => {
            if (err) {
                console.log("err:"+err)
                return res.status(500).send("There was a problem putting the request into DB`.");
            }
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