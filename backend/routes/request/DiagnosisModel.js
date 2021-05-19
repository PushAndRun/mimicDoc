var mongoose = require('mongoose');  
var DiagnosisSchema = new mongoose.Schema({
    icd9_code: Number,
    short_title: String,
    long_title: String
});
mongoose.model("Diagnosis", DiagnosisSchema,'diagnoses_dict');
module.exports = mongoose.model('Diagnosis');
