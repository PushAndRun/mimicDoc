ALTER TABLE mimiciii.admissions ALTER COLUMN hospital_expire_flag TYPE bool USING hospital_expire_flag::int::bool;