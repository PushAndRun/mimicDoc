var mongoose = require('mongoose');  
var RequestSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.ObjectId, ref: 'Patient', required: true },
  created: Date,
  survival: Number,
  stay : Number,

  hadm_id: Number,
  icustay_id: Number,
  hospstay_seq: Number,
  total_hospstays: Number,
  length_of_stay_hospital: Number,
  icustay_seq: Number,
  number_of_icu_stays: Number,
  length_of_stay_icu: Number,
  total_length_of_stay_icu: Number,
  days_to_death: Number,
  died_in_hospital: Number,

  age: Number,
  gender: String,
  weight: Number,
  height: Number,

  heartrate:{
    mean: Number,
    min: Number,
    max: Number
  },
  meanbp:{
    mean: Number,
    min: Number,
    max: Number
  },
  resprate:{
    mean: Number,
    min: Number,
    max: Number
  },
  tempc: {
    mean: Number,
    min: Number,
    max: Number
  },
  spo2: {
    mean: Number,
    min: Number,
    max: Number
  },
  glucose: {
    glucose_min: Number,
    glucose_max: Number, 
    glucose_mean: Number,
  },

  received_dialysis: Number,
  received_ventilation: Number,

  urineoutput: Number,
  mingcs: Number,
  gcsmotor: Number,
  gcsverbal: Number,
  gcseyes: Number,

  aniongap: {
      min: Number,
      max: Number
  },
  albumin: {
      min: Number,
      max: Number
  },
  bands: {
      min: Number,
      max: Number
  },
  bicarbonate: {
      min: Number,
      max: Number
  },
  bilirubin: {
      min: Number,
      max: Number
  },
  creatinine:{
      min: Number,
      max: Number
  },
  chloride: {
      min: Number,
      max: Number
  },
  hematocrit:{
      min: Number,
      max: Number
  },
  hemoglobin: {
      min: Number,
      max: Number
  },
  lactate: {
      min: Number,
      max: Number
  },
  platelet: {
      min: Number,
      max: Number
  },
  potassium: {
      min: Number,
      max: Number
  },
  ptt: {
      min: Number,
      max: Number
  },
  inr: {
      min: Number,
      max: Number
  },
  pt: {
      min: Number,
      max: Number
  },
  sodium: {
      min: Number,
      max: Number
  },
  bun: {
      min: Number,
      max: Number
  },
  wbc: {
      min: Number,
      max: Number
  },

  symptoms: [String],
  patient_history: [String],
  accident_causes: [String],
  diagnoses: [String]
});
mongoose.model('Request', RequestSchema);
module.exports = mongoose.model('Request');
