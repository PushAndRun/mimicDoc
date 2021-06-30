// path mit dem er aufgerufen wurde: /api/request
var express = require('express')
var router = express.Router()

const verifyToken = require('../auth/VerifyToken')
const predict = require('../predict')

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
    let deseases = Array("Fauleritis", "morbus stinkefuß", "Kotzeritis", "Idiotie", "schnupfige malicus", "tropische Darmwinde", "lokale Gesichtsdystopie", "massive Hirnfehlstellung", "chronische kognitive Blockade");
    symptoms = []
    for (let i = 0; i < 5; i++) {
        let entry = 
            {
                "name": deseases[Math.floor(Math.random() * deseases.length)],
                "probability":getRandomProb()
            }
        symptoms.push(entry)
    }
    res.send(JSON.stringify({"symptoms": symptoms}));
})

module.exports = router