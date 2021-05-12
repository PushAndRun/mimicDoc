# Databases
### Content of this folder
- All exports that are relevant in order to train the ML model
- All exports that are required to create the mongo DB dictionaries that will be provided by the backend
- All queries that were used to create these exports

### Necessary steps to create the exports
- In case that you want to execute the queries on your machine the following steps need to be followed:
	1. Install the mimic III database in a local postgres database (https://mimic.physionet.org/tutorials/install-mimic-locally-windows/)
	2. Follow the steps in the README file in the mimic-code-master/concepts folder in oder to create the derived databases in postgres
	3. Execute all SQL scripts in the SqlQueries folder in the given order (extendedAdmissionDetailQuery can be skipped - this is only a view)
	4. All exported csv files will be located under 'C:\Users\Public\' (the target folder can be changed at the end of each "Export_..." scripts)
 


