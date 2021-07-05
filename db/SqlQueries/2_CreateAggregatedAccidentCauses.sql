SET search_path TO public,mimiciii;
DROP TABLE IF EXISTS accident_codes_aggregated;
CREATE TABLE accident_codes_aggregated AS
(SELECT 	hadm_id,
				string_agg(icd9_code, ';') as icd9_code
					
				FROM mimiciii.diagnoses_icd
					
				/*SELECT ONLY ACCIDENT CODES*/
				WHERE mimiciii.diagnoses_icd.icd9_code LIKE 'E%'
				GROUP BY hadm_id);