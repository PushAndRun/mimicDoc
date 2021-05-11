SET search_path TO public,mimiciii;
CREATE TABLE patient_history_aggregated AS
(SELECT hadm_id,
				 		string_agg(icd9_code, ';') as icd9_code
				FROM mimiciii.diagnoses_icd
				WHERE 	mimiciii.diagnoses_icd.icd9_code LIKE '%V%' 
				GROUP BY hadm_id)