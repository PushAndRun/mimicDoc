<template>
 <div  class = "homepage" >


    <b-navbar toggleable="false" type="dark" variant="dark">
    <b-navbar-brand style="color:white">RoboDoc</b-navbar-brand>

     <b-navbar-toggle target="navbar-toggle-collapse" style="color:white;">
        Menu
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto" >
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/userManagement" >User Management</router-link></b-nav-item>
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/allPatients" >Show all Patients</router-link></b-nav-item>
          <b-nav-item  @click="logout"><p style="color:white">Sign Out</p></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>


    <br>
        <br>
        <br>
        <h2> Hi {{username}} </h2>
        <br>  
        <br>
        <br>
        <br> 
        <p id="text" >
        Here you can manage the users and get an overview of all patients
        <br>  
        <br>
        <br>
        <br>  
        <br>
        <br>
        
        Übersicht<br>
        Anzahl User: {{ numberOfUsers }}<br>
        Anzahl Patienten: {{numberOfPatients}} <br>
        </p>
        <br>  
        <br>
        <br>
        <br>  
        <br>
        <br>
        <br> 
        <br> 
        

   <v-footer>

          <p style="color:dimgrey"> 2021 - RoboDoc </p>    


      </v-footer>
      
</div>
</template>

<script>

import UserService from '../services/UserService'
import PatientService from '../services/PatientService'

export default {
    data(){
        return {
          numberOfUsers:"",
         username: "",
         numberOfPatients: "",
      }
    }, 

     async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
    this.username = this.$store.getters.getUser.username;
    this.numberOfUsers = await UserService.fetchAllUsers(); 
    this.numberOfUsers = this.numberOfUsers.length; 
    this.numberOfPatients = await PatientService.allPatients(); 
    this.numberOfPatients = this.numberOfPatients.length; 
        
    
    
  },

   methods: {
      
      logout(){
        this.$store.dispatch('logout'); 
        this.$router.push('/');
      } 
      },


}
</script>

<style scoped>

h2 {
   color: black;
   font-size: 65px;
      margin-top: 0%;
      font-family: "Century Gothic", CenturyGothic, Geneva, AppleGothic, sans-serif;
}




.homepage {
  background-image: url(../assets/Fotolia_133334155_M-e1488185705261.jpeg);
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#text{
  text-align: left;
   margin-left:20px;

  
  
   font-size: 20px;
}




</style>
