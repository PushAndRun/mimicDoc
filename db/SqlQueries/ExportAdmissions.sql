COPY (
SELECT 	Q1.hadm_id, 
		date_part('year',age) as age, 
		gender, 
		weight, 
		Q2.icd9_code as patient_history, 
		length_of_stay, 
		died_in_hospital, 
		array_agg(diagnoses) as diagnoses
FROM
			/*Create a table with all patient details and diagnoses*/
			(SELECT 
			 mimiciii.admissions.hadm_id, 
			 AGE(admittime, dob) as age, 
			 gender, 
			 ROUND(AVG(patientweight)) as weight, 
			 los as length_of_stay, 
			 hospital_expire_flag as died_in_hospital, 
			 mimiciii.diagnoses_icd.icd9_code as diagnoses
			
			 FROM mimiciii.admissions
					JOIN mimiciii.patients ON mimiciii.patients.subject_id = mimiciii.admissions.subject_id
					JOIN mimiciii.icustays ON mimiciii.admissions.hadm_id = mimiciii.icustays.hadm_id
					FULL JOIN mimiciii.inputevents_mv ON mimiciii.admissions.hadm_id = mimiciii.inputevents_mv.hadm_id
					JOIN mimiciii.diagnoses_icd ON mimiciii.admissions.hadm_id = mimiciii.diagnoses_icd.hadm_id
			
			 /*Exclude patient history codes from diagnoses*/
			 WHERE 	mimiciii.diagnoses_icd.icd9_code NOT LIKE '%V%' AND
	 				mimiciii.diagnoses_icd.icd9_code NOT LIKE '%E%' AND
			 
			 /*Exclude organ donors*/
			 		los > 0
			
			 GROUP BY mimiciii.admissions.hadm_id, age, gender, los, hospital_expire_flag, diagnoses
			) 
		AS Q1

FULL JOIN 	
			/*Create a table that contains only the patient history, aggregated in an array*/
			(SELECT hadm_id,
			 		array_agg(icd9_code) as icd9_code
			FROM mimiciii.diagnoses_icd
			WHERE 	mimiciii.diagnoses_icd.icd9_code LIKE '%V%' 
			GROUP BY hadm_id
		) AS Q2
ON Q1.hadm_id = Q2.hadm_id

/*Filter certain patients and cases*/
WHERE 	(weight < 400 OR weight = NULL) AND 
		age < '89 years 0 mons 01 days 00:00:00'
GROUP BY Q1.hadm_id, patient_history, age, gender, weight, length_of_stay, died_in_hospital)

/*Export to*/
TO 'C:\Users\Public\admissions.csv' DELIMITER ',' CSV HEADER;
