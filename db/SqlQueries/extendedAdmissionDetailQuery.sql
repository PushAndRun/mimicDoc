SELECT 		Q1.patient_id,
			Q1.hadm_id, 
			Q1.icustay_id,
			hospstay_seq,
			icustay_seq,
			age, 
			gender, 
			ROUND(weight) as weight, 
			ROUND(height) as height,
			ROUND(meanbp_mean) as meanbp_mean,
		 	ROUND(meanbp_min) as meanbp_min,
			ROUND(meanbp_max) as meanbp_max,
			resprate_min,
			resprate_max,
			ROUND(resprate_mean) as resprate_mean,
			tempc_mean,
			glucose_min,
			glucose_max,
			ROUND(glucose_mean) as glucose_mean,
			Q2.icd9_code as patient_history, 
			Q3.icd9_code as diagnoses,
			ROUND(los_hospital,2) as length_of_stay_hospital, 
			ROUND(los_icu,2) as length_of_stay_icu, 
			hospital_expire_flag as died_in_hospital
			
	FROM extended_patient_details AS Q1
	
	/* Add diagnoses and patient history*/
	FULL JOIN patient_history_aggregated AS Q2 ON Q1.hadm_id = Q2.hadm_id
	FULL JOIN diagnoses_aggregated AS Q3 ON Q3.hadm_id = Q1.hadm_id		
	
	/* Add vital signs and demographics*/
	FULL JOIN public.vitals_first_day ON Q1.icustay_id = public.vitals_first_day.icustay_id
	FULL JOIN public.weight_first_day ON Q1.icustay_id = public.weight_first_day.icustay_id
	FULL JOIN public.height_first_day ON Q1.icustay_id = public.height_first_day.icustay_id
	
	/*Filter certain patients and cases*/
	WHERE age < 89;