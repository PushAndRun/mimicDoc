<template>
  <div>
     <b-navbar toggleable="false" type="dark" variant="dark">
    <b-navbar-brand style="color:white">RoboDoc</b-navbar-brand>

     <b-navbar-toggle target="navbar-toggle-collapse" style="color:white;">
        Menu
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto" >
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/homepage" >Homepage</router-link></b-nav-item><b-nav-item><router-link style="text-decoration: none; color:white " to="/patients">View all your Patients </router-link></b-nav-item>
          
           <b-nav-item><router-link style="text-decoration: none; color:white " to="/Diagnoses">Get a Diagnosis Suggestion</router-link></b-nav-item>
          
          <b-nav-item  @click="logout"><p style="color:white">Sign Out</p></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    <br />

    

    <b-form id="formular" @submit="submit">
      <br />
      <h2>Patient processing form</h2>
      <br />
      <br />
      <b-row>
        <b-col>
      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          v-model="form.name"
          placeholder="Patient's name"
          required
         
        ></b-form-input>
      </b-form-group>
        </b-col>
        <b-col>
      <b-input-group id="input-group-3" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.dateOfBirth"
          type="text"
          placeholder="YYYY-MM-DD"
          required
        ></b-form-input>
        <b-input-group-append>
          <b-form-datepicker
            v-model="form.dateOfBirth"
            button-only
            right
            dark
            locale="en-US"
          ></b-form-datepicker>
        </b-input-group-append>
      </b-input-group>
        </b-col>
      </b-row>

   

      <b-form-group
        id="input-group-7"
        label-for="input-7"
        label-class="font-weight-bold"
       
        
      >
        <b-form-radio v-model="form.gender" value="M" name="gender" required>male</b-form-radio>
        <b-form-radio v-model="form.gender" value="F" name="gender" required>female</b-form-radio>
      </b-form-group>

      <b-row>
        <b-col>
      <b-form-group id="input-group-4" label-for="input-4">
        <b-form-input
          id="input-4"
          type="number"
          v-model="form.weight"
          placeholder="Patient's Weight in kg"
          required
          
        ></b-form-input>
      </b-form-group>
        </b-col>
        <b-col>
      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input
          type="number"
          id="input-5"
          v-model="form.height"
          placeholder="Patient's Height in cm"
          required
          
        ></b-form-input>
      </b-form-group>
        </b-col>
      </b-row>
      <br>

        <b-row>
        <b-col>

          

      <b-form-group id="input-hospstay_seq" label-for="input-hospstay_seq"
          label="How many times has the patient been to the hospital until now?" label-class="font-weight-bold">
        <b-form-input
          id="input-hospstay_seq"
          type="number"
          v-model="form.hospstay_seq"
          placeholder="One if this is the first"
         
        ></b-form-input>
      </b-form-group>

    
        </b-col>
        <b-col>


        <b-form-group id="input-total_hospstays" label-for="input-total_hospstays"
          label="Total Number of hospital stays" label-class="font-weight-bold">
        <b-form-input
          id="input-total_hospstays"
          type="number"
          v-model="form.total_hospstays"
          placeholder="One if this is the first"
         
        ></b-form-input>
      </b-form-group>

        </b-col>
        </b-row>



        <b-row>
        <b-col>

          

      <b-form-group id="input-length_of_stay_hospital" label-for="input-length_of_stay_hospital"
          label="Length of stay in the hospital for this specific admission" label-class="font-weight-bold">
        <b-form-input
          id="input-length_of_stay_hospital"
          type="number"
          v-model="form.length_of_stay_hospital"
         placeholder="in days"
        ></b-form-input>
      </b-form-group>
        </b-col>
        <b-col>


     

<b-form-group id="input-number_of_icu_stays" label-for="input-number_of_icu_stays"
          label="Number of ICU stays during this hospital admission" label-class="font-weight-bold">
        <b-form-input
          id="input-number_of_icu_stays"
          type="number"
          v-model="form.number_of_icu_stays"
          
         
        ></b-form-input>
      </b-form-group>
        </b-col>
        </b-row>

     

      <b-row>
        <b-col>


          
          <b-form-group id="input-length_of_stay_icu" label-for="input-length_of_stay_icu"
          label="The length of stay of the first ICU stay" label-class="font-weight-bold">
        <b-form-input
          id="input-length_of_stay_icu"
          type="number"
          v-model="form.length_of_stay_icu"
          placeholder="In days"
         
        ></b-form-input>
      </b-form-group>


       </b-col>
        <b-col>

          <b-form-group id="input-total_length_of_stay_icu" label-for="input-total_length_of_stay_icu"
          label="The total length of all ICU stays during this hospital admission" label-class="font-weight-bold">
        <b-form-input
          id="input-total_length_of_stay_icu"
          type="number"
          v-model="form.total_length_of_stay_icu"
          placeholder="In days"
          
         
        ></b-form-input>
      </b-form-group>

        </b-col>
</b-row>


<b-row>
        

 <!--
  <b-col>

<b-form-group
        id="input-group-died_in_hos"
        label="Did the patient died during this hospital admission?"
         label-class="font-weight-bold"
        >

         <b-form-radio v-model="form.died_in_hospital"  name="yes" value="1">Yes</b-form-radio>
      <b-form-radio v-model="form.died_in_hospital"  name="no" value="0">No</b-form-radio>
          </b-form-group>

        </b-col>
     
       
        <b-col>

          <b-form-group id="input-group-days_to_death" label-for="input-days_to_death"
          label="If yes, please select the number of days from the hospital admission to the death in hospital" label-class="font-weight-bold">
        <b-form-input
          id="input-days_to_death"
          type="number"
          v-model="form.days_to_death"
         
        ></b-form-input>
      </b-form-group>

        </b-col>

        -->
</b-row>



  
      <br>

      <b-form-group
        id="input-group-labValues"
        label="Patient's Vital Signs of the first 24 hours on ICU:"
        label-class="font-weight-bold"
        label-for="input-labValues"
      >

    <b-button @click=activateLabValues variant="outline-primary" size="">{{ minOrMaxLabValues}}</b-button>
      
      <div v-if=labValuesActive>

        <br>

        <b-row>
        <b-col>

       <b-form-group
        id="input-group-bp"
        label="Heartrate:"
        label-class="font-weight-bold"
        label-for="input-bp"
      >
      <b-button @click=activateHr variant="outline-primary" size="sm">{{ minOrMaxHr}}</b-button>
      
      <div v-if=heartrateActive>
      <br>
        
      <b-row>
        <b-col>
        <b-form-input
          id="input-hr_mean"
          v-model="form.heartrate_mean"
          type="number"
          placeholder="Mean"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-hrmin"
          v-model="form.heartrate_min"
          type="number"
          placeholder="Min"
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-hrmax"
          v-model="form.heartrate_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

</b-col>
        <b-col>

      <b-form-group
        id="input-group-bp"
        label="Bloodpressure levels:"
        label-class="font-weight-bold"
        label-for="input-bp"
      >
      <b-button @click=activateBp variant="outline-primary" size="sm">{{ minOrMaxBp}}</b-button>
      
      <div v-if=bloodpressureActive>
      <br>
        
      <b-row>
        <b-col>
        <b-form-input
          id="input-bpmean"
          v-model="form.meanbp_mean"
          type="number"
          placeholder="Mean"
         
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-bpmin"
          v-model="form.meanbp_min"
          type="number"
          placeholder="Min"
         
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-bpmax"
          v-model="form.meanbp_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>
      

      <br />
      </b-col>
        <b-col>
      <b-form-group
        id="input-group-resprate"
        label="Resprate:"
        label-class="font-weight-bold"
        label-for="input-bp"
      >
      <b-button @click=activateRe variant="outline-primary" size="sm">{{ minOrMaxRe}}</b-button>
      <div v-if=resprateActive>
        <br>
      <b-row>
        <b-col>
        <b-form-input
          id="input-respratemean"
          v-model="form.resprate_mean"
          type="number"
          placeholder="Mean"
        
        ></b-form-input>
        </b-col>
        <br />
        <b-col>
        <b-form-input
          id="input-respratemin"
          v-model="form.resprate_min"
          type="number"
          placeholder="Min"
       
        ></b-form-input>
        </b-col>
        <br />
        <b-col>
        <b-form-input
          id="input-respratemax"
          v-model="form.resprate_max"
          type="number"
          placeholder="Max"
        
        ></b-form-input>
        </b-col>
      </b-row>
      </div>
      </b-form-group>
      <br />

      </b-col>
      </b-row>

      
      <b-row>
      <b-col>

        <b-form-group
        id="input-group-temp"
        label="Body Temperature values in C°"
        label-class="font-weight-bold"
        label-for="input-bp"
      >
      <b-button @click=activateTemp variant="outline-primary" size="sm">{{ minOrMaxTemp}}</b-button>
      <div v-if=tempActive>
        <br>
      <b-row>
        <b-col>
        <b-form-input
          id="input-tempmean"
          v-model="form.tempc_mean"
          type="number"
          placeholder="Mean"
        
        ></b-form-input>
        </b-col>
        <br />
        <b-col>
        <b-form-input
          id="input-tempmin"
          v-model="form.tempc_min"
          type="number"
          placeholder="Min"
       
        ></b-form-input>
        </b-col>
        <br />
        <b-col>
        <b-form-input
          id="input-tempmax"
          v-model="form.tempc_max"
          type="number"
          placeholder="Max"
        
        ></b-form-input>
        </b-col>
      </b-row>
      </div>
      </b-form-group>


      </b-col>
        <b-col>
      
      <b-form-group
        id="input-group-glucose"
        label="Glucose values:"
        label-class="font-weight-bold"
        label-for="input-bp"
      >
      
      <b-button @click=activateGl variant="outline-primary" size="sm">{{ minOrMaxGl}}</b-button>
      <div v-if=glucoseActive>
        <br>
      <b-row>
        <b-col>
        <b-form-input
          id="input-glucosemean"
          v-model="form.glucose_mean"
          type="number"
          placeholder="Mean"
        ></b-form-input>
        </b-col>
        <br />
        <b-col>
        <b-form-input
          id="input-glucosemin"
          v-model="form.glucose_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br />
        <b-col>
        <b-form-input
          id="input-glucosemax"
          v-model="form.glucose_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
      </b-row>
      </div>
      </b-form-group>

       </b-col>
        
        <b-col>

      <b-form-group
        id="input-group-spo2"
        label="Blood oxygen values:"
        label-class="font-weight-bold"
        label-for="input-bp"
      >
      <b-button @click=activateSpo2 variant="outline-primary" size="sm">{{ minOrMaxSpo2}}</b-button>
      
      <div v-if=spo2Active>
      <br>
        
      <b-row>
        <b-col>
        <b-form-input
          id="input-spo2_mean"
          v-model="form.spo2_mean"
          type="number"
          placeholder="Mean"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-spo2_min"
          v-model="form.spo2_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-spo2_max"
          v-model="form.spo2_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>


        </b-col>
        </b-row>
        </div>
      </b-form-group>

      </b-col>
        </b-row>

      <br />

      <b-row>
        <b-col>

      <b-form-group
        id="input-group-received_dialysis"
        label="Did the patient receive dialysis:"
         label-class="font-weight-bold"
        >

         <b-form-radio v-model="form.received_dialysis"  name="yes" value="1">Yes</b-form-radio>
      <b-form-radio v-model="form.received_dialysis"  name="no" value="0">No</b-form-radio>
          </b-form-group>

        <br>
            </b-col>
            <b-col>
            <b-form-group
        id="input-group-received_ventilation"
        label="Did the patient receive ventilation:"
         label-class="font-weight-bold"
        >

         <b-form-radio v-model="form.received_ventilation" name="yes" value="1">Yes</b-form-radio>
      <b-form-radio v-model="form.received_ventilation"  name="no" value="0">No</b-form-radio>
          </b-form-group>



        </b-col>
          </b-row>
        


        
        <b-form-group
        id="input-group-urineoutput"
        label="Urine Output:"
        label-class="font-weight-bold"
        >

         <b-form-input
          id="input-urineoutput"
          v-model="form.urineoutput"
          type="number"
          placeholder="Urine Output in ml"
          
        ></b-form-input>

        </b-form-group>



        <b-form-group
        id="input-group-gcs"
        label="Glasgow coma score:"
        label-class="font-weight-bold"
        label-for="input-gcs"
      >
      <b-button @click=activateGcs variant="outline-primary" size="sm">{{ minOrMaxGcs}}</b-button>
      
      <div v-if=gcsActive>
      <br>
        
      <b-row>
        <b-col>
        <b-form-select
          id="input-gcsmotor"
          v-model="form.gcsMotor"
          :options="gcsMotorOptions"
          
        ></b-form-select>
        </b-col>
        <br>
        <b-col>
         <b-form-select
          id="input-gcsverbal"
          v-model="form.gcsVerbal"
          :options="gcsVerbalOptions"
          
          
        ></b-form-select>
        </b-col>
        <br>
        <b-col>
        <b-form-select
          id="input-gcseyes"
          v-model="form.gcsEyes"
          :options="gcsEyesOptions"
          
          
        ></b-form-select>
        </b-col>
        </b-row>
        </div>
      </b-form-group>
          <br>

  
      <b-row>
        <b-col>
        
          <b-form-group
        id="input-group-anionGap"
        label="Anion Gap:"
        label-class="font-weight-bold"
        label-for="input-ag"
      >
      <b-button @click=activateAnionGap variant="outline-primary" size="sm">{{ minOrMaxAnionGap}}</b-button>
      
      <div v-if=anionGapActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-anionGap_min"
          v-model="form.anionGap_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-anionGap_max"
          v-model="form.anionGap_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />
</b-col>
        
        <b-col>

        <b-form-group
        id="input-group-albumin"
        label="Albumin value:"
        label-class="font-weight-bold"
        label-for="input-albumin"
      >

      <b-button @click=activateAlbumin variant="outline-primary" size="sm">{{ minOrMaxAlbumin}}</b-button>
      
      <div v-if=albuminActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-albumin_min"
          v-model="form.albumin_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-albumin_max"
          v-model="form.albumin_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />
      </b-col>
        
        <b-col>


        <b-form-group
        id="input-group-ibf"
        label="Immature band forms in %:"
        label-class="font-weight-bold"
        label-for="input-albumin"
      >

      <b-button @click=activateIbf variant="outline-primary" size="sm">{{ minOrMaxIbf}}</b-button>
      
      <div v-if=ibfActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-ibf_min"
          v-model="form.ibf_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-ibf_max"
          v-model="form.ibf_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />
      </b-col>
        </b-row>

          <b-row>
          <b-col>
       <b-form-group
        id="input-group-bicarbonate"
        label="Bicarbonate Value:"
        label-class="font-weight-bold"
        label-for="input-bicarbonate"
      >

      <b-button @click=activateBicarbonate variant="outline-primary" size="sm">{{ minOrMaxBicarbonate}}</b-button>
      
      <div v-if=bicarbonateActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-bicarbonate_min"
          v-model="form.bicarbonate_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-bicarbonate_max"
          v-model="form.bicarbonate_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />
      </b-col>
        
        <b-col>

      <b-form-group
        id="input-group-bilirubin"
        label="Bilirubin Value:"
        label-class="font-weight-bold"
        label-for="input-bilirubin"
      >

      <b-button @click=activateBilirubin variant="outline-primary" size="sm">{{ minOrMaxBilirubin}}</b-button>
      
      <div v-if=bilirubinActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-bilirubin_min"
          v-model="form.bilirubin_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-bilirubin_max"
          v-model="form.bilirubin_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />
      </b-col>
        
        <b-col>

      <b-form-group
        id="input-group-creatinine"
        label="Creatinine Value:"
        label-class="font-weight-bold"
        label-for="input-creatinine"
      >

      <b-button @click=activateCreatinine variant="outline-primary" size="sm">{{ minOrMaxCreatinine}}</b-button>
      
      <div v-if=creatinineActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-creatinine_min"
          v-model="form.creatinine_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-creatinine_max"
          v-model="form.creatinine_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />

      </b-col>
        </b-row>

         <b-row>
           <b-col>

      <b-form-group
        id="input-group-chloride"
        label="Chloride Value:"
        label-class="font-weight-bold"
        label-for="input-chloride"
      >

      <b-button @click=activateChloride variant="outline-primary" size="sm">{{ minOrMaxChloride}}</b-button>
      
      <div v-if=chlorideActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-chloride_min"
          v-model="form.chloride_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-chloride_max"
          v-model="form.chloride_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />

       </b-col>
        
        <b-col>

       <b-form-group
        id="input-group-hematocrit"
        label="Hematocrit Value:"
        label-class="font-weight-bold"
        label-for="input-hematocrit"
      >

      <b-button @click=activateHematocrit variant="outline-primary" size="sm">{{ minOrMaxHematocrit}}</b-button>
      
      <div v-if=hematocritActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-hematocrit_min"
          v-model="form.hematocrit_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-hematocrit_max"
          v-model="form.hematocrit_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />
     </b-col>
       
        <b-col>

       <b-form-group
        id="input-group-hemoglobin"
        label="Hemoglobin Value:"
        label-class="font-weight-bold"
        label-for="input-hemoglobin"
      >

      <b-button @click=activateHemoglobin variant="outline-primary" size="sm">{{ minOrMaxHemoglobin}}</b-button>
      
      <div v-if=hemoglobinActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-hemoglobin_min"
          v-model="form.hemoglobin_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-hemoglobin_max"
          v-model="form.hemoglobin_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />

       </b-col>
        </b-row>

        <b-row>
<b-col>

      <b-form-group
        id="input-group-lactate"
        label="Lactate Value:"
        label-class="font-weight-bold"
        label-for="input-lactate"
      >

      <b-button @click=activateLactate variant="outline-primary" size="sm">{{ minOrMaxLactate}}</b-button>
      
      <div v-if=lactateActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-lactate_min"
          v-model="form.lactate_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-lactate_max"
          v-model="form.lactate_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />
 </b-col>
        
        <b-col>

      <b-form-group
        id="input-group-platelet"
        label="Platelet Value:"
        label-class="font-weight-bold"
        label-for="input-platelet"
      >

      <b-button @click=activatePlatelet variant="outline-primary" size="sm">{{ minOrMaxPlatelet}}</b-button>
      
      <div v-if=plateletActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-platelet_min"
          v-model="form.platelet_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-platelet_max"
          v-model="form.platelet_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />


 </b-col>
        
        <b-col>

      <b-form-group
        id="input-group-potassium"
        label="Potassium Value:"
        label-class="font-weight-bold"
        label-for="input-potassium"
      >

      <b-button @click=activatePotassium variant="outline-primary" size="sm">{{ minOrMaxPotassium}}</b-button>
      
      <div v-if=potassiumActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-potassium_min"
          v-model="form.potassium_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-potassium_max"
          v-model="form.potassium_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />

      </b-col>
        </b-row>

        <b-row>
           <b-col>
      

      <b-form-group
        id="input-group-ptt"
        label="Partial Thromboplastin Time in seconds:"
        label-class="font-weight-bold"
        label-for="input-ptt"
      >

      <b-button @click=activatePtt variant="outline-primary" size="sm">{{ minOrMaxPtt}}</b-button>
      
      <div v-if=pttActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-ptt_min"
          v-model="form.ptt_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-ptt_max"
          v-model="form.ptt_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />


</b-col>
        
        <b-col>
       <b-form-group
        id="input-group-inr"
        label="International Normalized Ratio:"
        label-class="font-weight-bold"
        label-for="input-inr"
      >

      <b-button @click=activateInr variant="outline-primary" size="sm">{{ minOrMaxInr}}</b-button>
      
      <div v-if=inrActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-inr_min"
          v-model="form.inr_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-inr_max"
          v-model="form.inr_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />

      </b-col>
        
        <b-col>


      <b-form-group
        id="input-group-pt"
        label="Prothrombin Time in seconds:"
        label-class="font-weight-bold"
        label-for="input-pt"
      >

      <b-button @click=activatePt variant="outline-primary" size="sm">{{ minOrMaxPt}}</b-button>
      
      <div v-if=ptActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-pt_min"
          v-model="form.pt_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-pt_max"
          v-model="form.pt_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />

      </b-col>
        </b-row>

         <b-row>
           <b-col>


       <b-form-group
        id="input-group-sodium"
        label="Sodium Value:"
        label-class="font-weight-bold"
        label-for="input-sodium"
      >

      <b-button @click=activateSodium variant="outline-primary" size="sm">{{ minOrMaxSodium}}</b-button>
      
      <div v-if=sodiumActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-sodium_min"
          v-model="form.sodium_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-sodium_max"
          v-model="form.sodium_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />

      </b-col>
        <b-col>

       <b-form-group
        id="input-group-bun"
        label="Urea nitrogen levels:"
        label-class="font-weight-bold"
        label-for="input-bun"
      >

      <b-button @click=activateBun variant="outline-primary" size="sm">{{ minOrMaxBun}}</b-button>
      
      <div v-if=bunActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-bun_min"
          v-model="form.bun_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-bun_max"
          v-model="form.bun_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      <br />


      </b-col>
      
        <b-col>


      <b-form-group
        id="input-group-wbc"
        label="WBCs per microliter:"
        label-class="font-weight-bold"
        label-for="input-wbc"
      >

      <b-button @click=activateWbc variant="outline-primary" size="sm">{{ minOrMaxWbc}}</b-button>
      
      <div v-if=wbcActive>
      <br>
        
      <b-row>
        
        <br>
        <b-col>
        <b-form-input
          id="input-wbc_min"
          v-model="form.wbc_min"
          type="number"
          placeholder="Min"
          
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-wbc_max"
          v-model="form.wbc_max"
          type="number"
          placeholder="Max"
          
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>

      </b-col>
        </b-row>

      </div>

      </b-form-group>
     


      <br>



    

    <!--
      
   <diagnoses @clicked="symptomsToForm"></diagnoses>

   -->

   <b-form-group
        id="input-symp"
        label="Patient's symptoms:"
        label-class="font-weight-bold"
        label-for="input-8"
      >
        <vue-bootstrap-typeahead
          v-model="valueSymp"
          placeholder="Select Symptoms"
          :data="this.availableSymptoms"
          @hit="appendSymptoms"
        >
        </vue-bootstrap-typeahead>

        Selected Symptoms: {{ form.symptoms.join(", ") }}
      </b-form-group>
     
     
    <br>

      <b-form-group
        id="input-group-history"
        label="Patient's history:"
        label-class="font-weight-bold"
        label-for="input-history"
      >
        <vue-bootstrap-typeahead
          v-model="valueHist"
          placeholder="Select Diagnoses"
          :data="this.availableDiagnoses"
          @hit="appendHistory"
        >
        </vue-bootstrap-typeahead>

        Selected Diagnoses for Patient's History:
        {{ form.patient_history.join(", ") }}
      </b-form-group>

      <br />
   
      
 <b-form-group
        id="input-group-8"
        label="Patient's Accident Cause:"
        label-class="font-weight-bold"
        label-for= "Type in Accident Causes and press Enter"
      >
    

    <b-form-tags 
    input-id="input-accidentCauses" 
    v-model="form.accident_causes"
    placeholder="Enter Accident Causes Code">
    </b-form-tags>
      

      </b-form-group>

     
      
    <br>
      <b-form-group
        id="input-group-8"
        label="Patient's diagnoses:"
        label-class="font-weight-bold"
        label-for="input-8"
      >
        <vue-bootstrap-typeahead
          v-model="valueDiag"
          placeholder="Select Diagnoses"
          :data="this.availableDiagnoses"
          @hit="appendDiagnoses"
        >
        </vue-bootstrap-typeahead>

        Selected Diagnoses: {{ form.diagnoses.join(", ") }}
      </b-form-group>


      <b-button
        style="margin-bottom:30px"
        type="submit"
        variant="outline-success"
        >Submit</b-button
      >
    </b-form>

    <v-footer>
      <p style="color:dimgrey">2021 - RoboDoc</p>
    </v-footer>
  </div>
</template>

<script>
import PatientService from "../services/PatientService";
import DiagnosesService from "../services/DiagnosesService";


export default {
  components:{
   
  },
  data() {
    return {
      username: "",
      availableDiagnoses: [],
      availableSymptoms: [],
      allSymptoms: [],
      valueDiag: "",
      valueHist: "",
      valueSymp:'',
       gcsMotor: null,
        gcsMotorOptions: [
          { value: null, text: "Best motor response" },
          { value: 1, text: 'No movement' },
          { value: 2, text: 'Stretch synergies' },
          { value: 3, text: 'Flex synergies' },
          { value: 4, text: 'Incomplete defense' },
          { value: 5, text: 'Specific defence' },
          { value: 6, text: 'Adequate' },
        ],

          gcsVerbal: null,
        gcsVerbalOptions: [
          { value: null, text: "Best verbal response" },
          { value: 1, text: 'None' },
          { value: 2, text: 'Incomprehensible' },
          { value: 3, text: 'Confused' },
          { value: 4, text: 'Incompletely oriented' },
          { value: 5, text: 'Fully oriented' },
        ],

         gcsEyes: null,
        gcsEyesOptions: [
          { value: null, text: "Best eye response" },
          { value: 1, text: 'No eye opening' },
          { value: 2, text: 'Reaction to pain stimulus' },
          { value: 3, text: 'Reaction to prompt' },
          { value: 4, text: 'Spontaneous' },
        ],
      heartrateActive:false,
      bloodpressureActive:false, 
      glucoseActive:false, 
      resprateActive:false, 
      spo2Active:false,
      gcsActive:false,
      anionGapActive:false,
      albuminActive:false,
      ibfActive:false,
      bicarbonateActive:false,
      bilirubinActive:false,
      creatinineActive:false,
      chlorideActive:false,
      hematocritActive:false,
      hemoglobinActive:false,
      lactateActive:false,
      plateletActive:false,
      potassiumActive:false,
      pttActive:false,
      inrActive:false,
      ptActive:false,
      sodiumActive:false,
      bunActive:false,
      wbcActive:false,
      labValuesActive:false,
      tempActive:false,
      

    

      form: {
        name: "",
        dateOfBirth: "",
        gender: "",
        weight: "",
        height: "",
       hospstay_seq: "",
        total_hospstays: "",
        length_of_stay_hospital: "",
        number_of_icu_stays: "",
        length_of_stay_icu: "",
        total_length_of_stay_icu: "",
    //    days_to_death: "",
    //  died_in_hospital: "",
        heartrate_mean: "",
        heartrate_min: "",
        heartrate_max: "",
        meanbp_mean: "",
        meanbp_min: "",
        meanbp_max: "",
        resprate_min: "",
        resprate_max: "",
        resprate_mean: "",
        tempc_mean: "",
        tempc_min: "",
        tempc_max:"",
        glucose_min: "",
        glucose_max: "",
        glucose_mean: "",
        spo2_mean: "",
        spo2_min: "",
        spo2_max: "",
        urineoutput: "",
        anionGap_min: "",
        anionGap_max: "",
        albumin_min: "",
        albumin_max: "",
        ibf_min: "",
        ibf_max: "",
        bicarbonate_min: "",
        bicarbonate_max: "",
        bilirubin_min: "",
        bilirubin_max: "",
        creatinine_min: "",
        creatinine_max: "",
        chloride_min: "",
        chloride_max: "",
        hematocrit_min: "",
        hematocrit_max: "",
        hemoglobin_min: "",
        hemoglobin_max: "",
        lactate_min: "",
        lactate_max: "",
        platelet_min: "",
        platelet_max: "",
        potassium_min: "",
        potassium_max: "",
        ptt_min: "",
        ptt_max: "",
        inr_min: "",
        inr_max: "",
        pt_min: "",
        pt_max: "",
        sodium_min: "",
        sodium_max: "",
        bun_min: "",
        bun_max: "",
        wbc_min: "",
        wbc_max: "",
        received_dialysis: "",
        received_ventilation: "",
        gcsMotor: null,
        gcsVerbal: null,
        gcsEyes: null,
        symptoms: [],
        patient_history: [],
        accident_causes: [],
        diagnoses: [],
      },
     
    };
  },

  async created() {

   
        document.title = "RoboDoc"
    
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/registration");
    }

    this.username = this.$store.getters.getUser.username;

    try {
      const response = await DiagnosesService.fetchDiagnoses();
      this.availableDiagnoses = response;
      this.availableDiagnoses = this.availableDiagnoses
        .map((a) => a.short_title)
        .reduce(function(a, b) {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, []);
      console.log(this.availableDiagnoses)
    } catch (error) {
      console.log("unable to fetch diagnoses from server");
    }

    try {
      const response = await DiagnosesService.fetchSymptoms();
      this.availableSymptoms = response;

      this.allSymptoms = response;
      this.availableSymptoms = this.availableSymptoms
        .map((a) => a.short_title)
        .reduce(function(a, b) {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, []);
    } catch (error) {
      console.log("unable to fetch symptoms from server");
    }
    
      console.log(this.availableSymptoms)
  },
  computed:{
    minOrMaxHr(){
      if(this.heartrateActive){
        return "-";
      }else{
        return "+";
      }
    }, 
    minOrMaxBp(){
      if(this.bloodpressureActive){
        return "-";
      }else{
        return "+";
      }
    }, 
      minOrMaxGl(){
      if(this.glucoseActive){
        return "-";
      }else{
        return "+";
      }
    }, 
    minOrMaxRe(){
      if(this.resprateActive){
        return "-";
      }else{
        return "+";
      }
    }, 

     minOrMaxTemp(){
      if(this.tempActive){
        return "-";
      }else{
        return "+";
      }
    }, 

     minOrMaxSpo2(){
      if(this.spo2Active){
        return "-";
      }else{
        return "+";
      }
    }, 

     minOrMaxGcs(){
      if(this.gcsActive){
        return "-";
      }else{
        return "+";
      }
    },

     minOrMaxAnionGap(){ 
      if(this.anionGapActive){
        return "-";
      }else{
        return "+";
      }
    },

      minOrMaxAlbumin(){ 
      if(this.albuminActive){
        return "-";
      }else{
        return "+";
      }
    },

       minOrMaxIbf(){ 
      if(this.ibfActive){
        return "-";
      }else{
        return "+";
      }
    },

     minOrMaxBicarbonate(){ 
      if(this.bicarbonateActive){
        return "-";
      }else{
        return "+";
      }
    },

     minOrMaxBilirubin(){ 
      if(this.bilirubinActive){
        return "-";
      }else{
        return "+";
      }
    },

     minOrMaxCreatinine(){ 
      if(this.creatinineActive){
        return "-";
      }else{
        return "+";
      }
    },

     minOrMaxChloride(){ 
      if(this.chlorideActive){
        return "-";
      }else{
        return "+";
      }
    },


     minOrMaxHematocrit(){ 
      if(this.hematocritActive){
        return "-";
      }else{
        return "+";
      }
    },

     minOrMaxHemoglobin(){ 
      if(this.hemoglobinActive){
        return "-";
      }else{
        return "+";
      }
    },



         minOrMaxLactate(){ 
      if(this.lactateActive){
        return "-";
      }else{
        return "+";
      }
    },

    minOrMaxPlatelet(){ 
      if(this.plateletActive){
        return "-";
      }else{
        return "+";
      }
    },

      minOrMaxPotassium(){ 
      if(this.potassiumActive){
        return "-";
      }else{
        return "+";
      }
    },

      minOrMaxPtt(){ 
      if(this.pttActive){
        return "-";
      }else{
        return "+";
      }
    },

      minOrMaxInr(){ 
      if(this.inrActive){
        return "-";
      }else{
        return "+";
      }
    },

    minOrMaxPt(){ 
      if(this.ptActive){
        return "-";
      }else{
        return "+";
      }
    },

  minOrMaxSodium(){ 
    if(this.sodiumActive){
        return "-";
    } else{
        return "+";
      }
    },

      minOrMaxBun(){ 
    if(this.bunActive){
        return "-";
    } else{
        return "+";
      }
    },

    minOrMaxWbc(){ 
    if(this.wbcActive){
        return "-";
    } else{
        return "+";
      }
    },

    minOrMaxLabValues(){ 
    if(this.labValuesActive){
        return "-";
    } else{
        return "+";
      }
    },

  },
  methods: {

   
    

    

    activateBp(){
      this.bloodpressureActive=!this.bloodpressureActive; 
    }, 
    activateHr(){
      this.heartrateActive=!this.heartrateActive; 
    }, 
    activateGl(){
      this.glucoseActive=!this.glucoseActive; 
    }, 
    activateRe(){
      this.resprateActive=!this.resprateActive;
    },

    activateTemp(){
      this.tempActive=!this.tempActive;
    },

    activateSpo2(){
      this.spo2Active=!this.spo2Active; 
    },
    
     activateGcs(){
      this.gcsActive=!this.gcsActive; 
    }, 

    activateAnionGap () {
      this.anionGapActive=!this.anionGapActive;
    },

    activateAlbumin () {
      this.albuminActive=!this.albuminActive;
    },

    activateIbf () {
      this.ibfActive=!this.ibfActive;
    },

    activateBicarbonate () {
      this.bicarbonateActive=!this.bicarbonateActive;
    },

    activateBilirubin () {
      this.bilirubinActive=!this.bilirubinActive;
    },

     activateCreatinine () {
      this.creatinineActive=!this.creatinineActive;
    },

     activateChloride () {
      this.chlorideActive=!this.chlorideActive;
    },

      activateHematocrit () {
      this.hematocritActive=!this.hematocritActive;
    },

      activateHemoglobin () {
      this.hemoglobinActive=!this.hemoglobinActive;
    },

      activateLactate () {
      this.lactateActive=!this.lactateActive;
    },


      activatePlatelet () {
      this.plateletActive=!this.plateletActive;
    },

      activatePotassium () {
      this.potassiumActive=!this.potassiumActive;
    },

     activatePtt () {
      this.pttActive=!this.pttActive;
    },

    activateInr () {
      this.inrActive=!this.inrActive;
    },

    activatePt () {
      this.ptActive=!this.ptActive;
    },

    activateSodium () {
      this.sodiumActive=!this.sodiumActive;
    },


    activateBun() {
      this.bunActive=!this.bunActive;
    },

     activateWbc(){
      this.wbcActive=!this.wbcActive; 
    }, 

    activateLabValues(){
      this.labValuesActive=!this.labValuesActive; 
    }, 

   
    
      logout() {
      this.$router.push("/");
      this.$store.dispatch("logout");
    },

  


    appendAC() {
      this.form.accident_causes.push(this.valueAC);
      this.valueAC = "";
    },
   
    appendDiagnoses() {
      this.form.diagnoses.push(this.valueDiag);
      this.valueDiag = "";
    },

    appendHistory() {
      this.form.patient_history.push(this.valueHist);
      this.valueHist = "";
    },

     appendSymptoms() {
      this.form.symptoms.push(this.valueSymp);
      this.valueSymp = "";
    },

    getDiagnoses() {
      return this.availableDiagnoses;
    },

    getSymptoms() {
      return this.availableSymptoms;
    },

    

    async submit() {

      for (var j=0; j<this.form.symptoms.length; j++){
        for (var i=0; i<this.allSymptoms.length; i++) {
            for (var x in this.allSymptoms[i]) {
                    if(this.form.symptoms[j] == this.allSymptoms[i][x]) {
                        this.form.symptoms[j] = this.allSymptoms[i].icd9_code
                        
                        
                    }
            }
        }

     }

    

      
      
      

      try {
        const patientObject = {
          patient: {
            name: this.form.name,
            
            dateOfBirth: this.form.dateOfBirth,
            gender: this.form.gender,
            weight: this.form.weight,
            height: this.form.height,
            medicalData: {
           hospstay_seq: this.form.hospstay_seq,
            total_hospstays: this.form.total_hospstays,
            length_of_stay_hospital: this.form.length_of_stay_hospital,
            icustay_seq: 1,
            number_of_icu_stays: this.form.number_of_icu_stays,
            length_of_stay_icu: this.form.length_of_stay_icu,
            total_length_of_stay_icu: this.form.total_length_of_stay_icu,
        //    days_to_death: this.form.days_to_death,
       //     died_in_hospital: this.form.died_in_hospital,
              heartrate: {
                mean: this.form.heartrate_mean,
                min: this.form.heartrate_min,
                max: this.form.heartrate_max,
              },
              meanbp: {
                mean: this.form.meanbp_mean,
                min: this.form.meanbp_min,
                max: this.form.meanbp_max,
              },
              resprate: {
                min: this.form.resprate_min,
                max: this.form.resprate_max,
                mean: this.form.resprate_mean,
              },
              tempc: {
                min: this.form.tempc_min,
                max: this.form.tempc_max,
                mean: this.form.tempc_mean,
              }, 
              spo2: {
                min: this.form.spo2_min,
                max: this.form.spo2_max,
                mean: this.form.spo2_mean,
              },
              glucose: {
                min: this.form.glucose_min,
                max: this.form.glucose_max,
                mean: this.form.glucose_mean,
              },
              received_dialysis: this.form.received_dialysis,
              received_ventilation: this.form.received_ventilation,
              urineoutput: this.form.urineoutput,
              
                gcsmotor: this.form.gcsMotor,
                gcsverbal: this.form.gcsVerbal,
                gcseyes: this.form.gcsEyes,
                mingcs: this.form.gcsMotor + this.form.gcsVerbal + this.form.gcsEyes,
              
              aniongap: {
                min: this.form.anionGap_min,
                max: this.form.anionGap_max,
              },
              albumin: {
                min: this.form.albumin_min,
                max: this.form.albumin_max,
              },
              bands: {
                min: this.form.ibf_min,
                max: this.form.ibf_max,
              },
              bicarbonate: {
                min: this.form.bicarbonate_min,
                max: this.form.bicarbonate_max,
              },
              bilirubin: {
                min: this.form.bilirubin_min,
                max: this.form.bilirubin_max,
              },
              creatinine: {
                min: this.form.creatinine_min,
                max: this.form.creatinine_max,
              },
              chloride: {
                min: this.form.chloride_min,
                max: this.form.chloride_max,
              },
              hematocrit: {
                min: this.form.hematocrit_min,
                max: this.form.hematocrit_max,
              },
               hemoglobin: {
                min: this.form.hemoglobin_min,
                max: this.form.hemoglobin_max,
              },
               lactate: {
                min: this.form.lactate_min,
                max: this.form.lactate_max,
              },
              platelet: {
                min: this.form.platelet_min,
                max: this.form.platelet_max,
              },
              potassium: {
                min: this.form.potassium_min,
                max: this.form.potassium_max,
              },
              ptt: {
                min: this.form.ptt_min,
                max: this.form.ptt_max,
              },
              inr: {
                min: this.form.inr_min,
                max: this.form.inr_max,
              },
              pt: {
                min: this.form.pt_min,
                max: this.form.pt_max,
              },
              sodium: {
                min: this.form.sodium_min,
                max: this.form.sodium_max,
              },
              bun: {
                min: this.form.bun_min,
                max: this.form.bun_max,
              },
              wbc: {
                min: this.form.wbc_min,
                max: this.form.wbc_max,
              },
            
              symptoms: this.form.symptoms,
              patient_history: this.form.patient_history,
              accident_causes: this.form.accident_causes,
              diagnoses: this.form.diagnoses,
            },
          },
        };
        console.log(patientObject)
        const response = await PatientService.createPatient(patientObject);
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
      this.$router.push("/homepage");
    },
  },
};
</script>

<style scoped>
#formular {
  margin-left: 50px;
  margin-right: 100px;
}
</style>