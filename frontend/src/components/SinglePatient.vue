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
           Last Request: {{patient.requests[patient.requests.length-1].created.substring(0,10)}} <br> 
            Number of Request: {{patient.requests.length }} <br><br>
            Date of Birth: {{ patient.medicalData.dateOfBirth.substring(0,10) }} <br> 
            Gender: {{ patient.medicalData.gender }} <br>
            Weight: {{ patient.medicalData.weight }} kg<br>
            Height: {{ patient.medicalData.height }} cm<br>
             <br>
           
            <b>Blood Pressure </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_mean }} mmHg<br> 
            Min: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_min }} mmHg<br>
            Max: {{ patient.requests[patient.requests.length-1].bloodpressure.meanbp_max }} mmHg<br> 
             <b-button @click=createBpChart(patient.requests,patient.name) style="margin:10px" size="sm" variant="primary">Show chart</b-button>
            <b-button @click=hideBpChart size="sm" variant="primary">Hide Chart </b-button>
         
            <div v-if=bpChartEnabled>
             
            <GChart type="ColumnChart"
            :data="BpChartData"
            :options="BpChartOptions"
            :settings="{ packages: ['corechart','table'] }"
            />
             
            </div>
            <br>
            <b>Glucose Levels </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].glucose.glucose_mean }} mg/dL<br>
            Min: {{ patient.requests[patient.requests.length-1].glucose.glucose_min }} mg/dL<br>
            Max: {{ patient.requests[patient.requests.length-1].glucose.glucose_max }} mg/dL<br>
             <b-button @click=createGlChart(patient.requests) style="margin:10px" size="sm" variant="primary">Show chart</b-button>
            <b-button @click=hideGlChart size="sm" variant="primary">Hide Chart </b-button>
            
            <div v-if=glChartEnabled>
             
            <GChart type="ColumnChart"
            :data="GlChartData"
            :options="GlChartOptions"
            :settings="{ packages: ['corechart','table'] }"
            
            />
            
            </div>
            <br>
          <b> Respiratory Rate </b><br>
            Mean: {{ patient.requests[patient.requests.length-1].respiratory.resprate_mean }} breaths per minute<br>
            Min: {{ patient.requests[patient.requests.length-1].respiratory.resprate_min }} breaths per minute<br>
            Max: {{ patient.requests[patient.requests.length-1].respiratory.resprate_max }} breaths per minute<br>
             <b-button @click=createReChart(patient.requests) style="margin:10px" size="sm" variant="primary">Show chart</b-button>
            
            <b-button @click=hideReChart size="sm" variant="primary">Hide Chart </b-button>
            
            <div v-if=reChartEnabled>
             
            <GChart type="ColumnChart"
            :data="ReChartData"
            :options="ReChartOptions"
            :settings="{ packages: ['corechart','table'] }"
            />
           
            </div>
            
            <br>
            Mean Temperature: {{ patient.requests[patient.requests.length-1].tempc_mean }} C°<br>
            <br>
            Patient History: {{ patient.requests[patient.requests.length-1].patient_history.join(', ') }} <br>
            Diagnoses: {{ patient.requests[patient.requests.length-1].diagnoses.join(', ') }}  <br> 
            <br>
             <b>Chances of Survival:</b> {{ (Math.round(patient.requests[patient.requests.length-1].survival * 100)) / 100 }} 
          <b-icon icon="exclamation-circle" style="width: 15px; height: 15px;"  variant="info" v-b-tooltip.hover title="A value above 0.5 means that the patient is a high-risk patient.">
            </b-icon>
            <br> 
            
    
            <b>Estimated Length of Stay:</b> {{  (Math.round(patient.requests[patient.requests.length-1].stay * 100)) / 100 }} days
            <b-icon icon="exclamation-circle" style="width: 15px; height: 15px;"  variant="info" v-b-tooltip.hover title="The length of stay has a standard deviation of 4 days">
            </b-icon>
            <br>
            
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

            bpChartEnabled:false, 
            glChartEnabled:false,
            reChartEnabled:false,

            BpChartData:[           
          ['Request','Min','Mean','Max'],               
          ], 
        GlChartData:[           
          ['Request','Glucose_min','Glucose_mean','Glucose_max'],               
          ], 
        ReChartData:[           
          ['Request','Resprate_min','Resprate_mean','Resprate_max'],               
          ],       
          BpChartOptions:{                
              title:'Bloodpressure Values for several Requests',  
              chartArea:{width:"50%",height:"70%"}           
          },
          GlChartOptions:{                
              title:'Glucose Values for several Requests',  
              chartArea:{width:"50%",height:"70%"}           
          },
          ReChartOptions:{                
              title:'Resprate Values for several Requests',  
              chartArea:{width:"50%",height:"70%"}          
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
        }, 
        createBpChart(requests){
        this.BpChartData = [           
          ['Request','Min Bloodpressure','Mean Bloodpressure','Max Bloodpressure']                 
          ]
        for(var i = 0; i < requests.length; i ++){
            let min = requests[i].bloodpressure.meanbp_min != null ? requests[i].bloodpressure.meanbp_min : 0 
            let mean = requests[i].bloodpressure.meanbp_mean != null ? requests[i].bloodpressure.meanbp_mean : 0
            let max = requests[i].bloodpressure.meanbp_max != null ? requests[i].bloodpressure.meanbp_max : 0
          this.BpChartData.push([i + 1 + ". Request", min, mean, max]);          
        }
        
        this.bpChartEnabled = true; 
 
      },

      createGlChart(requests){
        this.GlChartData = [           
          ['Request','Min Glucose','Mean Glucose','Max Glucose']                 
          ]
          for(var i = 0; i < requests.length; i ++){
            let min = requests[i].glucose.glucose_min != null ? requests[i].glucose.glucose_min : 0 
            let mean = requests[i].glucose.glucose_mean != null ? requests[i].glucose.glucose_mean : 0
            let max = requests[i].glucose.glucose_max != null ?requests[i].glucose.glucose_max : 0
          this.GlChartData.push([i + 1 + ". Request", min, mean, max]);
          
        }
       
        this.glChartEnabled = true; 
   
      },
      createReChart(requests){
        this.ReChartData = [           
          ['Request','Min Resprate','Mean Resprate','Max Resprate']                 
          ]
          for(var i = 0; i < requests.length; i ++){
              let min = requests[i].respiratory.resprate_min ? requests[i].respiratory.resprate_min : 0 
            let mean = requests[i].respiratory.resprate_mean != null ? requests[i].respiratory.resprate_mean : 0
            let max = requests[i].respiratory.resprate_max != null ?requests[i].respiratory.resprate_max : 0
          this.ReChartData.push([i + 1 + ". Request", min, mean, max]);
          
        }
   
        this.reChartEnabled = true; 
        
      },
      hideBpChart(){
        this.bpChartEnabled = false; 
      },
      hideGlChart(){
        this.glChartEnabled = false; 
      },
      hideReChart(){
        this.reChartEnabled = false; 
      },



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