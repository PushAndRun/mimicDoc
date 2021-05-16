var mongoose = require('mongoose');  
var PatientSchema = new mongoose.Schema({  
  id: {
        type: Number
      , required: true
      , unique: true
      , min : [10, "id must be 10 figures long"]
  },
  name: {
    type: String
  , required: true
  , unique: true
  , lowercase: true
  , trim: true
  },
  email: String,
  medicalData: {
      dateOfBirth : Date,
      gender: String,
      weight:Number,
      height: Number,
      bloodType: String,
      diagnoses: [String]
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});
mongoose.model('Patient', PatientSchema);
module.exports = mongoose.model('Patient');