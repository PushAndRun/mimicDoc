<template>
 <div  id = "homepage" >
 


    <b-navbar toggleable="false" type="dark" variant="dark">
    <b-navbar-brand style="color:white">RoboDoc</b-navbar-brand>

     <b-navbar-toggle target="navbar-toggle-collapse" style="color:white;">
        Menu
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto" >
          <b-nav-item> <router-link style="text-decoration: none; color:white" to="/form" >Submit new Patient</router-link></b-nav-item>
          <b-nav-item><router-link style="text-decoration: none; color:white " to="/patients">View all your Patients </router-link></b-nav-item>
          <b-nav-item><router-link style="text-decoration: none; color:white " to="/Diagnoses">Get a Diagnosis Suggestion</router-link></b-nav-item>
          
          <b-nav-item  @click="logout"><p style="color:white">Sign Out</p></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
   

        <br>
        <br>
        <br>
        <h1> Hi {{username}} </h1>
        <br>  
        <br>
        <br>
        <br> 
        <p id="text" >
        Here you can create new patients and get an overview of all your patients.<br>
        Use RoboDoc to optimally plan further procedures and make decisions in an easy way.  
        
        <br>  
        <br>
        <br>
        <br>  
        <br>
        <br>
        
        Übersicht<br>
        Anzahl Patienten: {{ numberOfPatients }} <br>
        Anzahl Requests: {{ numberOfRequests }}<br>
        </p>
        <br>  
        <br>
        <br>
        <br>  
        <br>
         <div>

   <GChart type="ColumnChart"
            :data="diagnosesChartData"
            :options="diagnosesChartOptions"
            :settings="{ packages: ['corechart','table'] }"
            />
    </div>
        


      <v-footer>

          <p> 2021 - RoboDoc </p>    


      </v-footer>

        
  </div>  
</template>



<script>
import PatientService from '../services/PatientService'


export default {
    name: 'Homepage',

    data() {
      return {

        numberOfPatients:"",
        numberOfRequests:"",
        username: "",
        allPatients: [],

        diagnosesChartData: [], 
            diagnosesChartOptions:{                
              title:'The 5 most frequent Diagnoses \n',  
              chartArea:{width:"50%",height:"60%"}           
          },
            patients: [], 
            diagnoses: [], 
            diagnosesFrequency: {}, 
            fiveMostFrequentDiagnoses:[]
      }

},

  async created() {

    
        document.title = "RoboDoc"
    
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
    this.username = this.$store.getters.getUser.username;
    this.numberOfPatients = await PatientService.fetchPatients(); 
    this.numberOfPatients = this.numberOfPatients.length; 
    this.allPatients = await PatientService.fetchPatients(); 
    this.numberOfRequests = 0; 
    for(let i = 0; i < this.allPatients.length; i ++ ){
      this.numberOfRequests += this.allPatients[i].requests.length; 
    }
    this.createDiagnosesChart(); 
        

  },

  

  methods: {
      
      logout(){
        this.$store.dispatch('logout'); 
        this.$router.push('/');
      },

         async createDiagnosesChart(){
            this.patients = await PatientService.allPatients(); 
            console.log(this.patients)
            
            for (let i = 0; i < this.patients.length; i++){
                this.diagnoses.push(this.extractDiagnosesFromRequest(this.patients[i].requests));
            }
            var newArr = []; 
            for(let i = 0; i < this.diagnoses.length; i++){
                newArr = newArr.concat(this.diagnoses[i]);
            }
            this.diagnoses = newArr; 
            

            
            this.computeFrequency(this.diagnoses);
           
            let sortable = []; 
            for (var diagnose in this.diagnosesFrequency){
                sortable.push([diagnose, this.diagnosesFrequency[diagnose]])
            }

            sortable.sort(function(a,b){
                return b[1]-a[1];
            }); 
            this.fiveMostFrequentDiagnoses = sortable.slice(0,5);
            console.log(this.fiveMostFrequentDiagnoses)
            

            this.diagnosesChartData = []; 
            this.diagnosesChartData.push(["Diagnose", "Frequency"]); 
            
            for(let i = 0; i < this.fiveMostFrequentDiagnoses.length;i++){
                let diagnose = this.fiveMostFrequentDiagnoses[i][0]; 
                let frequency = this.fiveMostFrequentDiagnoses[i][1];
                this.diagnosesChartData.push([diagnose, frequency]);
            }
            
           
            console.log(this.diagnosesChartData);
            

        },
        
        
        computeFrequency(array) {
    var frequency = {};

    array.forEach(function(value) { frequency[value] = 0; });

    var uniques = array.filter(function(value) {
        return ++frequency[value] == 1;
    });
    this.diagnosesFrequency = frequency; 

    return uniques.sort(function(a, b) {
        return frequency[b] - frequency[a];
    });
},

        extractDiagnosesFromRequest(requestArray){
           let diagnosesArray = []
           for(let i = 0; i < requestArray.length; i++){
            for(let j = 0; j < requestArray[i].diagnoses.length; j ++){
                diagnosesArray.push(requestArray[i].diagnoses[j]); 
            }
            for(let k = 0; k < requestArray[i].patient_history.length;k++){
                diagnosesArray.push(requestArray[i].patient_history[k])
            }
           }

           let uniqueDiagnosesArray = [...new Set(diagnosesArray)]; 

           return uniqueDiagnosesArray;

            
        }
      },

}
</script>
<style scoped>


h1 {
   color: black;
   font-size: 65px;
      margin-top: 5%;
      font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
}



#homepage {
  background-image: url(../assets/blurred-interior-hospital-clinical-with-people-abstract-medical-background_1484-1309.jpeg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#text{
  text-align: left;
   margin-left:20px;
   font-size: 20px;
}




</style>
