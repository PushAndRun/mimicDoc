# Databases

### Content of this folder
- All exports that are relevant in order to train the ML model
- All exports that are required to create the mongo DB dictionaries that will be provided by the backend
- All queries that were used to create these exports

### Necessary steps to create the exports
- In case that you want to execute the exports and queries from the SQLQueries folder on your machine the following steps need to be followed:
	1. Install the mimic III database in a local postgres database (https://mimic.physionet.org/tutorials/install-mimic-locally-windows/)
	2. Follow the steps in the README file in the mimic-code-master/concepts folder in oder to create the derived databases in postgres
	3. Execute all SQL scripts in the SqlQueries folder in the given order (extendedAdmissionDetailQuery can be skipped - this is only a view)
	4. All exported csv files will be located under 'C:\Users\Public\' (the target folder can be changed at the end of each "Export_..." scripts)
 
###  Admissions export - table of content
###### This lists discribes the content of the admissions csv export in the db folder 
We created a csv export file from the mimic iii database that contains: 
- all admissions of all patients for their first stay on the intensive care unit (ICU)
- vital signs of the first 24 hours on ICU
- diagnoses and the patient's medical history
- if and after how many days the patient died in hospital
- the length of stay in hospital, the length of stay of the first ICU stay, the total length of stay on ICU during the hospital admission

The following columns are included in the export
- patient_id -> a unique id to identify the patient
- hadm_id -> a unique id to identity the admission of a patient
- icustay_id -> a unique id to identify the stay on the ICU during an admission
- hospstay_seq -> information about the sequence of hospital stays, is one if this is the first hospital stay (admission) of this patient, a patient can be included with multiple admissions
- total_hospstays -> The total number hospital stays for this patient
- length_of_stay_hospital -> length of stay in the hospital for this specific admission
- icustay_seq -> this export includes only the first icu stay during an admission, this column is only included for information purposes and should be one in all rows
- number_of_icu_stays -> number of icu stays during this hospital admission
- length_of_stay_icu -> the length of stay of the first ICU stay in fractional days, double precision
- total_length_of_stay_icu -> the total length of all ICU stays during this hospital admission in fractional days, double precision
- days_to_death -> number of days from the hospital admission to the death in hospital, is null if the patient survived 
- died_in_hospital -> boolean, true if the patient died during this hospital admission
- age -> age in years as integer, the table includes only patients with an age > 0 to exclude newborns which were excluded due to a lack of diagnoses and other data
- gender -> gender converted as char (either 'M' or 'F')
- weight -> weight in kg as integer, value of the first day on ICU
- height -> height in cm as integer
- The following heartrate values from the first 24 hours on the ICU (of the first ICU stay) are included in the export, all integer values:
	- heartrate_mean
	- heartrate_min
	- heartrate_max
- The following blood pressure values from the first 24 hours on the ICU (of the first ICU stay) are included in the export, all integer values:
	- meanbp_mean
	- meanbp_min
	- meanbp_max
- The following respiration values from the first 24 hours on the ICU are included in the export, all integer values:	
	- resprate_min
	- resprate_max
	- resprate_mean
- The following body temperature values in degrees Celsius from the first 24 hours on the ICU are included in the export, all values with double precision:
	- tempc_mean
	- tempc_min
	- tempc_max
- The following blood oxygen values from the first 24 hours on the ICU are included in the export, all integer values:	
	- spo2_mean
	- spo2_min
	- spo2_max		
- The following blood glucose values in mg/dL from the first 24 hours on the ICU are included in the export, all integer values:	
	- glucose_min
	- glucose_max
	- glucose_mean
- received_dialysis -> flag value of 0 or 1 to indicate if the patient received a dialysis in the first 24 hours on the ICU
- received_ventilation -> flag value of 0 or 1 to indicate if the patient was ventilated in the first 24 hours on the ICU	
- urineoutput -> urine output in ml of the patient in the first 24 hours on the ICU
- The following values of the Glasgow coma score from the first 24 hours on the ICU are included in the export, all integer values:
	- mingcs -> The score value as a sum of all three values. The GCS for sedated patients is defaulted to 15 in this code. For sedated patients, the Glasgow Coma Score before sedation was used.
	- gcsmotor -> 
	- gcsverbal
	- gcseyes
	- The scale to assign the score can be found here: https://www.thieme.de/statics/dokumente/thieme/final/de/dokumente/tw_pflege/297500101_003_Glasgow_Coma_Scale.pdf
- The following lab values from the first 24 hours on the ICU are included in the export, all values with double precision:	
	- mEq/L 'ANION GAP'
		- aniongap_min		
		- aniongap_max      
	- g/dL 'ALBUMIN'
		- albumin_min      
		- albumin_max	    
	- immature band forms, %
		- bands_min         
		- bands_max         
	- mEq/L 'BICARBONATE'
		- bicarbonate_min   
		- bicarbonate_max   
	- mg/dL 'BILIRUBIN'
		- bilirubin_min     
		- bilirubin_max     
	- mg/dL 'CREATININE'
		- creatinine_min    
		- creatinine_max    
	- mEq/L 'CHLORIDE'
		- chloride_min      
		- chloride_max      
	- % 'HEMATOCRIT'
		- hematocrit_min    
		- hematocrit_max    
	- g/dL 'HEMOGLOBIN'	
		- hemoglobin_min    
		- hemoglobin_max    
	- mmol/L 'LACTATE'	
		- lactate_min       
		- lactate_max       
	- K/uL 'PLATELET'	
		- platelet_min      
		- platelet_max      
	- mEq/L 'POTASSIUM'
		- potassium_min     
		- potassium_max     
	- seconds 'PTT - Partial Thromboplastin Time'
		- ptt_min           
		- ptt_max 
	- level 'INR - International Normalized Ratio'
		- inr_min           
		- inr_max
	- seconds 'PT - Prothrombin Time'
		- pt_min
		- pt_max
	- mEq/L == mmol/L 'SODIUM'
		- sodium_min
		- sodium_max
	- mg/dL 'Urea nitrogen levels'	
		- bun_min
		- bun_max
	- 'WBCs per microliter'	
		- wbc_min
		- wbc_max
- syptoms -> This column holds a string with icd9 codes, separated by ';', the column includes only icd9 codes that begin with '7' which covers all sympton related codes, a dictionary in the db folder allows to get a description to each code
- patient_history -> This column holds a string with icd9 codes, separated by ';', the column includes only icd9 codes that begin with a 'V' and that classify factors influencing health status and contact with health services, a dictionary in the db folder allows to get a description to each code
- accident_causes -> This column holds a string with icd9 codes, separated by ';', the column includes only icd9 codes that begin with an 'E' and that classify causes of an accident. The attribute is null if the admission is not related to an accident.
- diagnoses -> This column holds all diagnoses as icd9 codes (except for codes beginning with 'V', 'E' or '7') separated by ';', the diagnoses are associated to a hospital admission which means that a diagnosis could be unknown or not applicable yet when the patient was admitted to the ICU

