var express = require('express');
//var mongo = require('mongodb');
var mongoose = require('mongoose');
var router = express.Router();



// TODO add mongodb to package.json and secure db password
const user_db_uri = "mongodb+srv://dbRobo:3ZLyF8iZ5MVrVFn@robodoc.tshsc.mongodb.net/RoboDoc?retryWrites=true&w=majority"; 
//const mongo_client = new mongo.MongoClient(user_db_uri, { useNewUrlParser: true, useUnifiedTopology: true });


function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const format = {
    username:  'string',
    // TODO: WARNING - clear text passwort - DO CHANGE!
    pw: 'string',
}

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    pw: { type: String, required: true}
});

const User = mongoose.model('User', userSchema);

//check if request is empty
router.use('/',(req,res,next) => {
    if(isEmptyObject(req.body)){
        res.send(format)
    } else {
        next()
    }
})

//check if request has required parameter keys
router.use('/',(req,res,next) => {
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

//TODO: Register

router.use('/register',(req,res,next) => {
    console.log("registering");
    // check if user is already registered

    mongoose.connect(user_db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => {
        console.log('MongoDB connected!!');
        /* const user = new User({
            username: req.body.username,
            pw: req.body.pw
        }); */
        /* user.save().then(() => {
            console.log('User successfully added.');
        }).catch(err => {
            console.log('Failed to add user', err)
        }) */
        User.find({
            username: req.body.username
        }).then(() => {
            console.log('User found.');
        }).catch(err => {
            console.log('User not found.', err)
        });
    }).catch(err => {
        console.log('Failed to connect to MongoDB', err);
    });
    next();
});

//TODO: Login

//TODO: more user functionality. e.g. list patients, show request history


//Pseudo-Output
/* router.use('/',(req,res,next) => {
    res.send(`under construction`)
}); */

module.exports = router;