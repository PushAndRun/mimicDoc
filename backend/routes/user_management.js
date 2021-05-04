var express = require('express')
var mongo = require('mongodb')
var router = express.Router()


// TODO add mongodb to package.json and secure db password
const user_db_uri = "mongodb+srv://dbRobo:3ZLyF8iZ5MVrVFn@robodoc.tshsc.mongodb.net/RoboDoc?retryWrites=true&w=majority"; 
const mongo_client = new mongo.MongoClient(user_db_uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
    mongo_client.connect(err => {
        const users = mongo_client.db("RoboDoc").collection("users");
        users.findOne({ username: req.body.username}, function (err, result) {
            if (err) throw err;
            if (result) {
                res.send("username already in use")
            } else {
                var new_user = { username:req.body.username, pw: req.body.pw };
                users.insertOne(new_user, function (err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.send("Added user: "+ new_user)
                });
            }
            // break?
        });
        mongo_client.close();
    });
    next();
})

//TODO: Login

//TODO: more user functionality. e.g. list patients, show request history


//Pseudo-Output
router.use('/',(req,res,next) => {
    res.send(`under construction`)
})

module.exports = router