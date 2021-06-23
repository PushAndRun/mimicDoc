SET search_path TO public,mimiciii;
DROP TABLE IF EXISTS extended_admission_details;
CREATE TABLE extended_admission_details AS(
SELECT 		
	  		Q1.patient_id,
			Q1.hadm_id, 
			Q1.icustay_id,
			hospstay_seq,
			total_hospstays,
			ROUND(los_hospital,2) as length_of_stay_hospital,
			icustay_seq,
			Q4.number_of_icu_stays,
			ROUND(los_icu,2) as length_of_stay_icu, 
			Q4.total_length_of_stay_icu,
			Q4.days_to_death,
			hospital_expire_flag as died_in_hospital,
			age, 
			gender, 
			ROUND(weight) as weight, 
			ROUND(height) as height,
			ROUND(heartrate_mean) as heartrate_mean,
			heartrate_min,
			heartrate_max,
			ROUND(meanbp_mean) as meanbp_mean,
		 	ROUND(meanbp_min) as meanbp_min,
			ROUND(meanbp_max) as meanbp_max,
			ROUND(resprate_mean) as resprate_mean,
			resprate_min,
			resprate_max,
			tempc_mean,
			tempc_min,
			tempc_max,
			ROUND(spo2_mean) as spo2_mean,
			spo2_min,
			spo2_max,
			ROUND(public.vitals_first_day.glucose_mean) as glucose_mean,
			public.vitals_first_day.glucose_min,
			public.vitals_first_day.glucose_max,
			Q7.rrt as received_dialysis,
			Q8.vent as received_ventilation,
			Q9.urineoutput,
			Q10.mingcs,
			Q10.gcsmotor,
			Q10.gcsverbal,
			Q10.gcseyes,
			Q11.aniongap_min,
			Q11.aniongap_max,
			Q11.albumin_min,
			Q11.albumin_max,
			Q11.bands_min,
			Q11.bands_max,
			Q11.bicarbonate_min,
			Q11.bicarbonate_max,
			Q11.bilirubin_min,
			Q11.bilirubin_max,
			Q11.creatinine_min,
			Q11.creatinine_max,
			Q11.chloride_min,
			Q11.chloride_max,
			Q11.hematocrit_min,
			Q11.hematocrit_max,
			Q11.hemoglobin_min,
			Q11.hemoglobin_max,
			Q11.lactate_min,
			Q11.lactate_max,
			Q11.platelet_min,
			Q11.platelet_max,
			Q11.potassium_min,
			Q11.potassium_max,
			Q11.ptt_min,
			Q11.ptt_max,
			Q11.inr_min,
			Q11.inr_max,
			Q11.pt_min,
			Q11.pt_max,
			Q11.sodium_min,
			Q11.sodium_max,
			Q11.bun_min,
			Q11.bun_max,
			Q11.wbc_min,
			Q11.wbc_max,
	  		Q5.icd9_code as symptoms,
			Q2.icd9_code as patient_history,
			Q12.icd9_code as accident_causes,
			Q3.icd9_code as diagnoses
			
	FROM extended_patient_details AS Q1
	
	/* Add symptoms, diagnoses and patient history*/
	FULL JOIN patient_history_aggregated AS Q2 ON Q1.hadm_id = Q2.hadm_id
	FULL JOIN diagnoses_aggregated AS Q3 ON Q3.hadm_id = Q1.hadm_id		
	FULL JOIN extended_stay_details AS Q4 ON Q4.hadm_id = Q1.hadm_id
	FULL JOIN symptoms_aggregated AS Q5 ON Q5.hadm_id = Q1.hadm_id  
	FULL JOIN total_hospstays AS Q6 ON Q6.subject_id = Q1.patient_id
	FULL JOIN accident_codes_aggregated AS Q12 ON Q12.hadm_id = Q1.hadm_id
	
	/* Add vital signs and demographics*/
	FULL JOIN public.vitals_first_day ON Q1.icustay_id = public.vitals_first_day.icustay_id
	FULL JOIN public.weight_first_day ON Q1.icustay_id = public.weight_first_day.icustay_id
	FULL JOIN public.height_first_day ON Q1.icustay_id = public.height_first_day.icustay_id
	FULL JOIN rrt_first_day AS Q7 ON Q1.icustay_id = Q7.icustay_id 
	FULL JOIN ventilation_first_day AS Q8 ON Q8.icustay_id = Q1.icustay_id 
	FULL JOIN urine_output_first_day AS Q9 ON Q9.icustay_id = Q1.icustay_id 
	FULL JOIN gcs_first_day AS Q10 ON Q10.icustay_id = Q1.icustay_id 
	FULL JOIN labs_first_day AS Q11 ON Q11.icustay_id = Q1.icustay_id
	
	
	/*Filter certain patients and cases*/
	WHERE age > 0);