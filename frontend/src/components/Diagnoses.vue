<template>
  <div>
    <b-navbar toggleable="false" type="dark" variant="dark">
      <b-navbar-brand style="color: white">RoboDoc</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse" style="color: white">
        Menu
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto" >
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/homepage" >Homepage</router-link></b-nav-item>
          <b-nav-item><router-link style="text-decoration: none; color:white " to="/patients">View all your Patients </router-link></b-nav-item>
          <b-nav-item><router-link style="text-decoration: none; color:white " to="/form">Submit new Patient</router-link></b-nav-item>
          
          <b-nav-item  @click="logout"><p style="color:white">Sign Out</p></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

        <br>
        <br>
        <br>
        <h2>Diagnosis suggestion</h2>
        <br>
        Here you can have diagnoses suggested based on your patient's symptoms

        <br>
        <br>
        <br>

  <b-form-group size="mg" class="id"
        id="input-group-8"
        label="Patient's symptoms:"
        label-class="font-weight-bold"
        label-for= "Type in Symptomes and press Enter"
        required
        >

<vue-bootstrap-typeahead
          v-model="valueSymp"
          placeholder="Select Symptoms"
          :data="this.availableSymptoms"
          @hit="appendSymptoms"
          required
          >


        </vue-bootstrap-typeahead>

        Selected Symptoms: {{ symptoms.join(", ") }}

      </b-form-group>

      

    <b-button @click=getDiagnoses variant="outline-primary">Get Diagnoses predicted by Symptoms</b-button>
    <div v-if="symptomsEmpty">

        <br>
        <br>

      
      <p> <b>Please insert symptoms</b></p>
      </div>

      <div v-if="mlScriptRunning()">

        <br>
        <br>
          
      
      <p id="RunningML"> <b>ML Script is Running ...</b></p>
      </div>

      <div v-if="mlScriptDone()">
        <br>
        <br>
        <p id="DoneML"> ML Script is Done</p>

      </div>

    <div v-if="mlScriptDone()">
      <br />
      <br />
      <p id="DoneML">ML Script is Done</p>
    </div>

    <div v-if="diseasesNotEmpty" class="container">
      <div v-for="disease in diseases" v-bind:key="disease.disease" class="card">
        <!-- <b> Disease:  </b>{{ disease.disease }} <br>
            <b> Summary: </b>{{ disease.summary}} <br>
            <b> Source: </b>{{ disease.source }} <br>
             with Accuracy of <b>{{disease.accuracy}}</b>  <br><br> -->
        <div class="code">{{ disease.mcId }}</div>
        <div class="title">{{ disease.disease }}</div>
        <div class="summary">
          {{ disease.summary}}
        </div>
        <div class="source">~{{ disease.source }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DiagnosesService from "../services/DiagnosesService"
export default {
    name:"Diagnoses",
    data(){
        return{
            symptoms:[],
            symptomCodes:[], 
            diagnoses:{},
            requestInvoked:false,
            diseases:[],
            valueSymp:'',
            availableSymptoms: [],
            allSymptoms: [],
            mlScriptInvoked: false, 
            symptomsEmpty: false, 


        }
    }, 
     async created(){

        
        document.title = "RoboDoc"
    
       

        console.log("created is invoked",this.mlScriptRunning())
          try {
      const response = await DiagnosesService.fetchSymptoms();
      this.availableSymptoms = response;
      this.allSymptoms = response;
      this.availableSymptoms = this.availableSymptoms
        .map((a) => a.short_title)
        .reduce(function(a, b) {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, []);
      console.log(this.availableSymptoms);
    } catch (error) {
      console.log("unable to fetch symptoms from server");
    }

    },

    methods:{
       logout(){
        this.$store.dispatch('logout'); 
        this.$router.push('/');
      },

      mlScriptRunning(){
        if(this.mlScriptInvoked&&this.diseases.length==0)return true; 
        else 
        return false; 
          
      },
      mlScriptDone(){
        if(this.mlScriptInvoked&&this.diseases.length>0)return true; 
        else return false; 
      },

      




   

    async getDiagnoses(){


      if(this.symptoms.length == 0) {
        this.symptomsEmpty = true;
        return
      } else {
        this.symptomsEmpty = false;
      }


      this.mlScriptInvoked=true; 

    

    for (var j=0; j<this.symptoms.length; j++){
        for (var i=0; i<this.allSymptoms.length; i++) {
            for (var x in this.allSymptoms[i]) {
                    if(this.symptoms[j] == this.allSymptoms[i][x]) {
                        this.symptoms[j] = this.allSymptoms[i].icd9_code
                        
                        
                    }
            }
        }

     }
    
      

         let data = {
             symptoms : this.symptoms
         }
       
         this.diagnoses = await DiagnosesService.getDiagnosesFromSymptoms(data);

        console.log(this.diagnoses);
        this.diseases = this.diagnoses;
        console.log(this.diseases);

        this.requestInvoked=true;
       
    }, 
    

    diseasesNotEmpty(){
        return this.diseases.length>0;
    },

    getSymptoms() {
        return this.availableSymptoms;
    },

     appendSymptoms() {
      this.symptoms.push(this.valueSymp);
      this.valueSymp = "";
    },


},
computed:{

},

}
</script>


<style scoped>
#RunningML {
  color: tomato;
}
#DoneML {
  color: green;
}

.id {
  margin-top: 50px;
  margin-left: 150px;
  margin-right: 150px;
  margin-bottom: 150px;
}
/*  disease card code */
body,
html {
  margin: 0;
  background: whitesmoke;
}

.container {
  display: grid;
  font-family: monospace;
  gap: 2%;
  /*grid-template-columns: 1fr 1fr;*/
  padding: 5%;
}

.card {
  background-color: white;
  display: grid;
  grid-template-areas:
    "code title"
    "summary summary"
    "source footer";
  grid-template-columns: 1fr 6fr;
  grid-template-rows: 1fr auto 1fr;
  gap: 5px;
  align-items: center;
  padding: 2%;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 12px;
}

.card_header {
  display: flex;
  flex-direction: row;
}

.code {
  grid-area: code;
  font-size: 1.5em;
  font-weight: bold;
}

.title {
  grid-area: title;
  font-size: 1.5em;
  text-transform: uppercase;
  font-variant: small-caps;
}

.summary {
  grid-area: summary;
}

</style>
