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
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/AllPatients" >Show all Patients</router-link></b-nav-item>
          <b-nav-item  @click="logout"><p style="color:white">Sign Out</p></b-nav-item>
      </b-navbar-nav>
    </b-collapse>

 
  </b-navbar>

  <br>
  <br>

  <b-form-group>
          <b-row>
            <b-col></b-col>
            <b-col>
        <b-form-input id="searchUser" type="text" v-model=userSelected placeholder="Search for User by Name or ID ..."></b-form-input>
          </b-col>
          <b-col>
          </b-col>
          </b-row>
        </b-form-group>

     <b-card-group>  
       <b-col xl = 4 lg = 4 md = 6 sm = 12  v-for="user in userSelection" v-bind:key="user.name">
       <b-card :title="user.name" :sub-title="user._id"
          class="userCard" style="margin: 15px;">
 

        <b-card-text>
          Email: {{ user.email }}   <br>
           
          Number of Patients: {{ user.patients.length  }}<br>
          <br>
          {{ userIsAdmin(user) }}
        </b-card-text>

        <b-button variant = "outline-danger" @click=deleteUser(user._id)>Delete User</b-button>
        

            </b-card>
       </b-col>
</b-card-group>
   <v-footer>

          <p style="color:dimgrey"> 2021 - RoboDoc </p>    


      </v-footer>
</div> 
</template>

<script>
import UserService from '../services/UserService'
export default {
    data(){
        return {
            users:[],
            userSelected:"" 

        }
    }, 
    computed:{
        userSelection:function(){
        if (this.userSelected!='') return this.users.filter(p => p.name.includes(this.userSelected)||p._id.includes(this.userSelected)); 
        else return this.users; 
      },
    },  
    async created (){
       
        document.title = "RoboDoc"
    
      this.fetchAllUsers(); 
    }, 
      methods:{

        logout(){
          this.$store.dispatch('logout'); 
          this.$router.push('/');
        }, 
        async fetchAllUsers (){
          this.users = [];
          
          var response = await UserService.fetchAllUsers();
          for (var i = 0; i < response.length ; i ++){
            if(!response[i].isAdmin){
            this.users.push(response[i]);
            }
          }
          
          console.log(this.users);
        
        }, 
        userIsAdmin(user){
          if(user.isAdmin){
            return "This user has Administrator Authority"
          }
          else{
            return "This user has no Administrator Authority"
          }
        },
        async deleteUser(id){

          try {
          UserService.deleteUser(id);
          this.fetchAllUsers(); 
          
          }catch (error){
            console.log(error);
          }
        }
    }
}
</script>


<style scoped>

</style>