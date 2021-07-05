<template>
<div class="registration">
   <b-navbar toggleable="false" type="dark" variant="transparent">

      <b-navbar-brand href = "#" style="text-decoration: none; color:black;">RoboDoc</b-navbar-brand>

    <div class="Modal-Register">
    
    <b-modal id="modal-1" title="Register" hide-footer="true">
		<p v-if="msg">{{ msg }}</p>
      <b-form-group id="Hospital Employee" 
          
          label-for="input-employee">
          <b-form-input id="input-employee"
           v-model=employee.name 
          placeholder="Name"
          />
      </b-form-group>

      <b-form-group
        id="email"
        label-for="input-email">
        <b-form-input
        id="input-email"
          type= "email"
          placeholder="Email"
          v-model=employee.email />
      </b-form-group>

      <b-form-group
        id="username"
        label-for="input-username"
        >
        <b-form-input
          id="input-username"
          type="text"
          placeholder="Username"
          v-model=employee.username />
      </b-form-group>

      <b-form-group
        id="password"
        label-for="input-password"
       
        >
        <b-form-input
          id="input-password"
          type="password"

          placeholder="Password"
          v-model=employee.password 
          @keydown.enter="signUp"
          />
      </b-form-group>

       <div class="modal-footer">
        <button type="button"  @click="signUp" class="btn btn-success btn-lg btn-block" data-dismiss="modal">Register</button>

      </div>

     
      
    </b-modal>
  </div>

  <div class="Modal-login">
    <b-button class= "registerButton"  v-b-modal.modal-1 size="sm" variant="outline-dark" style="text-decoration: none; color:black;">Register</b-button>
    <b-button class= "loginButton" v-b-modal.modal-2 size="sm" variant="outline-dark" style="text-decoration: none; color:black;">Login</b-button>
    <b-button variant="outline-dark" size="sm"> <router-link style="text-decoration: none; color:black;" to="/singlePatient"> Get Single Patient Data</router-link></b-button>
   
   
   
    <b-modal id="modal-2" title="Login" hide-footer="true"
    
            >
      


     <b-form-group
                id="user"
                
                label-for="user"
                invalid-feedback="Wrong Input"
                valid-feedback="Thank you">
                 <b-form-input id= "user"
                 placeholder="Username"
                 v-model=user.username >
                </b-form-input>
      </b-form-group>

       <b-form-group
                id="password"
                label-for="password"
                invalid-feedback="Wrong password"
                valid-feedback="Thank you">
                 <b-form-input id="password"
          type="password"
           placeholder="Password"
          v-model=user.password
          @keydown.enter="login">
                </b-form-input>
      </b-form-group>


     <div class="modal-footer">
        <button type="button"  @click="login" class="btn btn-primary btn-lg btn-block" data-dismiss="modal">Login</button>

      </div>


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
     The latest innovation in the field of hospital management
     </p>




    <b-container class="bv-container">
      <b-row>
        <b-col>

          <b-card 
            class="card1"
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

          <b-card  class="card2"
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
        <b-col>

          <b-card  
            class="card3"
            id = "register3-card"
            title="Get Single Patient Data">
              <b-card-text>
                You can also use RoboDoc as a patient. <br>
                 Simply ask your attending doctor for your RoboDoc ID 
                 and view your personal data here.
              </b-card-text>
    
              <b-button variant="outline-dark"> <router-link style="text-decoration: none; color:black;" to="/singlePatient"> Get Single Patient Data</router-link></b-button>
          </b-card>
        </b-col>

      
    </b-container>


   


     <v-footer>

          <p style="color:dimgrey"> 2021 - RoboDoc </p>    


      </v-footer>

    </div>

</template>


<script>
import AuthService from '@/services/AuthService.js'
import UserService from '../services/UserService'


export default {
    name: 'Registration', 
    
    props:{}, 
    components:{
        
    },

    created(){
        document.title = "RoboDoc"
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
          
          
          const responseTwo = await UserService.getUserByUsername(this.user.username); 
          console.log(responseTwo);

          if (responseTwo.isAdmin){
            this.$router.push('/adminHome'); 
          }
          else {
            this.$router.push('/homepage'); 
          }


        }catch (error){
            this.message = error.response.data.msg
        }

      },
          
      

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
      margin-bottom: 25%;
      font-family: "Century Gothic", CenturyGothic, Geneva, AppleGothic, sans-serif;
    }

    @media (min-width: 500px) {
      h1, h2 {
        font-size: 100%;
      }
    }

      @media (min-width: 768px) {
      h1, h2 {
        font-size: 200%;
      }
      }

      @media (min-width: 992px) {
      h1, h2 {
        font-size: 300%;
      }
      }
      
      
    

    h2 {
      color: black;
     margin-bottom: 25%;
      font-family: "Century Gothic", CenturyGothic, Geneva, AppleGothic, sans-serif;
    }

    

   
.carousel {
  position:relative;
      
}
.carousel-inner {
  
  display: flex;
  align-items: center;
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
   position: left;

}

.loginButton {

  margin-right: 5px;
   position: left;

}

.card {
  margin-bottom: 50px;
}

p {
  margin-top: 50px;
}

   

</style>


