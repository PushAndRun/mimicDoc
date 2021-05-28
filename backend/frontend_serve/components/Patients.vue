<template>
    <div>

        <b-navbar toggleable="false" type="dark" variant="info">

      <b-navbar-brand href = "#"><b><router-link to="/homepage" style="text-decoration: none; color:inherit ">RoboDoc</router-link></b></b-navbar-brand>
    <!-- logout button -->
      <b-button variant="secondary" @click="logout">Logout</b-button>
    </b-navbar>
        <br>
        <h1>All Patients of {{username}}</h1>
        <!-- Backend sendet noch nicht Name, Gewicht, Grösse, Aufenthaltsdauer, Chances of Survival ... -->
        <b-button @click=fetchAllPatients> Display all Patients </b-button> 

         <ul>
         <li v-for="patient in patients" v-bind:key="patient.name">
            <p> ID: {{ patient._id }} <br>
            <!-- Last Request: {{ requests[patient.requests.length-1].created }} <br> -->
            Name: {{ patient.name }} <br>
            Date of Birth: {{ patient.medicalData.dateOfBirth }} <br> 
            Gender: {{ patient.medicalData.gender }} <br>
            Weight: {{ patient.medicalData.weight }} <br>
            Height: {{ patient.medicalData.height }} <br>
            Bloodtype: {{ patient.medicalData.bloodtype }} <br>
            
            
            Mean blood pressure: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_mean }} <br>
            Min blood pressure: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_min }} <br>
            Max blood pressure: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_max }} <br>
            Mean resprate: {{ patient.requests[patient.requests.length-1].respiratory.resprate_mean }} <br>
            Min resprate: {{ patient.requests[patient.requests.length-1].respiratory.resprate_min }} <br>
            Max resprate: {{ patient.requests[patient.requests.length-1].respiratory.resprate_max }} <br>
            Mean temperature in C°: {{ patient.requests[patient.requests.length-1].tempc_mean }} <br>
            Mean glucose: {{ patient.requests[patient.requests.length-1].glucose.glucose_mean }} <br>
            Min glucose: {{ patient.requests[patient.requests.length-1].glucose.glucose_min }} <br>
            Max glucose: {{ patient.requests[patient.requests.length-1].glucose.glucose_max }} <br>
            Patient History: {{ patient.requests[patient.requests.length-1].patient_history }} <br>
            Diagnoses: {{ patient.requests[patient.requests.length-1].diagnoses }}  <br> 
            Chances of Survival: {{ patient.survival }}</p><br>
           
          </li>
          </ul>
    </div>
</template>

<script>

import PatientService from '../services/PatientService.js'
export default {
    name: 'Patients',
    data(){
      return {
        message:'',
        username:'', 
        patients:[]
        
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

        //this.secretMessage = await AuthService.getSecretContent();
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