<template>
  <div class = "navigation">
    <b-navbar toggleable="false" type="dark" variant="info">

      <b-navbar-brand href = "#"><b>RoboDoc</b></b-navbar-brand>

    <div class="Modal-Register">
    <b-button v-b-modal.modal-1 size="sm" variant="outline-light">Register</b-button>
    <b-modal id="modal-1" title="Register Hospital Employee">
		
      <b-form-group id="Hospital Employee" label="Your Name" label-for="input-employee">
        <b-form-input id="input-employee" v-model="Employee.name" trim />
      </b-form-group>

      <b-form-group
        id="Email"
        label="Your Email address"
        label-for="input-email">
        <b-form-input
        id="input-email"
          type= "Email"
          v-model="Employee.Email" />
      </b-form-group>

      <b-form-group
        id="username"
        label="Enter prefered Username"
        label-for="input-username"
        >
        <b-form-input
          id="input-username"
          type="text"
          
          v-model=Employee.Username />
      </b-form-group>

      <b-form-group
        id="password"
        label="Enter your prefered password containing at least 8 characters"
        label-for="input-username"
        >
        <b-form-input
          id="input-password"
          type="password"
          v-model=Employee.Password />
      </b-form-group>
    </b-modal>
  </div>

  <div class="Modal-login">
    <b-button v-b-modal.modal-2 size="sm" variant="outline-light">Login</b-button>
    <b-modal id="modal-2" title="Login" @ok="login">


     <b-form-group
                id="user"
                label="Username"
                
                label-for="user"
                invalid-feedback="Wrong Input"
                valid-feedback="Thank you">
                 <b-form-input id= "user">
                </b-form-input>
      </b-form-group>

       <b-form-group
                id="password"
                label="Password"
                type= "password"
                label-for="password"
                invalid-feedback="Wrong password"
                valid-feedback="Thank you">
                 <b-form-input id= "password">
                </b-form-input>
      </b-form-group>


    


    </b-modal>
  </div>

   


    </b-navbar>
  </div>
  
</template>

<script>
export default {
  name: "NavBar",
  props: {},
  computed: {
    
  },
    data(){
      return {
        Employee:{
          name:"", 
          Email:"", 
          Username:"",
          Password:"",


        }, 
        user: {
          username: '',
          password: '',
         
        },
        
      }
    },
      methods: {
          login(event){
            event.preventDefault();
            this.$emit("login-User", this.user);
            alert(JSON.stringify(this.user));  
      }
    },
    
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
  .Modal-Register {
    float: right; 
    
  }
</style>
