SET search_path TO public,mimiciii;
CREATE TABLE extended_stay_details AS (SELECT 
hadm_id,
MAX(icustay_seq) as number_of_ICU_stays,
SUM(los_icu) as total_length_of_stay_icu,
date_part('days',AGE(dod, admittime)) as days_to_death
FROM public.icustay_detail
GROUP BY hadm_id, admittime, dod);