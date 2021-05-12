<template>
    <div>

        <b-navbar toggleable="false" type="dark" variant="info">

      <b-navbar-brand href = "#"><b><router-link to="/homepage" style="text-decoration: none; color:inherit ">RoboDoc</router-link></b></b-navbar-brand>
    <!-- logout button -->
      <b-button variant="secondary" @click="logout">Logout</b-button>
    </b-navbar>
        <br>
        <h1>All Patients of {{username}}</h1>
        <b-button @click=fetchAllPatients> Display all Patients </b-button>

         <ul>
         <li v-for="patient in patients" v-bind:key="patient.name">
           <p> Name: {{ patient.name }} </p><br>
           <p> Age: {{ patient.age }} </p><br>
            <p> Gender: {{ patient.gender }} </p><br>
            <p> Weight: {{ patient.weight }} </p><br>
            <p>Height: {{ patient.height }} </p><br>
            <p> Bloodtypes: {{ patient.bloodtypes }} </p><br>
            <p> Mean blood pressure: {{ patient.meanpb_mean }} </p><br>
            <p> Min blood pressure: {{ patient.meanbp_min }} </p><br>
            <p> Max blood pressure: {{ patient.meanpb_max }} </p><br>
            <p> Mean resprate: {{ patient.resprate_mean }} </p><br>
            <p> Min reesprate: {{ patient.resprate_min }} </p><br>
            <p> Max resprate:{{ patient.resprate_max }} </p><br>
            <p> Mean temperature in C°: {{ patient.tempc_mean }} </p><br>
            <p> Mean glucose: {{ patient.glucose_mean }} </p><br>
            <p> Min glucose: {{ patient.glucose_min }} </p><br>
            <p> Max glucose: {{ patient.glucose_max }} </p><br>
            <p> Patient History: {{ patient.patient_history }} </p><br>
            <p> Diagnoses: {{ patient.diagnoses }} </p><br>
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
        patients:[{name: "Max", age: "18",  gender:"male", weigth:"80", height:"180", bloodtype: "B-",
        meanbp_mean: "100", meanbp_min: "80", meanbp_max: "120", resprate_min:'123',
          resprate_max:'123', 
          resprate_mean:'123', 
          tempc_mean:'123',
          glucose_min:'13',
          glucose_max: '123',
          glucose_mean: '123',
          patient_history:['covid'],
          diagnoses:['covid']}]

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