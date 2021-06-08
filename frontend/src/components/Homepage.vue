<template>
 <div  id = "homepage" >
 


    <b-navbar toggleable="false" type="dark" variant="transparent">
    <b-navbar-brand style="color:dimgrey">RoboDoc</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template >
        <b-icon style="color:dimgrey" icon="chevron-bar-up">Menu</b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto" >
          <b-nav-item> <router-link style="text-decoration: none; color:dimgrey" to="/form" >Submit new Patient</router-link></b-nav-item>
          <b-nav-item><router-link style="text-decoration: none; color:dimgrey " to="/patients">View all your Patients </router-link></b-nav-item>
          <b-nav-item  @click="logout"><p style="color:dimgrey">Sign Out</p></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
   

        <br>
        <br>
        <br>
        <h1> Hi {{username}} </h1>
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
        Anzahl Patienten: <br>
        Zuletzt geänderter Patient: <br>
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



export default {
    name: 'Homepage',

    data() {
      return {

         
        username: "",
      }

},

  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
    this.username = this.$store.getters.getUser.username;
        
    
    
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


h1 {
   color: black;
   font-size: 65px;
      margin-top: 5%;
      font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
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
