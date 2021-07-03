// path mit dem er aufgerufen wurde: /api/request
var express = require("express");
var router = express.Router();
const DiagnosisModel = require("./DiagnosisModel");
const MalaCard = require("./MalaCardModel");
const icd9ToMCID = require("../endpoints").csvDataMCID;

const verifyToken = require("../auth/VerifyToken");
const predict = require("../predict");
const { json } = require("express");
const { wait } = require("assume");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

router.post("/", (req, res, next) => {
  //res.data = JSON.parse(req.body)
  //if(isEmptyObject(res.data)){
  //    res.status(400).send("empty request");
  //}
  next();
});

router.post("/", async (req, res, next) => {
  next();
});

//Pseudo-Output
router.post("/", async (req, res, next) => {
  let symptoms = req.body.symptoms;

  // Joint array in einen einzigen String. Mit leerzeichen als trennelement
  symptoms = symptoms.join(" ");
  /*
  res.status(200).json({
    deseases: await predict("predict_diagnoses.py", symptoms),
  });
  */
  //getting_diagnoses = JSON.parse(getting_diagnoses);

  // MALACARDS SETUP - Leon
  // get script output
  let output = await predict("predict_diagnoses.py", symptoms);
  deseases = JSON.parse(output).diagnoses;
  console.log("parsed:" + deseases);
  let cards = deseases.map(async (icd9) => {
    // ICD9 -> MC-ID
    let mcid = icd9ToMCID[icd9];
    console.log("icd9, mcid:", icd9, mcid);
    // get Malacard info
    return await MalaCard.findOne({ McId: mcid }, (err, doc) =>{
        if (err){
            console.log("lookup error on "+mcid+": "+err)
        }
        else if (!doc) {
            console.log("could not find malacard with "+mcid)
        } else {
            console.log("found "+mcid+": "+err)
        }
    }).exec();
  });
  cards = await Promise.allSettled(cards);
  console.log("cards: ", cards);
  deseases = cards.map((card) => {
    let mala = card.value;
    if (!mala) {
      console.log("could not find MCard");
      return {};
    }
    return {
      icd9cm: icd9,
      mcId: mcid,
      desease: mala.DeseaseName,
      summary: mala.Summaries[0].Summary,
      source: mala.Summaries[0].Source,
    };
  });

  res.status(200).send(deseases);

  // format and send

  /*     for (let i = 0; i < getting_diagnoses.deseases.length; i++) {
            let x = getting_diagnoses.deseases[i].icd9_code;
            let x_acc = getting_diagnoses.deseases[i].accuracy;
            // if (x_acc >= threshold){ // uncomment if threshold is wanted
            if (!isNaN(x)) {
                    console.log(x + " is a number");
                    deseases.push(DiagnosisModel.findOne({ icd9_code: x }, function (err, diagnosisRes) {
                            if (err) {
                                    console.log("error while searching " + x + " in our db" + err)
                                } else if (!diagnosisRes) {
                                        console.log(x + ' is not a short_titel diagnosis')
                                    }
                                }))
                            }
                        }
                        
    Promise.allSettled(deseases).then((results)=>{
         let deseasesParsed = results.map((prom, index) =>{
            let val = prom.value;
            console.log("found " + val.icd9_code + " in Db as " + val.short_title);
            return {"icd9_code": val.icd9_code,
            "desease_short_title": val.short_title,
            "deseases_long_title": val.long_title,
            "accuracy": getting_diagnoses.deseases[index].accuracy};
        })
        res.status(200).send(JSON.stringify({"deseases": deseasesParsed}))
        }) */
});

module.exports = router;
