// path mit dem er aufgerufen wurde: /api/request
var express = require('express')
var router = express.Router()
const DiagnosisModel = require("./DiagnosisModel");
const csv = require('csv-parser')
const fs = require('fs')
const diagnoses = './diagnoses_dict.csv'
let csvData = []

const loadDiagnoses = () => {
    fs.createReadStream(diagnoses)
    .pipe(csv())
    .on('data', (data) => csvData.push(data))
    .on('end', () => { console.log('csv diagnoses loaded')})
}

loadDiagnoses()

const verifyToken = require('../auth/VerifyToken')
const predict = require('../predict');
const { json } = require('express');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

function getRandomProb(max) {
    return Math.floor(Math.random()* 100) / 100

}

router.post('/', (req, res, next) => {
    //res.data = JSON.parse(req.body)
    //if(isEmptyObject(res.data)){
    //    res.status(400).send("empty request");
    //} 
    next()
})

router.post('/', async (req, res, next) => {
    next();
})




//Pseudo-Output
router.post('/', (req, res, next) => {
    console.log("sending pseudo response")
    //let symptoms = req.body.symptoms;
    //let threshold = req.body.threshold;   // uncomment if threshold is wanted
    let symtoms = [];
    let getting_diagnoses = await predict('symptoms_dummy.py', symptoms);
    getting_diagnoses = JSON.parse(getting_diagnoses);
    let whole_diags = [];
    for (let i = 0; i < getting_diagnoses.length; i++) {
        let filteredDiag = csvData.filter(e => e.icd9_code.includes(getting_diagnoses[i].icd9_code));
        if(filteredDiags.length>0){
            whole_diags.push(filteredDiag);
        } else {
            console.log("errror, diag not found");
        }
    }
    let deseases = []
    for (let i = 0; i < getting_diagnoses.deseases.length; i++) {
        let x = getting_diagnoses.deseases[i].icd9_code;
        let x_acc = getting_diagnoses.deseases[i].accuracy;
        // if (x_acc >= threshold){ // uncomment if threshold is wanted
        if (!isNaN(x)) {
            console.log(x + " is a number");
            DiagnosisModel.findOne({ icd9_code: x }, function (err, diagnosisRes) {
                if (err) {
                    console.log("error while searching " + x + " in our db" + err)
                } else if (!diagnosisRes) {
                    console.log(x + ' is not a short_titel diagnosis')
                } else {
                    let diag_short_title = diagnosisRes.short_title;
                    let diag_long_title = diagnosisRes.long_title;
                    console.log("found " + x + " in Db as " + diagT_short_title);
                    let entry = {"icd9_code": x ,
                                "desease_short_title": diag_short_title,
                                "deseases_long_title": diag_long_title,
                                "accuracy": x_acc};
                    deseases.push(entry);
                }
            });
        }
        //}         // uncomment if threshold is wanted
    };
    
    res.send(JSON.stringify({"deseases": deseases}));
})

module.exports = router