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
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/userManagement" >User Management</router-link></b-nav-item>
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
           <!-- Last Request: {{ requests[patient.requests.length-1].created }} <br> -->
           <br>
           <b>Requests </b><br>
            Last Request: {{patient.requests[patient.requests.length-1].created.substring(0,10)}} <br>
            Number of Request: {{patient.requests.length }} <br><br>
            Date of Birth: {{ patient.medicalData.dateOfBirth.substring(0,10) }} <br> 
            Gender: {{ patient.medicalData.gender }} <br>
           <br>
          <b>Chances of Survival:</b> {{ (patient.requests[patient.requests.length-1].survival) * 100 }} % <br> 
            <b>Estimated Length of Stay:</b> {{  patient.requests[patient.requests.length-1].stay}} days
            <br>
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
        message:'',
        username:'', 
        patients:[], 
        patientSelected:'',
        
      
      }
    },
    
    async created(){
          if(!this.$store.getters.isLoggedIn){
            this.$router.push('/registration')
          }
        this.username = this.$store.getters.getUser.username;
        this.adminPatients();

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

      


      async adminPatients(){

       this.patients = [];
        var response = await PatientService.allPatients();
        for (var i = 0; i < response.length ; i ++){
          this.patients.push(response[i]);
        }
        
        console.log(response);


      },
    },    
}

</script>


<style scoped>

</style>