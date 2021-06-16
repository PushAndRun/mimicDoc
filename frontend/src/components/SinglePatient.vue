<template>
    <div>
      

        <b-navbar toggleable="false" type="dark" variant="dark">
            <b-navbar-brand style="color:white"><router-link style="text-decoration: none; color:white" to="/" >RoboDoc</router-link></b-navbar-brand>
        </b-navbar>

        <br>
        <br>
        <br>
        <h2>Patient Information</h2>
        <br>
        <br>



        <b-input-group size="mg" class="id">
            <b-form-input 
                type= "text"
                v-model=Singlepatient.id
                placeholder="Please insert your ID"></b-form-input>
            <b-input-group-append class="button">
                <b-button  variant="outline-success" @click = "getPatientData">Search</b-button>
            </b-input-group-append> 
        </b-input-group>



        <b-card v-for="patient in patients" :key="patient._id" :title="patient.name" :sub-title="patient._id" class="patientCard">
            <b>Requests </b><br>
           <!-- Last Request: {{patient.requests[patient.requests.length-1].created.substring(0,10)}} <br> -->
            Number of Request: {{patient.requests.length }} <br><br>
            Date of Birth: {{ patient.medicalData.dateOfBirth.substring(0,10) }} <br> 
            Gender: {{ patient.medicalData.gender }} <br>
            Weight: {{ patient.medicalData.weight }} kg<br>
            Height: {{ patient.medicalData.height }} cm<br>
             <br>
            
            <!-- Bloodtype: {{ patient.medicalData.bloodtype }} <br> -->
            <br>
            <b>Blood Pressure </b><br>
          <!--  Mean: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_mean }} mmHg<br> -->
            Min: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_min }} mmHg<br>
           <!--  Max: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_max }} mmHg<br> -->
            <br>
            <b>Glucose Levels </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].glucose.glucose_mean }} mg/dL<br>
            Min: {{ patient.requests[patient.requests.length-1].glucose.glucose_min }} mg/dL<br>
            Max: {{ patient.requests[patient.requests.length-1].glucose.glucose_max }} mg/dL<br>
            <br>
          <b> Respiratory Rate </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].respiratory.resprate_mean }} breaths per minute<br>
            Min: {{ patient.requests[patient.requests.length-1].respiratory.resprate_min }} breaths per minute<br>
            Max: {{ patient.requests[patient.requests.length-1].respiratory.resprate_max }} breaths per minute<br>
            <br>
            Mean Temperature: {{ patient.requests[patient.requests.length-1].tempc_mean }} CÂ°<br>
            <br>
            Patient History: {{ patient.requests[patient.requests.length-1].patient_history.join(', ') }} <br>
            Diagnoses: {{ patient.requests[patient.requests.length-1].diagnoses.join(', ') }}  <br> 
            <br>
            Chances of Survival: {{ patient.survival }} %<br>  
            
        </b-card>



        <v-footer>
            <p style="color:dimgrey"> 2021 - RoboDoc </p>    
        </v-footer>
       

    </div>

</template>

<script>
import PatientService from '@/services/PatientService.js'


export default {
    name: 'SinglePatient', 
    data(){
        return {
            patient:{},
            patients:[],

            Singlepatient: {
                id: '',
            },
        }
    },

    
    methods: {
        patientNotEmpty (){
            return this.patient!=null;
        },
        async getPatientData () {
            try {
                this.patients = []; 
                const id= this.Singlepatient.id
                this.patient = {}
                this.patient = await PatientService.fetchSinglePatient(id);
                this.patients.push(this.patient); 
                console.log(this.patient)
            
            } catch (error){
                this.msg = error.response.data.msg;
            }
        }

    }
    
}


</script>

<style scoped>

    

    .id {
        margin-top: 50px;
        margin-left: 150px;
        margin-right: 150px;
        margin-bottom: 150px;
    }

    .button {
        margin-right: 300px;
    }

    .patientCard{

        margin: 150px;
    }

    

  


</style>