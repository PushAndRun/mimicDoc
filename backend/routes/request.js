var express = require('express')
var router = express.Router()
const diagnoses = require('./endpoints').csvData

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const format = {
    id:  'string',
    age: 'integer',
    gender: 'string: m/f/d',
    weight: 'integer',
    height: 'integer',
    diagnoses: 'array of string',
    timeSpentOnICU: 'integer: days'
}

//check if request is empty
router.get('/',(req,res,next) => {
    if(isEmptyObject(req.body)){
        res.send(format)
    } else {
        next()
    }
})

//check if request has required parameter keys
router.get('/',(req,res,next) => {
    console.log(Object.keys(format))
    console.log(Object.keys(req.body))
    missing = ''
    for(let key of Object.keys(format)){
        if(!Object.keys(req.body).includes(key)){
            missing+=key+' '
        }
    }
    if(missing !== ''){
        res.send('Missing parameters: '+missing)
    } else {
        next()
    }
})


//TODO: check if request parameters are of correct type

//TODO: send request to ML Backend

//TODO: send ML results back as response


//Pseudo-Output
router.get('/',(req,res,next) => {
    res.send(`Patient will spend ${getRandomInt(365)} days on ICU with a certainty of ${getRandomInt(100)}%.`)
})

module.exports = router