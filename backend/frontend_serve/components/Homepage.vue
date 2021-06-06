<template>
 <div  id = "homepage" >
 


    <b-navbar toggleable="false" type="dark" variant="dark">
    <b-navbar-brand style="color:white">RoboDoc</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template >
        <b-icon style="color:white" icon="chevron-bar-up">Menu</b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto" >
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/form" >Submit new Patient</router-link></b-nav-item>
          <b-nav-item><router-link style="text-decoration: none; color:white " to="/patients">View all your Patients </router-link></b-nav-item>
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
        Here you can create new patients and get an overview of all your patients.<br>
        Use RoboDoc to optimally plan further procedures and make decisions in an easy way.  
        
        <br>  
        <br>
        <br>
        <br>  
        <br>
        <br>
        
        Übersicht<br>
        Anzahl Patienten: {{ numberOfPatients }} <br>
        Anzahl Requests: {{ numberOfRequests }}<br>
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

          <p> 2021 - RoboDoc </p>    


      </v-footer>

        
  </div>  
</template>



<script>
import PatientService from '../services/PatientService'


export default {
    name: 'Homepage',

    data() {
      return {

        numberOfPatients:"",
        numberOfRequests:"",
        username: "",
        allPatients: []
      }

},

  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
    this.username = this.$store.getters.getUser.username;
    this.numberOfPatients = await PatientService.fetchPatients(); 
    this.numberOfPatients = this.numberOfPatients.length; 
    this.allPatients = await PatientService.fetchPatients(); 
    this.numberOfRequests = 0; 
    for(let i = 0; i < this.allPatients.length; i ++ ){
      this.numberOfRequests += this.allPatients[i].requests.length; 
    }

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



#homepage {
  background-image: url(../assets/blurred-interior-hospital-clinical-with-people-abstract-medical-background_1484-1309.jpeg);
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
