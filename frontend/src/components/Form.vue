<template>
  <div>

    <b-navbar toggleable="false" type="dark" variant="info">

      <b-navbar-brand href = "#"><b><router-link to="/homepage"  style="text-decoration: none; color:inherit ">RoboDoc</router-link></b></b-navbar-brand>

       <b-button variant="transparent" @click="logout">Logout</b-button>
    </b-navbar>
     <br>
     <h1> Hi {{username}} </h1>
     
    <b-form id="formular" @submit="submit" @reset="onReset">
      <br>
      <h2>Form for Patient's assessment</h2>
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

      <b-form-group id="input-group-7"  label="Please choose Patient's gender:" label-for="input-7" required>
        
          <b-form-radio v-model="form.gender" value="male">male</b-form-radio>
          <b-form-radio v-model="form.gender" value="female">female</b-form-radio>

        
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

      <b-form-group id="input-group-6" label="Please choose Patient's Bloodtype:" label-for="input-6">
        <b-form-select
          id="input-6"
          v-model="form.bloodtype"
          :options="bloodtypes"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-bp"
        label="Enter Patient's blood levels:"
        label-for="input-bp"
        
      >
        <b-form-input
          id="input-bpmean"
          v-model="form.meanpb_mean"
          type="number"
          placeholder="Enter mean blood pressure"
          required
        ></b-form-input>
  <br>
        <b-form-input
          id="input-bpmin"
          v-model="form.meanbp_min"
          type="number"
          placeholder="Enter min blood pressure"
          required
        ></b-form-input>
<br>

        <b-form-input
          id="input-bpmax"
          v-model="form.meanpb_max"
          type="number"
          placeholder="Enter max blood pressure"
          required
        ></b-form-input>
      </b-form-group>


          <b-form-group
        id="input-group-resprate"
        label="Enter Patient's resprate:"
        label-for="input-bp"
        
      >
        <b-form-input
          id="input-respratemean"
          v-model="form.resprate_mean"
          type="number"
          placeholder="Enter mean resprate"
          required
        ></b-form-input>
  <br>
        <b-form-input
          id="input-respratemin"
          v-model="form.resprate_min"
          type="number"
          placeholder="Enter min resprate"
          required
        ></b-form-input>
<br>

        <b-form-input
          id="input-respratemax"
          v-model="form.resprate_max"
          type="number"
          placeholder="Enter max resprate"
          required
        ></b-form-input>
      </b-form-group>


         <b-form-group 
      id="input-group-4" 
      label="Patient's mean temperature in C°:" 
      label-for="input-tempc">
        <b-form-input
          id="input-tempc"
          type="number"
          v-model="form.tempc_mean"
          placeholder="Enter mean temperature in C°"
          required
        ></b-form-input>
      </b-form-group>


        <b-form-group
        id="input-group-glucose"
        label="Enter Patient's glucose values:"
        label-for="input-bp"
        
      >
        <b-form-input
          id="input-glucosemean"
          v-model="form.glucose_mean"
          type="number"
          placeholder="Enter mean glucose value"
          required
        ></b-form-input>
  <br>
        <b-form-input
          id="input-glucosemin"
          v-model="form.glucose_min"
          type="number"
          placeholder="Enter min glucose value"
          required
        ></b-form-input>
<br>

        <b-form-input
          id="input-glucosemax"
          v-model="form.glucose_max"
          type="number"
          placeholder="Enter max glucose value"
          required
        ></b-form-input>
      </b-form-group>

 <b-form-group id="input-group-history" label="Enter the Patient's history and add with enter" label-for="input-history">
        <b-form-tags v-model=form.diagnoses></b-form-tags>
      </b-form-group>
      


      <b-form-group id="input-group-8" label="Type in several Patient's diagnoses and add with enter" label-for="input-8">
        <b-form-tags v-model=form.patient_history></b-form-tags>
      </b-form-group>

      

      <b-button type="submit" variant="success">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    
  </div>
</template>

<script>

import PatientService from '@/services/PatientService.js'

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
      }, 

    },

    data() {
      return {

        
        
        username:"",

        
        form: {
          name: '',
          age: '',
          gender: '',
          weight: '',
          height: '',
          bloodtypes: null,
          meanbp_mean:'', 
          meanbp_min:'', 
          meanbp_max:'', 
          resprate_min:'',
          resprate_max:'', 
          resprate_mean:'', 
          tempc_mean:'',
          glucose_min:'',
          glucose_max: '',
          glucose_mean: '',
          patient_history:[],
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
        
        //this.secretMessage = await AuthService.getSecretContent();
    },
    
    methods: {
      submitPatient (event){
          event.preventDefault();
          this.$emit("create-Patient", this.form);
      },


        async submit (){
        try {
          const credentials = {
           
         patient:{
              name:this.form.name,
              age:this.form.age,
              gender:this.form.gender,
              weight:this.form.weight,
              height:this.form.height,
                medicalData:{
                  bloodtypes:this.form.bloodtypes,
                  bloodpressure:{
                    mean:this.form.meanbp_mean, 
                    min:this.form.meanbp_min, 
                    max:this.form.meanbp_max
                  }, 
                  resprate:{ 
                  min:this.form.resprate_min,
                  max:this.form.resprate_max, 
                  mean:this.form.resprate_mean
                  }, 
                  temperature:{
                  mean:this.form.tempc_mean,
                  }, 
                  glucose:{
                  min:this.form.glucose_min,
                  max:this.form.glucose_max,
                  mean:this.form.glucose_mean
                  },
                  patient_history:this.form.patient_history,
                  diagnoses:this.form.diagnoses
                }
            }
          };
          const response = await PatientService.createPatient(credentials);
          
          this.msg = response.msg; 
        
          
          
        } catch (error){
            this.msg = error.response.data.msg;
        }

        this.$router.push('/homepage');

      },

      logout(){
        this.$store.dispatch('logout'); 
        this.$router.push('registration'); 
      },
     

     onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.name= ''
        this.form.age= ''
         this.form.gender= ''
          this.form.weight= ''
          this.form.height= ''
          this.form.bloodtypes= null
          this.form.meanbp_mean=''
          this.form.meanbp_min=''
          this.form.meanbp_max=''
          this.form.resprate_min=''
          this.form.resprate_max=''
          this.form.resprate_mean=''
          this.form.tempc_mean=''
          this.form.glucose_min=''
          this.form.glucose_max= ''
          this.form.glucose_mean= ''
          this.form.patient_history=[]
          this.form.diagnoses=[]
       
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