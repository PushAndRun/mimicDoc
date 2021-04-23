COPY (SELECT mimiciii.admissions.hadm_id, AGE(admittime, dob) as age, gender, AVG(patientweight) as weight, los as length_of_stay, hospital_expire_flag as died_in_hospital
FROM mimiciii.admissions
JOIN mimiciii.patients ON mimiciii.patients.subject_id = mimiciii.admissions.subject_id
JOIN mimiciii.icustays ON mimiciii.admissions.hadm_id = mimiciii.icustays.hadm_id
JOIN mimiciii.inputevents_mv ON mimiciii.admissions.hadm_id = mimiciii.inputevents_mv.hadm_id
GROUP BY mimiciii.admissions.hadm_id, age, gender, los, hospital_expire_flag)
TO 'C:\Users\Public\admissions.csv' DELIMITER ',' CSV HEADER;
