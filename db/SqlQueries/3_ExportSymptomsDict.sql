COPY (		SELECT 	DISTINCT d_icd_diagnoses.icd9_code,
	  				short_title,
	  				long_title
			FROM mimiciii.d_icd_diagnoses
	  		INNER JOIN mimiciii.diagnoses_icd 
			ON mimiciii.d_icd_diagnoses.icd9_code = mimiciii.diagnoses_icd.icd9_code
			WHERE 	d_icd_diagnoses.icd9_code LIKE '7%'
	 		ORDER BY icd9_code ASC)
TO 'C:\Users\Public\symptoms_dict.csv' DELIMITER ',' CSV HEADER;