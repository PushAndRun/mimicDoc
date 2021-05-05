var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: {
    type: String
  , required: true
  , unique: true
  ,lowercase: true
  , trim: true
  , validate: [validators.notEmpty, 'Username is empty']
  },
  email: String,
  password: {
    type: String
  , required: true
  , min : [6, "password must be at least 6 characters long"]
  , validate: [validators.notEmpty, 'password is empty']
  }
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');