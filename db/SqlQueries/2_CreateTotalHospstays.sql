SET search_path TO public,mimiciii;
DROP TABLE IF EXISTS total_hospstays;
CREATE TABLE total_hospstays AS
(SELECT mimiciii.patients.subject_id,
MAX(hospstay_seq) as total_hospstays
FROM public.icustay_detail
JOIN mimiciii.patients ON mimiciii.patients.subject_id = public.icustay_detail.subject_id
GROUP BY mimiciii.patients.subject_id);