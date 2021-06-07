var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: {
    type: String
  , required: true
  , unique: true
  ,lowercase: true
  , trim: true
  },
  email: String,
  password: {
    type: String
  , required: true
  , min : [6, "password must be at least 6 characters long"]
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  patients: [{ type: mongoose.Schema.ObjectId, ref: 'Patient' }]
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');