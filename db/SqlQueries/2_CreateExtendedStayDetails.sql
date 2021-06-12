SET search_path TO public,mimiciii;
DROP TABLE IF EXISTS extended_stay_details;

CREATE TABLE extended_stay_details AS (

SELECT 
Q2.hadm_id,
MAX(icustay_seq) as number_of_ICU_stays,
SUM(los_icu) as total_length_of_stay_icu,
Q2.days_to_death

FROM public.icustay_detail
INNER JOIN (SELECT 
			hadm_id,
			floor(extract(epoch FROM AGE(dod, admittime))/86400) as days_to_death
			FROM public.icustay_detail) as Q2 
ON public.icustay_detail.hadm_id = Q2.hadm_id

WHERE Q2.days_to_death >= 0 OR Q2.days_to_death IS NULL

GROUP BY Q2.hadm_id, Q2.days_to_death, public.icustay_detail.admittime, public.icustay_detail.dod);