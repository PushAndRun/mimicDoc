// path mit dem er aufgerufen wurde: /api/patients
const express = require('express');
const router = express.Router();

const VerifyToken = require(__root + '/routes/auth/VerifyToken');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const Patient = require('./PatientModel');


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
    let missing = ''
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
                return res.status(200).send(p);
            })
});

// RETURNS ALL THE PATIENTS IN THE DATABASE
router.get('/', function (req, res) {
    Patient.find({}, function (err, patients) {
        if (err) return res.status(500).send("There was a problem finding all patients.");
        if (!patients) return res.status(404).send("No patient found.");  
    }).populate("requests").exec(function(err, patients) {
        if (err) return res.status(500).send("There was a problem populating the patients.");
        return res.status(200).send(patients);
    })
});

// RETURNS ALL PATIENTS FROM  SINGLE USER
router.get('/getPatientsByUser', VerifyToken, function (req, res) {
    Patient.find({user: req.userId}, function (err, patients) {
        if (err) return res.status(500).send("There was a problem finding all users.");
        if (!patients) return res.status(404).send("No patients found.");
    }).populate("requests").exec(function(err, patients) {
        if (err) return res.status(500).send("There was a problem populating the patients.");
        res.status(200).send(patients);
    })
    
});

// GETS A SINGLE PATIENT FROM THE DATABASE BY ID
router.get('/id/:id', function (req, res) {
    Patient.findById(req.params.id, function (err, patient) {
        if (err || !patient) return res.status(500).send("There was a problem finding the patient with id:"+ req.params.id);
    }).populate("requests").exec(function(err, patient) {
        if (err) return res.status(500).send("There was a problem populating the patient.");
        res.status(200).send(patient);
    })
});

// DELETES A PATIENT FROM THE DATABASE BY ID
router.delete('/id/:id', function (req, res) {
    Patient.findByIdAndRemove(req.params.id, function (err, patient) {
        if (err) return res.status(500).send("There was a problem deleting the patient.");
        res.status(200).send("Patient: "+ patient.name +" was deleted.");
    });
});

// UPDATES A SINGLE PATIENT IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    Patient.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, patient) {
        if (err) return res.status(500).send("There was a problem updating the patient.");
        res.status(200).send(patient);
    });
});

module.exports = router
