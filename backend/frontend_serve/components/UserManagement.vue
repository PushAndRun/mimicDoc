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

     <b-card-group columns style="margin: 30px;">  
       <b-card   v-for="user in userSelection" v-bind:key="user.name" :title="user.name" :sub-title="user._id"
          class="userCard">
        <b-card-text>
          Email: {{ user.email }}   <br>
          Number of Patients: {{ user.patients.length  }}
        </b-card-text>

        <b-button variant = "outline-danger" @click=deleteUser(user._id)>Delete User</b-button>
        

            </b-card>
          
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
            this.users.push(response[i]);
          }
          
          console.log(this.users);
        
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