// path mit dem er aufgerufen wurde: /api/patient
var express = require('express');
var router = express.Router();

const diagnoses = require('./endpoints').csvData

var VerifyToken = require(__root + '/routes/auth/VerifyToken');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
var Patient = require('./PatientModel');


function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const format = {
    name:   'String',
    email:  'String',
    medicalData: {
          dateOfBirth : 'Date',
          gender: 'String',
          weight:'Number',
          height: 'Number',
          bloodType: 'String',
          diagnoses: 'array of strings'
    }
}

//check if request is empty
router.post('/',(req,res,next) => {
    if(isEmptyObject(req.body)){
        res.send(format)
    } else {
        next()
    }
})

//check if request has required parameter keys
router.post('/',(req,res,next) => {
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


// CREATES A NEW PATIENT
router.post('/', VerifyToken, function (req, res) {

    p = Patient.create({
            name : req.body.name,
            medicalData : req.body.medicalData,
            // link to user
            user: req.userId
        }, 
        function (err, patient) {
            // zurueckgeben warum anlegen nicht funktioniert hat - username vergeben, passwort zu kurz,... -> wichtig fuer user
            if (err) return res.status(500).send("There was a problem adding the information to the database."+ req.body.name + " medicalData "+ req.body.medicalData);
            return patient
        });
    User.findByIdAndUpdate(req.userId, 
            { "$push": { "patients": p._id} },
            function (err, user) {
                if (err) return res.status(500).send("There was a problem updating the user."+ err);
                res.status(200).send(p);
            })
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Patient.find({}, function (err, patients) {
        if (err) return res.status(500).send("There was a problem finding all patients.");
        if (!patient) return res.status(404).send("No patient found.");
        res.status(200).send(patients);
    });
});

// GETS A SINGLE USER FROM THE DATABASE BY ID
router.get('/id/:id', function (req, res) {
    Patient.findById(req.params.id, function (err, patient) {
        if (err) return res.status(500).send("There was a problem finding the patient with id:"+ req.params.id);
        if (!patient) return res.status(404).send("No user found.");
        res.status(200).send(patient);
    });
});

// DELETES A USER FROM THE DATABASE BY ID
router.delete('/id/:id', function (req, res) {
    Patient.findByIdAndRemove(req.params.id, function (err, patient) {
        if (err) return res.status(500).send("There was a problem deleting the patient.");
        res.status(200).send("Patient: "+ patient.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    Patient.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, patient) {
        if (err) return res.status(500).send("There was a problem updating the patient.");
        res.status(200).send(patient);
    });
});




//TODO: send ML results back as response


//Pseudo-Output
router.get('/',(req,res,next) => {
    res.send(`Patient will spend ${getRandomInt(365)} days on ICU with a certainty of ${getRandomInt(100)}%.`)
})
module.exports = router