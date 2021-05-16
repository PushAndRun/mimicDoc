<template>
    <div>

        <b-navbar toggleable="false" type="dark" variant="info">

      <b-navbar-brand href = "#"><b><router-link to="/homepage" style="text-decoration: none; color:inherit ">RoboDoc</router-link></b></b-navbar-brand>
    <!-- logout button -->
      <b-button variant="transparent" @click="logout">Logout</b-button>
    </b-navbar>
        <br>
        <h1>All Patients of {{username}}</h1>
        
         <ul>
         <li v-for="patient in patients" v-bind:key="patient.name">
           <p> Name: {{ patient.name }} <br>
            Age: {{ patient.age }} <br>
            Gender: {{ patient.gender }} <br>
            Weight: {{ patient.weight }} <br>
            Height: {{ patient.height }} <br>
            Bloodtype: {{ patient.bloodtype }} <br>
            Mean blood pressure: {{ patient.meanpb_mean }} <br>
            Min blood pressure: {{ patient.meanbp_min }} <br>
            Max blood pressure: {{ patient.meanpb_max }} <br>
            Mean resprate: {{ patient.resprate_mean }} <br>
            Min reesprate: {{ patient.resprate_min }} <br>
            Max resprate: {{ patient.resprate_max }} <br>
            Mean temperature in C°: {{ patient.tempc_mean }} <br>
            Mean glucose: {{ patient.glucose_mean }} <br>
            Min glucose: {{ patient.glucose_min }} <br>
            Max glucose: {{ patient.glucose_max }} <br>
            Patient History: {{ patient.patient_history }} <br>
            Diagnoses: {{ patient.diagnoses }} </p><br>
          </li>
          </ul>
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
        patients:[{name: "John Doe", age: "46",  gender:"male", weight:"85", height:"180", bloodtype: "0-",
        meanpb_mean: "130", meanbp_min: "120", meanpb_max: "140", resprate_min:"12",
          resprate_max:'20', 
          resprate_mean:'16', 
          tempc_mean:'36.5',
          glucose_min:'70',
          glucose_max: '130',
          glucose_mean: '100',
          patient_history:['Eye dosorders NEC', 'Rheumatic aortic insufficiency'],
          diagnoses:['Covid-19']}]

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

      async fetchAllPatients(){

     //   try{
        this.patients = await PatientService.fetchPatients(this.username);


   //     this.message = response.messsage; 

     //   }catch(error){
       //   this.message = error.response.data.message; 
       // }

      }
    }, 
}

</script>
<style scoped>

</style>