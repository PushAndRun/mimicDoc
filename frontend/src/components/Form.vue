<template>
  <div>

    <b-navbar toggleable="false" type="dark" variant="info">

      <b-navbar-brand href = "#"><b>RoboDoc</b></b-navbar-brand>
    </b-navbar>

    <h1> Hi {{username}} </h1>
    <b-form id="formular" @submit="submitPatient" @reset="onReset">
      <br>
      <h2>Form for patient's assessment</h2>
    <br>
    <br>
      

      <b-form-group 
      id="input-group-2" 
      label="Patient's Name:"
      label-for="input-2"
      >
      
        <b-form-input
          id="input-2"
          type="text"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

       <b-form-group 
      id="input-group-3" 
      label="Patient's Birthdate Age:" 
      label-for="input-3">
        <b-form-datepicker
          id="input-3"
          v-model="form.age"
          placeholder="Enter your birthday"
          required
        ></b-form-datepicker>
      </b-form-group>

      <b-form-group id="input-group-7"  label="Please choose patient's gender:" label-for="input-7" required>
        
          <b-form-radio v-model="form.gender" value="male">male</b-form-radio>
          <b-form-radio v-model="form.gender" value="female">female</b-form-radio>

        
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Patient's Email address:"
        label-for="input-1"
        
        
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

       <b-form-group 
      id="input-group-4" 
      label="Patient's Weight in kg:" 
      label-for="input-4">
        <b-form-input
          id="input-4"
          type="number"
          v-model="form.weight"
          placeholder="Enter weight"
          required
        ></b-form-input>
      </b-form-group>


      <b-form-group 
      id="input-group-5" 
      label="Patient's Height in cm:" 
      label-for="input-5">
        <b-form-input
          type="number"
          id="input-5"
          v-model="form.height"
          placeholder="Enter height"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Please choose patient's Bloodtype:" label-for="input-6">
        <b-form-select
          id="input-6"
          v-model="form.bloodtype"
          :options="bloodtypes"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-8" label="Type in several patient's diagnoses and add with enter" label-for="input-8">
        <b-form-tags v-model=form.diagnoses></b-form-tags>
      </b-form-group>

      

      <b-button type="submit" variant="success">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    
  </div>
</template>

<script>

import AuthService from '@/services/AuthService.js'

  export default {

    computed: {
      state() {
        return this.name.length >= 4
      },
      invalidFeedback() {
        if (this.name.length > 0) {
          return 'Enter at least 4 characters.'
        }
        return 'Please enter something.'
      }
    },

    data() {
      return {

        
        secretMessage:"", 
        username:"",

        
        form: {
          email: '',
          name: '',
          age: '',
          weight: '',
          height: '',
          bloodtypes: null,
          gender: '',
          diagnoses:[],
           
        },
        bloodtypes: [{ text: 'Unknown', value: null }, 'A+', 'A-', 'B+', 'B-' , 'AB+' , 'AB-' , '0+' , '0-'],
        
      }
    },
    async created(){
          if(!this.$store.getters.isLoggedIn){
            this.$router.push('/registration')
          }
        this.username = this.$store.getters.getUser.username;

        this.secretMessage = await AuthService.getSecretContent();
    },

    methods: {
      submitPatient (event){
          event.preventDefault();
          this.$emit("create-Patient", this.form);
      },
      logout(){
        this.$store.dispatch('logout'); 
        this.$router.push('registration'); 
      },

      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.age = ''
        this.form.weight = ''
        this.form.height = ''
        this.form.bloodtype = null
        this.form.gender = []
        this.diagnoses=[]
       
      }
    }
  }
</script>


<style scoped>


.form-group {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }

.btn {
  margin: 10px;
}

#formular {
 margin-left:50px;
 margin-right:100px; 
}

</style>

