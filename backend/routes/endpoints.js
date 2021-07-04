// path mit dem er aufgerufen wurde: /api
var express = require('express')
var router = express.Router()
const csv = require('csv-parser')
const fs = require('fs')
const diagnoses = './ml/diagnoses_dict.csv'
const symptoms = './ml/symptoms_dict.csv'
const mcid = './icd9.csv'
let csvData = []
let csvDataSymptoms = []
let csvDataMCID = {}

const loadDiagnoses = () => {
    fs.createReadStream(diagnoses)
    .pipe(csv())
    .on('data', (data) => csvData.push(data))
    .on('end', () => { console.log('csv diagnoses loaded')})
}

const loadSymptoms = () => {
    fs.createReadStream(symptoms)
    .pipe(csv())
    .on('data', (data) => csvDataSymptoms.push(data))
    .on('end',()=>{console.log('csv symptoms loaded')})
    
}
const loadMCIDs = () => {
    fs.createReadStream(mcid)
    .pipe(csv())
    .on('data', (data) => {
        let entry = csvDataMCID[data.ICD9CM];
        if(!entry){
            entry = [];
        }
        entry.push(data.McId);
        csvDataMCID[data.ICD9CM] = entry;
    })
    .on('end',()=>{console.log('csv McIds loaded')})
}


loadDiagnoses()
loadSymptoms()
loadMCIDs()

router.get('/getdiagnoses', (req,res,next) => {
    if(csvData){
        res.send(csvData)
        return
    } else {
        loadDiagnoses.then(res.send(csvData))
    }
})

router.get('/getsymptoms', (req,res,next) => {
    if(csvDataSymptoms){
        res.send(csvDataSymptoms)
        return
    } else {
        loadSymptoms.then(res.send(csvDataSymptoms))
    }
})

router.get('/searchdiagnose/:diagnose', (req,res,next) => {
    let filteredDiags = csvData.filter(e => e.long_title.toLowerCase().includes(req.params.diagnose.toLowerCase()))

    if(filteredDiags.length>0){
        res.status(200).send(filteredDiags)
    } else {
        res.status(404).send('No Results.')
    }
    return
})

router.get('/reloadDiagnoses', (req,res,next) => {
    loadDiagnoses()
    res.send('done')
    return
})

module.exports = {router, csvData, csvDataSymptoms, csvDataMCID}