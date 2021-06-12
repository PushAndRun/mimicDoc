SET search_path TO public,mimiciii;
DROP TABLE IF EXISTS diagnoses_aggregated;
CREATE TABLE diagnoses_aggregated AS
(SELECT 	hadm_id,
				 		string_agg(icd9_code, ';') as icd9_code
					
				FROM mimiciii.diagnoses_icd
					
				/*Exclude patient history codes from diagnoses*/
				WHERE 	
				mimiciii.diagnoses_icd.icd9_code NOT LIKE '%V%' AND
		 		mimiciii.diagnoses_icd.icd9_code NOT LIKE '%E%' AND
 				mimiciii.diagnoses_icd.icd9_code NOT LIKE '7%'
					
				GROUP BY hadm_id);