<template>
    <div class = "homepage" >

         <b-navbar toggleable="false" type="dark" variant="info">

      <b-navbar-brand href = "#"><b>RoboDoc</b></b-navbar-brand>
    <!-- logout button -->
      <b-button variant="secondary" @click="logout">Logout</b-button>
    </b-navbar>

        <br>
        <h1> Hi {{username}} </h1>
        <br>       
  <b-dropdown id="dropdown-1" text="What do you want to do?" class="m-md-2">
    <b-dropdown-item ><router-link style="text-decoration: none; color:inherit " to="/form" > Submit new Patient</router-link></b-dropdown-item>
    <b-dropdown-item><router-link style="text-decoration: none; color:inherit " to="/patients">View all your Patients</router-link></b-dropdown-item>

    
    
  </b-dropdown>

    <br>
    <br>


 
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

.homepage {
  background-image: url("https://picsum.photos/id/467/1024/1024");
  
}

</style>
