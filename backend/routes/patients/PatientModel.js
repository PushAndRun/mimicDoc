var mongoose = require('mongoose');  
var PatientSchema = new mongoose.Schema({  
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
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  requests : [{type: mongoose.Schema.ObjectId, ref: 'Request' }]
});
mongoose.model('Patient', PatientSchema);
module.exports = mongoose.model('Patient');