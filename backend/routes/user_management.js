var express = require('express')
var mongo = require('mongodb').MongoClient
var router = express.Router()

// TODO add mongodb to package.json
const user_db_url = "mongodb://localhost:27017/" // placeholder

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

//TODO: Register
router.get('/register',(req,res,next) => {
    
    mongo.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("users"); // placeholder
      // check if user is already registered
      dbo.collection("users").findOne({ username: req.body.username}, function (err, result) {
          if (err) throw err;
          if (result) {res.send("username already in use")
        } else {
            var new_user = { username:req.body.username, pw: req.body.pw };
            dbo.collection("users").insertOne(new_user, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
        }
      });
    }); 
})

//TODO: Login

//TODO: more user functionality. e.g. list patients, show request history


//Pseudo-Output
router.get('/',(req,res,next) => {
    res.send(`Patient will spend ${getRandomInt(365)} days on ICU with a certainty of ${getRandomInt(100)}%.`)
})

module.exports = router