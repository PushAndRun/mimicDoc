<template>
  <div class = "navigation">
    <b-navbar toggleable="false" type="dark" variant="info">

      <b-navbar-brand href = "#"><b>RoboDoc</b></b-navbar-brand>

      <b-navbar-nav class = "ml-auto">
        <!-- on click einführen und dann neuen nutzer erstellen mit $emit -->
        <b-button id="RegisterButton" v-b-modal.modal-1>Register</b-button>

        
         <b-modal id="modal-1" title="Register"> 

           <b-form-group id="name" description="Let us know your name" label="Enter your name" valid-feedback='Thank you!' :invalid-feedback='invalidFeedbackName' :state='state1'>
             <b-form-input id="input-1" v-model="name" :state="state1" trim></b-form-input>
           </b-form-group>

           <b-form-group id="gender" description="What is your gender?" label="Choose your gender" :state='state4' valid-feedback='Thank you!' :invalid-feedback='invalidFeedbackGender'>
              <b-form-radio id="input-2a" v-model="gender" value="m" unchecked>male</b-form-radio>
              <b-form-radio id="input-2b" v-model="gender" value="f" unchecked>female</b-form-radio>
           </b-form-group>

           <b-form-group id="mail" description="Let us know e-mail address" label="Enter your email-address" valid-feedback='Thank you!' :invalid-feedback='invalidFeedbackMail' :state='state2'>
             <b-form-input id="input-3" v-model="mail" :state="state2" trim></b-form-input>
           </b-form-group>

           
           <b-form-group id="age" description="Let us know your birth date" label="Choose your birth date" valid-feedback='Thank you!' :invalid-feedback = 'invalidFeedbackAge' :state='state3'>
            <b-form-datepicker id="input-4" v-model="age" :state='state3' trim></b-form-datepicker>
           </b-form-group>

            <b-form-group id="preExistingCondition" description="Let us know about any diagnosed pre-existing conditions" label="Enter your pre-existing conditions">
              <b-form-tags id="input-5" v-model="preExistingConditions" placeholder='Enter pre-existing condition' trim></b-form-tags>
           </b-form-group>

            <b-form @submit.stop.prevent>
              <label for="password">Password</label>
                <b-form-input type="password" id="password" aria-describedby="password-help-block"></b-form-input>
                <b-form-text id="password-help-block">
                Your password must be 8-20 characters long, contain letters and numbers, and must not
                contain spaces or special characters
                </b-form-text>
              </b-form>

             <!-- passwort show/hide --> 

          </b-modal> 
      </b-navbar-nav>
       <b-navbar-nav right>

         <!-- Login und wieder $emit -->

        <b-button id="LogInButton" v-b-modal.modal-1>Login</b-button>
         <b-modal id="modal-2" title="Login"> 




           </b-modal> 
      </b-navbar-nav>


    </b-navbar>
  </div>
  
</template>

<!-- bei function problem suchen -->

<script>
export default {
  name: "NavBar",
  props: {},
  computed: {
    
    state1(){
      return this.name.length >= 4 
    },
    state2(){
      return this.mail.includes('@') 
    },
    state3(){
      return 2021 - this.age.substring(0,4) > 17 
    },
    state4(){
      return this.gender == 'm' || this.gender == 'f'  
    },
    invalidFeedbackName (){
      if (this.name.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    },
    invalidFeedbackMail (){
      if (!this.mail.includes('@')) {
        return 'Your e-mail address must include @'
      }
      return 'Please enter your e-mail address.'
    },
    invalidFeedbackAge (){
      console.log(2021 - this.age.substring(0,4))
      if (2021 - this.age.substring(0,4) < 17 ) {
        return 'You are to young to register on this website'
      }
      
      return 'Please choose your age.'
    },
    invalidFeedbackGender (){
      return 'Please choose your gender'
    }

    
    
  },
  
    data(){
      return {
        name:'',
        mail:'',
        age:'Nothing selected',
        preExistingConditions:'',
        gender:'',
      }
    },

    methods: {
      
    showPassword() {
      var x = document.getElementById("password");
      if (x.type === "password") {
      x.type = "text";
      } else {
      x.type = "text";
      }
      }

    },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #LogInButton {
    margin-left: 5px;
  }
</style>

