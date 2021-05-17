var mongoose = require('mongoose');  
var RequestSchema = new mongoose.Schema({
  survival: Number,
  stay : Number,
  bloodpressure: {
    meanbp_mean: Number,
    meanbp_min: Number,
    meanbp_max: Number
  },
  respiratory: {
    resprate_min: Number,
    resprate_max: Number,
    resprate_mean: Number,
  },
  tempc_mean: Number,
  glucose: {
    glucose_min: Number,
    glucose_max: Number, 
    glucose_mean: Number,
  },
  patient_history: [String],
  diagnoses: [String],
  created: Date,
  patient: { type: mongoose.Schema.ObjectId, ref: 'Patient', required: true }
});
mongoose.model('Request', RequestSchema);
module.exports = mongoose.model('Request');