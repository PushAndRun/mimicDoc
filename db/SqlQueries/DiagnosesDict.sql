COPY (SELECT DISTINCT mimiciii.d_icd_diagnoses.icd9_code, short_title, long_title 
FROM mimiciii.d_icd_diagnoses
INNER JOIN mimiciii.procedures_icd 
ON mimiciii.d_icd_diagnoses.icd9_code = mimiciii.procedures_icd.icd9_code
ORDER BY mimiciii.d_icd_diagnoses.icd9_code ASC)
TO 'C:\Users\Public\diagnoses_dict.csv' DELIMITER ',' CSV HEADER;