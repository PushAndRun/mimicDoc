SELECT * 
FROM mimiciii.admissions
JOIN mimiciii.patients ON mimiciii.patients.subject_id = mimiciii.admissions.subject_id
JOIN mimiciii.procedures_icd ON mimiciii.admissions.HADM_ID = mimiciii.procedures_icd.HADM_ID
JOIN mimiciii.d_icd_diagnoses ON mimiciii.procedures_icd.icd9_code = mimiciii.d_icd_diagnoses.icd9_code
JOIN mimiciii.services ON mimiciii.admissions.hadm_id = mimiciii.services.hadm_id;