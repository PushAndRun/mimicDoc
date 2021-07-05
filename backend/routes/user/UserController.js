// path mit dem er aufgerufen wurde: /api/user
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var VerifyToken = require(__root + '/routes/auth/VerifyToken');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
var User = require('./UserModel');

// OLD NO JWT CREATES A NEW USER
router.post('/', function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        }, 
        function (err, user) {
            // zurueckgeben warum anlegen nicht funktioniert hat - username vergeben, passwort zu kurz,... -> wichtig fuer user
            if (err) return res.status(500).send("There was a problem adding the information to the database."+ req.body.name + " pw "+ req.body.password);
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding all users.");
        if (!users) return res.status(404).send("No users found.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE BY ID
router.get('/id/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user with id:"+ req.params.id);
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// GETS A SINGLE USER FROM THE DATABASE BY USERNAME
router.get('/username/:username', function (req, res) {
    User.findOne({name: req.params.username}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user:"+ req.params.username + err);
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE BY ID
router.delete('/id/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User was deleted.");
    });
});

// DELETES A USER FROM THE DATABASE BY USERNAME
router.delete('/username/:username', function (req, res) {
    User.findOneAndRemove({name: req.params.username}, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;