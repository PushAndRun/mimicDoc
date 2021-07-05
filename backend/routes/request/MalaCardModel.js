var mongoose = require('mongoose');  
var MalaCardSchema = new mongoose.Schema({
    Summaries: [{ Summary: String, Source: String }],
    McId: String,
    DiseaseName: String,
    DiseaseSlug: String
});
mongoose.model("MalaCard", MalaCardSchema,'malacardssummaries');
module.exports = mongoose.model('MalaCard');
