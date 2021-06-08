SET search_path TO public,mimiciii;
CREATE TABLE extended_patient_details AS
(SELECT 
				 mimiciii.patients.subject_id as patient_id,
				 public.icustay_detail.icustay_id,
				 public.icustay_detail.hadm_id,
				 public.icustay_detail.first_icu_stay,
				 public.icustay_detail.hospstay_seq,
				 public.icustay_detail.icustay_seq,
				 public.icustay_detail.admittime,
				 date_part('year',AGE(public.icustay_detail.admittime, mimiciii.patients.dob)) as age,
				 public.icustay_detail.gender,
				 public.icustay_detail.los_hospital,
				 public.icustay_detail.los_icu,
				 public.icustay_detail.hospital_expire_flag		 
				
				FROM public.icustay_detail
				JOIN mimiciii.patients ON mimiciii.patients.subject_id = public.icustay_detail.subject_id
						 
				 /*Include only the first ICU stay*/
				 WHERE
				 public.icustay_detail.icustay_seq = 1 AND
				 
				 /*Exclude organ donors*/
				 public.icustay_detail.los_icu > 0 AND
				 public.icustay_detail.los_hospital > 0)