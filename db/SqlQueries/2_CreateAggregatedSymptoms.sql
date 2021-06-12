SET search_path TO public,mimiciii;
DROP TABLE IF EXISTS symptoms_aggregated;
CREATE TABLE symptoms_aggregated AS
(SELECT 	hadm_id,
				string_agg(icd9_code, ';') as icd9_code
					
				FROM mimiciii.diagnoses_icd
					
				/*SELECT ONLY DIAGNOSES CODES*/
				WHERE mimiciii.diagnoses_icd.icd9_code LIKE '7%'
				GROUP BY hadm_id);