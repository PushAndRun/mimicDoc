<template>
<div class="registration">
   <div class = "navigation" >
   <b-navbar toggleable="false" type="dark" variant="transparent">

      <b-navbar-brand href = "#"><b>RoboDoc</b></b-navbar-brand>

    <div class="Modal-Register">
    
    <b-modal id="modal-1" title="Register Hospital Employee" @ok="signUp">
		<p v-if="msg">{{ msg }}</p>
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
    <b-button class= "registerButton"  v-b-modal.modal-1 size="sm" variant="outline-light" >Register</b-button>
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

     <b-carousel
      id="carousel"
      :interval="4000"
      background="#ababab"
      img-width="1024"
      img-height="488"
      style="text-shadow: 1px 1px 2px #333;"
     
    >
     
      <!-- Slides with custom text -->
      <b-carousel-slide 
      img-src="https://picsum.photos/id/733/1024/488">
        <h1>RoboDoc</h1>
      </b-carousel-slide>

       <!-- Text slides with image -->
      <b-carousel-slide
        img-src="https://picsum.photos/id/668/1024/488"
      > <h2>The smart way to manage your patients</h2>
      </b-carousel-slide>


          
    </b-carousel>


    <p>Discover RoboDoc
      <br>
     The latest innovation in the field of hospital management</p>




    <b-container class="bv-container">
      <b-row>
        <b-col>

    <b-card 
    class="card"
    id = "register-card"
    title="Register"
    >
      <b-card-text>
         If you do not have an account set up yet you will need to register first to access RoboDoc 
      
      </b-card-text>
    
    
   
    

    <b-button v-b-modal.modal-1 variant="outline-dark">Register</b-button>
  </b-card>
        </b-col>
        <b-col>

  <b-card 
  class="card"
  id = "register2-card"
  title="Log In ">
      <b-card-text>
        Log in to account to fill the form to assess patient

      </b-card-text>

    <br>
    
    <b-button v-b-modal.modal-2 variant="outline-dark">Log in</b-button>
  </b-card>
        </b-col>
      </b-row>
    </b-container>
    </div>
    
</div>
</template>


<script>
import AuthService from '@/services/AuthService.js'

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
          const user = this.user;

          this.$store.dispatch('login',{token,user}); 

          this.$router.push('/homepage'); 


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

    h1 {
      color: black;
      margin-bottom: 300px;
      font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
    }
    h2 {
      color: black;
      margin-bottom: 300px;
      font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
    }

   
.carousel {
  position:relative;
    top:0;    
}
.navbar {
    position:absolute;
    top:0px;
    z-index:10;
    background:#fff;
    width:100%;
}
.navbar-inner {
    background:transparent;
}

.registerButton {

  margin-right: 5px;

}

.card {
  
  margin-bottom: 50px;
}

p {
  margin-top: 50px;
}




   

   
.carousel {
  position:relative;
    top:0;    
}
.navbar {
    position:absolute;
    top:0px;
    z-index:10;
    background:#fff;
    width:100%;
}
.navbar-inner {
    background:transparent;
}

.registerButton {

  position: left;

}

.card {
  
  margin-bottom: 50px;
}

p {
  margin-top: 50px;
}




   

</style>


