<template>
<div>
              <b-navbar toggleable="false" type="dark" variant="dark">
    <b-navbar-brand style="color:white">RoboDoc</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse" style="color:white;">
        Menu
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto" >
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/adminHome" >Homepage</router-link></b-nav-item>
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/userManagement" >User Management</router-link></b-nav-item>
          <b-nav-item  @click="logout"><p style="color:white">Sign Out</p></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

<br>
        <br>
        <h2>All Patients in the System</h2>
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
           <b>Probability of death:</b> {{ (Math.round(patient.requests[patient.requests.length-1].survival * 100)) / 100 }} 
          <b-icon icon="exclamation-circle" style="width: 15px; height: 15px;"  variant="info" v-b-tooltip.hover title="A value above 0.5 means that the patient is a high-risk patient.">
            </b-icon>
            <br> 
            
    
            <b>Estimated Length of Stay:</b> {{  (Math.round(patient.requests[patient.requests.length-1].stay * 100)) / 100 }} days
            <b-icon icon="exclamation-circle" style="width: 15px; height: 15px;"  variant="info" v-b-tooltip.hover title="The length of stay has a standard deviation of 4 days">
            </b-icon>
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
      
        document.title = "RoboDoc"
    
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