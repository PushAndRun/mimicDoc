<template>
    <div>
      
  <b-navbar toggleable="false" type="dark" variant="dark">
    <b-navbar-brand style="color:white">RoboDoc</b-navbar-brand>

     <b-navbar-toggle target="navbar-toggle-collapse" style="color:white;">
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
        label-for= "Type in Symptomes and press Enter">

<vue-bootstrap-typeahead
          v-model="valueSymp"
          placeholder="Select Symptoms"
          :data="this.availableSymptoms"
          @hit="appendSymptoms">


        </vue-bootstrap-typeahead>

        Selected Symptoms: {{ symptoms.join(", ") }}

      </b-form-group>

      

    <b-button @click=getDiagnoses variant="outline-primary">Get Diagnoses predicted by Symptoms</b-button>

    <div v-if="diseasesNotEmpty">
        <br>
        <br>
        <br>
        <div  v-for="disease in diseases" v-bind:key=disease.deseases_long_title>
            Long title: {{ disease.deseases_long_title }} <br>
            Short title: {{ disease.desease_short_title }} <br>
            with Accuracy of <b>{{disease.accuracy}}</b><br><br>
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


        }
    }, 
     async created(){
        console.log("created is invoked")
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



   

    async getDiagnoses(){


      

    

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
        this.diseases = this.diagnoses.deseases;
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

 .id {
        margin-top: 50px;
        margin-left: 150px;
        margin-right: 150px;
        margin-bottom: 150px;
    }

</style>