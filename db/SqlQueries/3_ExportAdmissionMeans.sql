COPY 
(SELECT
ROUND(AVG(hospstay_seq),2)  as hospstay_seq,
ROUND(AVG(total_hospstays),2)  as total_hospstays,
ROUND(AVG(length_of_stay_hospital),2)  as length_of_stay_hospital,
ROUND(AVG(length_of_stay_icu),2)  as length_of_stay_icu,
ROUND(AVG(total_length_of_stay_icu),2)  as total_length_of_stay_icu,
AVG(days_to_death)  as days_to_death,
ROUND(AVG(age)) as age,
ROUND(AVG(weight),2)  as weight,
AVG(height)  as height,
AVG(heartrate_mean)  as heartrate_mean,
AVG(heartrate_min)  as heartrate_min,
AVG(heartrate_max)  as heartrate_max,
AVG(meanbp_mean)  as meanbp_mean,
AVG(meanbp_min)  as meanbp_min,
AVG(meanbp_max)  as meanbp_max,
AVG(resprate_mean)  as resprate_mean,
AVG(resprate_min)  as resprate_min,
AVG(resprate_max)  as resprate_max,
AVG(tempc_mean)  as tempc_mean,
AVG(tempc_min)  as  tempc_min,
AVG(tempc_max)  as  tempc_max,
AVG(spo2_mean)  as spo2_mean,
AVG(spo2_min)  as  spo2_min,
AVG(spo2_max)  as  spo2_max,
AVG(glucose_mean)  as glucose_mean,
AVG(glucose_min)  as  glucose_min,
AVG(glucose_max)  as  glucose_max,
AVG(received_dialysis)  as  received_dialysis,
AVG(received_ventilation)  as  received_ventilation,
AVG(urineoutput)  as  urineoutput
FROM extended_admission_details)
/*Export to*/
TO 'C:\Users\Public\admission_means.csv' DELIMITER ',' CSV HEADER;