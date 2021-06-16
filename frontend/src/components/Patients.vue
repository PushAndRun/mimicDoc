<template>
    <div>

          <b-navbar toggleable="false" type="dark" variant="dark">
    <b-navbar-brand style="color:white">RoboDoc</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template >
        <b-icon style="color:white">Menu</b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto" >
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/homepage" >Homepage</router-link></b-nav-item>
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/form" >Submit new Patient</router-link></b-nav-item>
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
       <b-card-group columns style="margin: 30px;">  
       <b-card   v-for="patient in patientSelection" v-bind:key="patient.name" :title="patient.name" :sub-title="patient._id"
            class="patientCard">
            <b-card-text> 
            <!-- Last Request: {{ requests[patient.requests.length-1].created }} <br> -->
           <br>
           <b>Requests </b><br>
            Last Request: {{patient.requests[patient.requests.length-1].created.substring(0,10)}} <br>
            Number of Request: {{patient.requests.length }} <br><br>
            Date of Birth: {{ patient.medicalData.dateOfBirth.substring(0,10) }} <br> 
            Gender: {{ patient.medicalData.gender }} <br>
            Weight: {{ patient.medicalData.weight }} kg<br>
            Height: {{ patient.medicalData.height }} cm<br>
             <br>
            
            <!-- Bloodtype: {{ patient.medicalData.bloodtype }} <br> -->
            <br>
            <b>Blood Pressure </b><br>
           Mean: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_mean }} mmHg<br>
           Min: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_min }} mmHg<br>
            Max: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_max }} mmHg<br>
            <br>
            <b>Glucose Levels </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].glucose.glucose_mean }} mg/dL<br>
            Min: {{ patient.requests[patient.requests.length-1].glucose.glucose_min }} mg/dL<br>
            Max: {{ patient.requests[patient.requests.length-1].glucose.glucose_max }} mg/dL<br>
           <br>
          <b> Respiratory Rate </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].respiratory.resprate_mean }} breaths per minute<br>
            Min: {{ patient.requests[patient.requests.length-1].respiratory.resprate_min }} breaths per minute<br>
            Max: {{ patient.requests[patient.requests.length-1].respiratory.resprate_max }} breaths per minute<br>
            <br>
            Mean Temperature: {{ patient.requests[patient.requests.length-1].tempc_mean }} C°<br>
            <br>
            Patient History: {{ patient.requests[patient.requests.length-1].patient_history.join(', ') }} <br>
            Diagnoses: {{ patient.requests[patient.requests.length-1].diagnoses.join(', ') }}  <br> 
            <br>
            Chances of Survival: {{ patient.survival }} %<br> 
            

           </b-card-text>

            </b-card>
          
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
        message:'',
        username:'', 
        patients:[], 
        patientSelected:'',
        
        /*{
            patient:{
              name:"",
              age:"",
              gender:"",
              weight:"",
              height:"",
                medicalData:{
                  bloodtypes:"",
                  bloodpressure:{
                    mean:"", 
                    min:"", 
                    max:""
                  }, 
                  resprate:{ 
                  min:"",
                  max:"", 
                  mean:""
                  }, 
                  temperature:{
                  mean:"",
                  }, 
                  glucose:{
                  min:"",
                  max:"",
                  mean:""
                  },
                  patient_history:[],
                  diagnoses:[],
                  death_prediction:"", 
                  stay_prediction:""
                } 

        }  
        } */
      }
    },
    
    async created(){
          if(!this.$store.getters.isLoggedIn){
            this.$router.push('/registration')
          }
        this.username = this.$store.getters.getUser.username;
        this.fetchAllPatients();

        //this.secretMessage = await AuthService.getSecretContent();
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

      requestIsEmpty (patient){
        return patient.requests.lenght>0
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
