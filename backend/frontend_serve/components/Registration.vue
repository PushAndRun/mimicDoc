<template>
<div class="registration">
   <div class = "navigation">
   <b-navbar toggleable="false" type="dark" variant="info">

      <b-navbar-brand href = "#"><b>RoboDoc</b></b-navbar-brand>

    <div class="Modal-Register">
    <b-button v-b-modal.modal-1 size="sm" variant="outline-light">Register</b-button>
    <b-modal id="modal-1" title="Register Hospital Employee" @ok="signUp">
		
      <b-form-group id="Hospital Employee" 
          label="Your Name" 
          label-for="input-employee">
          <b-form-input id="input-employee" 
          v-model=employee.name trim />
      </b-form-group>

      <b-form-group
        id="email"
        label="Your Email address"
        label-for="input-email">
        <b-form-input
        id="input-email"
          type= "email"
          v-model=employee.email />
      </b-form-group>

      <b-form-group
        id="username"
        label="Enter prefered Username"
        label-for="input-username"
        >
        <b-form-input
          id="input-username"
          type="text"
          
          v-model=employee.username />
      </b-form-group>

      <b-form-group
        id="password"
        label="Enter your prefered password containing at least 8 characters"
        label-for="input-password"
        >
        <b-form-input
          id="input-password"
          type="password"
          v-model=employee.password />
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
                 <b-form-input id= "user"
                 v-model=user.username >
                </b-form-input>
      </b-form-group>

       <b-form-group
                id="password"
                label="Password"
                label-for="password"
                invalid-feedback="Wrong password"
                valid-feedback="Thank you">
                 <b-form-input id="password"
          type="password"
          v-model=user.password>
                </b-form-input>
      </b-form-group>


    


    </b-modal>
  </div>

   


    </b-navbar>

    <b-container class="bv-container">
      <b-row>
        <b-col>

    <b-card
    id = "register-card"
    title="Register"
    img-src=https://picsum.photos/seed/picsum/600/300
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      If you do not have an account set up yet you will need to register first to access RoboDoc 
      
    </b-card-text>
    

    <b-button v-b-modal.modal-1 variant="primary">Register</b-button>
  </b-card>
        </b-col>
        <b-col>

  <b-card
    id = "register2-card"
    title="Log In "
    img-src=https://picsum.photos/seed/picsum/600/300
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      Log in to account to fill the form to assess patient
    </b-card-text>
    <br>
    

    <b-button v-b-modal.modal-2 variant="primary">Log in</b-button>
  </b-card>
        </b-col>
      </b-row>
    </b-container>
    </div>
    
</div>
</template>


<script>
import AuthService from '../services/AuthService.js'

export default {
    name: 'Registration', 
    props:{}, 
    components:{
        
    },
 
    data(){
      
      return {
        msg:"",
        employee:{
          name:"", 
          email:"", 
          username:"",
          password:""


        },
         user: {
          username: '',
          password: '',
         
        },

        
      }
    },
  
  methods: {
     

      registration(event){
        event.preventDefault();
        
        this.$emit("register-Employee", this.employee);
      },

      async signUp (){
        try {
          const credentials = {
            name:this.employee.username, 
            email: this.employee.email,
            password: this.employee.password 
          };
          const response = await AuthService.signUp(credentials);
          this.msg = response.msg; 
          
          
        } catch (error){
            this.msg = error.response.data.msg;
        }
      }, 
      async login (){
        try {
          const credentials = {
            name:this.user.username, 
            password: this.user.password
          }; 
          const response = await AuthService.login(credentials); 

          this.msg = response.msg; 

          const token = response.token; 
          const user = response.user;

          this.$store.dispatch('login',{token,user}); 

          this.$router.push('form'); 


        }catch (error){
            this.message = error.response.data.msg
        }
        }

      }
    }

</script>

<style scoped>
    #register-card{
        margin-top: 30%; 
        

    }
    #register2-card{
         margin-top:30%;
    }
</style>

