var mongoose = require('mongoose');  
var DiagnosisSchema = new mongoose.Schema({
    icd9_code: Number,
    short_title: String,
    long_title: String
});
mongoose.model('diagnoses_dict', DiagnosisSchema);
module.exports = mongoose.model('diagnoses_dict');