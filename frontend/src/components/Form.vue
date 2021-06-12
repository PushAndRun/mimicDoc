<template>
  <div>

     <b-navbar toggleable="false" type="dark" variant="dark">
    <b-navbar-brand style="color:white">RoboDoc</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template >
        <b-icon style="color:white" variant="light">Menu</b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto" >
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/homepage" >Homepage</router-link></b-nav-item>
          <b-nav-item><router-link style="text-decoration: none; color:white " to="/patients">View all your Patients </router-link></b-nav-item>
          <b-nav-item  @click="logout"><p style="color:white">Sign Out</p></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
     <br>

     
     
    <b-form id="formular" @submit="submit">
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
      label="Patient's Birthday:" 
      label-for="input-3">
        <b-form-datepicker
          id="input-3"
          v-model="form.dateOfBirth"
          placeholder="Enter Patient's birthday"
          required
        ></b-form-datepicker>
      </b-form-group>

      <b-form-group id="input-group-7"  label="Please choose Patient's gender:" label-for="input-7" required>
        
          <b-form-radio v-model="form.gender" value="M">male</b-form-radio>
          <b-form-radio v-model="form.gender" value="F">female</b-form-radio>

        
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
          v-model="form.meanbp_mean"
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
          v-model="form.meanbp_max"
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


        <vue-bootstrap-typeahead
        v-model = "valueHist"
        :data=this.availableDiagnoses
        @hit=appendHistory>
        </vue-bootstrap-typeahead>


        Selected Diagnoses for Patient's History = {{form.patient_history.join(', ') }}
      </b-form-group>



      <b-form-group id="input-group-8" label="Type in several Patient's diagnoses and add with enter" label-for="input-8">
        <vue-bootstrap-typeahead
        v-model = "valueDiag"
        :data=this.availableDiagnoses
        @hit=appendDiagnoses>
        </vue-bootstrap-typeahead>


        Selected Diagnoses = {{form.diagnoses.join(', ') }}
      </b-form-group>


      <b-button style= "margin-bottom:30px" type="submit" variant="outline-success">Submit</b-button>
    </b-form>

     <v-footer>

          <p style="color:dimgrey"> 2021 - RoboDoc </p>    


      </v-footer>
    
  </div>
</template>

<script>

import PatientService from '../services/PatientService'
import DiagnosesService from '../services/DiagnosesService'


  export default {

    

    data() {
      return {
        username:"",
        availableDiagnoses:[],
        valueDiag:'',
        valueHist:'',
       
        form: {
          name: '',
          dateOfBirth: '',
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

        try{
          const response = await DiagnosesService.fetchDiagnoses(); 
          this.availableDiagnoses = response;
          this.availableDiagnoses = this.availableDiagnoses.map(a => a.short_title).reduce(function (a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
          console.log(this.availableDiagnoses);

        }catch (error){
          console.log("unable to fetch diagnoses from server");
        }
    },

    methods: {

      logout(){
      this.$router.push('/');
      this.$store.dispatch('logout'); 
      },

        appendDiagnoses(){
        this.form.diagnoses.push(this.valueDiag); 
        this.valueDiag='';
      },

      appendHistory(){
        this.form.patient_history.push(this.valueHist);
        this.valueHist='';
      },

      getDiagnoses(){
        return this.availableDiagnoses;
      },

      
      async submit (){
      try {
        const patientObject = {
            patient:{
              name:this.form.name,
              dateOfBirth:this.form.dateOfBirth,
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
          const response = await PatientService.createPatient(patientObject);
          this.msg = response.msg;   
        } catch (error){
            this.msg = error.response.data.msg;
        }
        this.$router.push('/homepage');
      },

   
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
