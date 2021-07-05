// path mit dem er aufgerufen wurde: /api/auth
var express = require('express');
var router = express.Router();


var VerifyToken = require('./VerifyToken');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
var User = require('../user/UserModel');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../../config'); // get config file

router.post('/login', function(req, res) {
  console.log(req.body.name)
  console.log(req.body.password)
  User.findOne({ name: req.body.name }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('user not found');
    
    // check if the password is valid
    // console.log(req.body.password)
    // console.log(user.password)
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id, isAdmin:user.isAdmin }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  }, 
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user`.");

    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user._id, isAdmin:user.isAdmin }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/me', VerifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("User not found.");
    res.status(200).send(user);
  }).populate('patients');

});

router.get('/isAdmin', VerifyToken, function(req, res, next) {
  if (req.isAdmin){
    res.status(200).send({ auth: true });
  } else{
    res.status(401).send({ auth: false});
  }
});

module.exports = router;