<template>
    <div>

        <b-navbar toggleable="false" type="dark" variant="dark">
    <b-navbar-brand style="color:white">RoboDoc</b-navbar-brand>

     <b-navbar-toggle target="navbar-toggle-collapse" style="color:white;">
        Menu
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto" >
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/homepage" >Homepage</router-link></b-nav-item>
          <b-nav-item><router-link style="text-decoration: none; color:white " to="/form">Submit new Patient</router-link></b-nav-item>
           <b-nav-item><router-link style="text-decoration: none; color:white " to="/Diagnoses">Get a Diagnosis Suggestion</router-link></b-nav-item>
          
          <b-nav-item  @click="logout"><p style="color:white">Sign Out</p></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
        <br>
        <br>
        <h2>Patients for User: {{username}}</h2>
        <br>
        <b-form-group>
          <b-row>
            <b-col></b-col>
            <b-col>
        <b-form-input id="searchPatient" type="text" v-model=patientSelected placeholder="Search for Patients by Name or ID ..."></b-form-input>
          </b-col>
          <b-col>
          </b-col>
          </b-row>
        </b-form-group>
      <br>

      
       <b-card-group > 
       <b-col xl = 4 lg = 4 md = 6 sm = 12  v-for="patient in patientSelection" v-bind:key="patient.name">
       <b-card :title="patient.name" :sub-title="patient._id"
            class="patientCard" style="margin: 15px;">
            <b-card-text> 
           <br>
           <div v-if="RequestNotEmpty(patient)">
           <b>Requests </b><br>
           
            Last Request: {{patient.requests[patient.requests.length-1].created.substring(0,10)}} <br>
            Number of Request: {{patient.requests.length }} <br><br>
          </div
          ><b> General information </b> <br>
            Date of Birth: {{ patient.medicalData.dateOfBirth.substring(0,10) }} <br> 
            Gender: {{ patient.medicalData.gender }} <br>
            Weight: {{ patient.medicalData.weight }} kg<br>
            Height: {{ patient.medicalData.height }} cm<br>
            <br>
            <div v-if="RequestNotEmpty(patient)">
            <b> Hospitalization information </b> <br>
            Sequence of hospital stays: {{ patient.requests[patient.requests.length-1].hospstay_seq }}<br>
            
            Total Number of Hospital stays: {{ patient.requests[patient.requests.length-1].total_hospstays }}<br>
            Length of Stay for this specific Admission: {{ patient.requests[patient.requests.length-1].length_of_stay_hospital }}<br>
            Length of the first ICU Stay:{{ patient.requests[patient.requests.length-1].length_of_stay_icu }}<br>
            Length of all ICU Stays during this Hospital Admission: {{ patient.requests[patient.requests.length-1].total_length_of_stay_icu }}<br>
          
            <br>
       
            <b-button @click="showBloodValues(patient.name)">{{ minOrMaxBloodValues(patient.name) }}</b-button>
            <br>
            <div v-if="BloodValuesEnabledMethod(patient.name)">
            <br>
            
           
            
            <b>Blood Pressure </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].meanbp.mean }} mmHg<br>
            Min: {{ patient.requests[patient.requests.length-1].meanbp.min }} mmHg<br>
            Max: {{ patient.requests[patient.requests.length-1].meanbp.max }} mmHg<br>
       
            <b-button @click=createBpChart(patient.requests,patient.name) style="margin:10px" size="sm" variant="primary">Show chart</b-button>
            
            <b-button @click=hideBpChart size="sm" variant="primary">Hide Chart </b-button>
            <div v-if=samePatient(patient.name)>
            <div v-if=bpChartEnabled>
             
            <GChart type="ColumnChart"
            :data="BpChartData"
            :options="BpChartOptions"
            :settings="{ packages: ['corechart','table'] }"
            />
              </div>
            </div>
            <br>
            
            <b>Glucose Levels </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].glucose.glucose_mean }} mg/dL<br>
            Min: {{ patient.requests[patient.requests.length-1].glucose.glucose_min }} mg/dL<br>
            Max: {{ patient.requests[patient.requests.length-1].glucose.glucose_max }} mg/dL<br>
            <b-button @click=createGlChart(patient.requests,patient.name) style="margin:10px" size="sm" variant="primary">Show chart</b-button>
            
            <b-button @click=hideGlChart size="sm" variant="primary">Hide Chart </b-button>
            <div v-if=samePatient(patient.name)>
            <div v-if=glChartEnabled>
             
            <GChart type="ColumnChart"
            :data="GlChartData"
            :options="GlChartOptions"
            :settings="{ packages: ['corechart','table'] }"
            
            />
            </div>
            </div>
           <br>
          <b> Respiratory Rate </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].resprate.mean }} breaths per minute<br>
            Min: {{ patient.requests[patient.requests.length-1].resprate.min }} breaths per minute<br>
            Max: {{ patient.requests[patient.requests.length-1].resprate.max }} breaths per minute<br>

            <b-button @click=createReChart(patient.requests,patient.name) style="margin:10px" size="sm" variant="primary">Show chart</b-button>
            
            <b-button @click=hideReChart size="sm" variant="primary">Hide Chart </b-button>
            <div v-if=samePatient(patient.name)>
            <div v-if=reChartEnabled>
             
            <GChart type="ColumnChart"
            :data="ReChartData"
            :options="ReChartOptions"
            :settings="{ packages: ['corechart','table'] }"
            />
            </div>
            </div>
            <br>
            <b>Heartrate </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].heartrate.mean }} bpm<br>
            Min: {{ patient.requests[patient.requests.length-1].heartrate.min }} bpm<br>
            Max: {{ patient.requests[patient.requests.length-1].heartrate.max }} bpm<br>
            
            <br>
            <b>Body temperature</b><br>
            Mean: {{ patient.requests[patient.requests.length-1].tempc.mean }} C°<br>
            Min: {{ patient.requests[patient.requests.length-1].tempc.min }} C°<br>
            Max: {{ patient.requests[patient.requests.length-1].tempc.max }} C°<br>
            <br>
          
            <b>Blood Oxygen Values</b><br>Mean: {{ patient.requests[patient.requests.length-1].spo2.mean }} mmHg<br> 
            Min: {{ patient.requests[patient.requests.length-1].spo2.min }} mmHg<br>
            Max: {{ patient.requests[patient.requests.length-1].spo2.max }} mmHg<br>
            <br>
            Received Dialsysis: {{patient.requests[patient.requests.length-1].received_dialysis==1?"yes":"no"}}<br>
            Received Ventilation: {{patient.requests[patient.requests.length-1].received_ventilation==1?"yes":"no"}}<br>
            Urineoutput: {{patient.requests[patient.requests.length-1].urineoutput}} ml<br>
            <br>
            <b>Glasgow Coma Scale:</b><br>
            Motor: {{patient.requests[patient.requests.length-1].gcsmotor}}<br>
            Verbal: {{patient.requests[patient.requests.length-1].gcsverbal}} <br>
            Eyes: {{patient.requests[patient.requests.length-1].gcseyes}} <br>
            Total: {{patient.requests[patient.requests.length-1].mingcs}} <br>
            <br>
            
            <b>Anion Gap</b><br>
            Min: {{ patient.requests[patient.requests.length-1].aniongap.min }} mEq/L<br>
            Max: {{ patient.requests[patient.requests.length-1].aniongap.max }} mEq/L<br>
            <br>
           
            <b>Albumin</b><br>
            Min: {{ patient.requests[patient.requests.length-1].albumin.min }} g/dL<br>
            Max: {{ patient.requests[patient.requests.length-1].albumin.max }} g/dL<br>
            <br>
            
            <b>Immature Band Forms</b><br>
            Min: {{ patient.requests[patient.requests.length-1].bands.min }} %<br>
            Max: {{ patient.requests[patient.requests.length-1].bands.max }} %<br>
           <br>
           
            <b>Bicarbonate</b><br>
            Min: {{ patient.requests[patient.requests.length-1].bicarbonate.min }} mEq/L<br>
            Max: {{ patient.requests[patient.requests.length-1].bicarbonate.max }} mEq/L<br>
           <br>
            <b>Bilirubin</b><br>
            Min: {{ patient.requests[patient.requests.length-1].bilirubin.min }} mg/dL<br>
            Max: {{ patient.requests[patient.requests.length-1].bilirubin.max }} mg/dL<br>
            <br>
            <b>Creatinine</b><br>
            Min: {{ patient.requests[patient.requests.length-1].creatinine.min }} mg/dL<br>
            Max: {{ patient.requests[patient.requests.length-1].creatinine.max }} mg/dL<br>
            <br>
            <b>Chloride</b><br>
            Min: {{ patient.requests[patient.requests.length-1].chloride.min }} mEq/L<br>
            Max: {{ patient.requests[patient.requests.length-1].chloride.max }} mEq/L<br>
           <br>
            <b>Hematocrit</b><br>
            Min: {{ patient.requests[patient.requests.length-1].hematocrit.min }} %<br>
            Max: {{ patient.requests[patient.requests.length-1].hematocrit.max }} %<br>
           <br>
            <b>Hemoglobin</b><br>
            Min: {{ patient.requests[patient.requests.length-1].hemoglobin.min }} g/dL<br>
            Max: {{ patient.requests[patient.requests.length-1].hemoglobin.max }} g/dL<br>
           <br>
            <b>Lactate</b><br>
            Min: {{ patient.requests[patient.requests.length-1].lactate.min }} mmol/L<br>
            Max: {{ patient.requests[patient.requests.length-1].lactate.max }} mmol/L<br>
           <br>
            <b>Platelet</b><br>
            Min: {{ patient.requests[patient.requests.length-1].platelet.min }} K/uL<br>
            Max: {{ patient.requests[patient.requests.length-1].platelet.max }} K/uL<br>
           <br>
            <b>Potassium</b><br>
            Min: {{ patient.requests[patient.requests.length-1].potassium.min }} mEq/L<br>
            Max: {{ patient.requests[patient.requests.length-1].potassium.max }} mEq/L<br>
           <br>
            <b>Partial Thromboplastin Time</b><br>
            Min: {{ patient.requests[patient.requests.length-1].ptt.min }} seconds<br>
            Max: {{ patient.requests[patient.requests.length-1].ptt.max }} seconds<br>
            <br>
            <b> International Normalized Ratio</b><br>
            Min: {{ patient.requests[patient.requests.length-1].inr.min }} level<br>
            Max: {{ patient.requests[patient.requests.length-1].inr.max }} level<br>
            <br>
            <b>Prothrombin Time</b><br>
            Min: {{ patient.requests[patient.requests.length-1].pt.min }} seconds<br>
            Max: {{ patient.requests[patient.requests.length-1].pt.max }} seconds<br>
            <br>
            <b>Sodium</b><br>
            Min: {{ patient.requests[patient.requests.length-1].sodium.min }} mEq/L<br>
            Max: {{ patient.requests[patient.requests.length-1].sodium.max }} mEq/L<br>
            <br>
            <b>Urea Nitrogen Levels</b><br>
            Min: {{ patient.requests[patient.requests.length-1].bun.min }} mg/dL<br>
            Max: {{ patient.requests[patient.requests.length-1].bun.max }} mg/dL<br>
            <br>
            <b>WBCs per microliter</b><br>
            Min: {{ patient.requests[patient.requests.length-1].wbc.min }}<br>
            Max: {{ patient.requests[patient.requests.length-1].wbc.max }}<br>
            <br>
            </div>
            <br>
            Medical History: {{ patient.requests[patient.requests.length-1].patient_history.join(', ') }} <br>
           Symptoms: {{ patient.requests[patient.requests.length-1].symptoms.join(', ') }} <br>
           Accident Causes: {{ patient.requests[patient.requests.length-1].accident_causes.join(', ') }}  <br>
            Diagnoses: {{ patient.requests[patient.requests.length-1].diagnoses.join(', ') }}  <br> 
          
            <br>
          <b>Probability of death:</b> {{ (Math.round(patient.requests[patient.requests.length-1].survival * 100)) / 100 }} 
          <b-icon icon="exclamation-circle" style="width: 15px; height: 15px;"  variant="info" v-b-tooltip.hover title="A value above 0.5 means that the patient is a high-risk patient.">
            </b-icon>
            <br> 
            
    
            <b>Estimated Length of Stay:</b> {{  (Math.round(patient.requests[patient.requests.length-1].stay * 100)) / 100 }} days
            <b-icon icon="exclamation-circle" style="width: 15px; height: 15px;"  variant="info" v-b-tooltip.hover title="The length of stay has a standard deviation of 4,5 days">
            </b-icon>
            <br>
            </div>
            
           
            

           </b-card-text>

            </b-card>
       </b-col>
</b-card-group>


     

 <v-footer>

          <p style="color:dimgrey"> 2021 - RoboDoc </p>    


      </v-footer>
          
    </div>
</template>

<script>
import PatientService from '@/services/PatientService.js'
export default {
    name: 'Patients',
    data(){
      return {
        BloodValuesEnabled:false,
        bpChartEnabled:false, 
        glChartEnabled:false,
        reChartEnabled:false,
        currentPatient:'',
        currentName:'',

        BpChartData:[           
          ['Request','Min','Mean','Max'],               
          ], 
        GlChartData:[           
          ['Request','Glucose_min','Glucose_mean','Glucose_max'],               
          ], 
        ReChartData:[           
          ['Request','Resprate_min','Resprate_mean','Resprate_max'],               
          ],       
          BpChartOptions:{                
              title:'Bloodpressure Values for several Requests',  
              chartArea:{width:"50%",height:"70%"}           
          },
          GlChartOptions:{                
              title:'Glucose Values for several Requests',  
              chartArea:{width:"50%",height:"70%"}           
          },
          ReChartOptions:{                
              title:'Resprate Values for several Requests',  
              chartArea:{width:"50%",height:"70%"}          
          },
        message:'',
        username:'', 
        patients:[], 
        patientSelected:'',
        
      
        
      }
    },
    
    async created(){

       
        document.title = "RoboDoc"
    
          if(!this.$store.getters.isLoggedIn){
            this.$router.push('/registration')
          }
        this.username = this.$store.getters.getUser.username;
        this.fetchAllPatients();
        console.log(this.patients)

       
    },

    computed:{
      patientSelection:function(){
        if (this.patientSelected!='') return this.patients.filter(p => p.name.includes(this.patientSelected)||p._id.includes(this.patientSelected)); 
        else return this.patients; 
      },

     
   

      
      
    },


    methods: {
     logout(){
        this.$store.dispatch('logout'); 
        this.$router.push('/');
      }, 
       minOrMaxBloodValues(name){
        if(this.BloodValuesEnabled&&name==this.currentName)return "Hide Patient's Medical Data" ; 
        else return "Show Patient's Medical Data";
      },
      showBloodValues(name){
        this.BloodValuesEnabled=!this.BloodValuesEnabled;
        this.currentName = name; 
      },
      BloodValuesEnabledMethod(name){
        if(name==this.currentName&&this.BloodValuesEnabled)return true; 
        else return false; 
      }, 


      RequestNotEmpty(patient){
          return patient.requests.length>0;
      },

      createBpChart(requests,name){
        this.BpChartData = [           
          ['Request','Min Bloodpressure','Mean Bloodpressure','Max Bloodpressure']                 
          ]
        for(var i = 0; i < requests.length; i ++){
            let min = requests[i].meanbp.min != null ? requests[i].meanbp.min : 0 
            let mean = requests[i].meanbp.mean != null ? requests[i].meanbp.mean : 0
            let max = requests[i].meanbp.max != null ? requests[i].meanbp.max : 0
          this.BpChartData.push([i + 1 + ". Request", min, mean, max]);          
        }
        this.currentPatient = name; 
        this.bpChartEnabled = true; 
        this.glChartEnabled = false; 
        this.reChartEnabled = false; 
      },

      createGlChart(requests,name){
        this.GlChartData = [           
          ['Request','Min Glucose','Mean Glucose','Max Glucose']                 
          ]
          for(var i = 0; i < requests.length; i ++){
            let min = requests[i].glucose.glucose_min != null ? requests[i].glucose.glucose_min : 0 
            let mean = requests[i].glucose.glucose_mean != null ? requests[i].glucose.glucose_mean : 0
            let max = requests[i].glucose.glucose_max != null ?requests[i].glucose.glucose_max : 0
          this.GlChartData.push([i + 1 + ". Request", min, mean, max]);
          
        }
       
        this.currentPatient = name; 
        this.glChartEnabled = true; 
        this.bpChartEnabled = false; 
        this.reChartEnabled = false; 
      },
      createReChart(requests,name){
        this.ReChartData = [           
          ['Request','Min Resprate','Mean Resprate','Max Resprate']                 
          ]
          for(var i = 0; i < requests.length; i ++){
              let min = requests[i].resprate.min ? requests[i].resprate.min : 0 
            let mean = requests[i].resprate.mean != null ? requests[i].resprate.mean : 0
            let max = requests[i].resprate.max != null ?requests[i].resprate.max : 0
          this.ReChartData.push([i + 1 + ". Request", min, mean, max]);
          
        }
        this.currentPatient = name; 
        this.reChartEnabled = true; 
        this.glChartEnabled = false; 
        this.bpChartEnabled = false; 
      },
          

        
      

      samePatient(name){
        return name == this.currentPatient;
      },

      hideBpChart(){
        this.bpChartEnabled = false; 
      },
      hideGlChart(){
        this.glChartEnabled = false; 
      },
      hideReChart(){
        this.reChartEnabled = false; 
      },

    

      requestIsEmpty (patient){
        return patient.requests.length>0
      },
      async fetchAllPatients(){

     //   try{

       this.patients = [];
        var response = await PatientService.fetchPatients();
        for (var i = 0; i < response.length ; i ++){
          this.patients.push(response[i]);
          
        }
        
        console.log(response);


   //     this.message = response.messsage; 

     //   }catch(error){
       //   this.message = error.response.data.message; 
       // }

      },
    },    
}

</script>
<style scoped>



</style>