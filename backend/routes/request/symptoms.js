// path mit dem er aufgerufen wurde: /api/request
var express = require("express");
var router = express.Router();
const DiagnosisModel = require("./DiagnosisModel");
const MalaCard = require("./MalaCardModel");
const icd9ToMCID = require("../endpoints").csvDataMCID;

const verifyToken = require("../auth/VerifyToken");
const predict = require("../predict");


function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

async function getFirstSuccessfulLookup(cards) {
  for(let card of cards){
    let val = await card;
    if(val != null){
      return val;
    }
  }
  return null
}

async function lookUpPatches(cards) {
  console.log("looking up missing malacards in icd9 info");
  let patches = [];
  let fixedCards = cards.map(async (cards, index) => {
    console.log("looking up cards")
    let mala = await getFirstSuccessfulLookup(cards);
    if (!mala) {
      // use icd9 code and title
      patches.push(
        DiagnosisModel.findOne({ icd9_code: diseases[index] }).exec()
      );
      return { mcId: "not found" };
    } else {
      return {
        mcId: "[MCID]:" + mala.McId,
        disease: mala.DiseaseName,
        summary: mala.Summaries[0].Summary,
        source: mala.Summaries[0].Source,
      };
    }
  });
  return [await Promise.allSettled(fixedCards), await Promise.allSettled(patches)];
}
async function fixPatches(cards, patches) {
  console.log("patching missing info");
  return cards.map((card) => {
    if (card.value.mcId == "not found") {
      let info = patches.shift().value;
      return {
        mcId: "[ICD9CM]:" + info.icd9_code,
        disease: info.short_title,
        summary: info.long_title + " - summary not found",
        source: "---",
      };
    } else {
      return card.value;
    }
  });
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
  diseases = JSON.parse(output).diagnoses;
  console.log("parsed:", diseases);
  let cards = diseases.map((icd9) => {
    // ICD9 -> MC-ID
    let mcids = icd9ToMCID[icd9.substring(0, 3)];
    console.log("icd9, mcid:", icd9, mcids);
    // check if at least one MCID was found
    if (!mcids) {
      return [Promise.resolve(null)]
    }
    // get Malacard info
    let querys =  mcids.map( async (mcid) => {
      return MalaCard.findOne({ McId: mcid }, (err, doc) => {
        if (err) {
          console.log("lookup error on " + mcid + ": " + err);
        } else if (!doc) {
          console.log("could not find summary for " + mcid);
        } else {
          console.log("found " + mcid);
        }
      }).exec();
    });
    console.log("querys for ", mcids," : ", querys);
    return querys
  });
  Promise.allSettled(cards.flat(Infinity))
    .then(async () => await lookUpPatches(cards))
    .then(([cards, patches]) => fixPatches(cards, patches))
    .then((cards) => {
      console.log("sending: ", cards);
      res.status(200).send(cards);
    });
  /*
  return {  
    mcId:"[ICD9CM]:"+info.icd_9code,
    disease: info.short_title,
    summary: info.long_title+" - summary not found",
    source : "---"
  };
      return {
      mcId: mala.McId,
      disease: mala.DiseaseName,
      summary: mala.Summaries[0].Summary,
      source: mala.Summaries[0].Source,
    };
  */

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
