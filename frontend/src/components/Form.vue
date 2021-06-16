<template>
  <div>
    <b-navbar toggleable="false" type="dark" variant="dark">
      <b-navbar-brand style="color:white">RoboDoc</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse" style="color:white;">
        Menu
    </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link
              style="text-decoration: none; color:white"
              to="/homepage"
              >Homepage</router-link
            ></b-nav-item
          >
          <b-nav-item
            ><router-link
              style="text-decoration: none; color:white "
              to="/patients"
              >View all your Patients
            </router-link></b-nav-item
          >
          <b-nav-item @click="logout"
            ><p style="color:white">Sign Out</p></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <br />

    <b-form id="formular" @submit="submit">
      <br />
      <h2>Patient processing form</h2>
      <br />
      <br />
      <b-row>
        <b-col>
      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          v-model="form.name"
          placeholder="Patient's name"
          required
        ></b-form-input>
      </b-form-group>
        </b-col>
        <b-col>
      <b-input-group id="input-group-3" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.dateOfBirth"
          type="text"
          placeholder="YYYY-MM-DD"
        ></b-form-input>
        <b-input-group-append>
          <b-form-datepicker
            v-model="form.dateOfBirth"
            button-only
            right
            dark="true"
            locale="en-US"
          ></b-form-datepicker>
        </b-input-group-append>
      </b-input-group>
        </b-col>
      </b-row>

      <br />

      <b-form-group
        id="input-group-7"
        label="Patient's gender:"
        label-for="input-7"
        label-class="font-weight-bold"
        required
      >
        <b-form-radio v-model="form.gender" value="M">male</b-form-radio>
        <b-form-radio v-model="form.gender" value="F">female</b-form-radio>
      </b-form-group>
      <b-row>
        <b-col>
      <b-form-group id="input-group-4" label-for="input-4">
        <b-form-input
          id="input-4"
          type="number"
          v-model="form.weight"
          placeholder="Patient's Weight in kg"
          required
        ></b-form-input>
      </b-form-group>
        </b-col>
        <b-col>
      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input
          type="number"
          id="input-5"
          v-model="form.height"
          placeholder="Patient's Height in cm"
          required
        ></b-form-input>
      </b-form-group>
        </b-col>
        <b-col>
      <b-form-group id="input-group-4" label-for="input-tempc">
        <b-form-input
          id="input-tempc"
          type="number"
          v-model="form.tempc_mean"
          placeholder="Mean temperature in C°"
          required
        ></b-form-input>
      </b-form-group>
        </b-col>
      </b-row>
      <br />
      <!-- 
      <b-form-group
        id="input-group-6"
        label="Patient's Bloodtype:"
        label-for="input-6"
      >
        <b-form-select
          id="input-6"
          v-model="form.bloodtype"
          :options="bloodtypes"
        ></b-form-select>
      </b-form-group>
      -->
      <br />

      <b-form-group
        id="input-group-bp"
        label="Patient's Bloodpressure levels:"
        label-class="font-weight-bold"
        label-for="input-bp"
      >
      <b-button @click=activateBp variant="outline-primary" size="sm">{{ minOrMaxBp}}</b-button>
      
      <div v-if=bloodpressureActive>
      <br>
        
      <b-row>
        <b-col>
        <b-form-input
          id="input-bpmean"
          v-model="form.meanbp_mean"
          type="number"
          placeholder="Mean blood pressure"
          required
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-bpmin"
          v-model="form.meanbp_min"
          type="number"
          placeholder="Min blood pressure"
          required
        ></b-form-input>
        </b-col>
        <br>
        <b-col>
        <b-form-input
          id="input-bpmax"
          v-model="form.meanbp_max"
          type="number"
          placeholder="Max blood pressure"
          required
        ></b-form-input>
        </b-col>
        </b-row>
        </div>
      </b-form-group>
      

      <br />
      <b-form-group
        id="input-group-resprate"
        label="Patient's resprate:"
        label-class="font-weight-bold"
        label-for="input-bp"
      >
      <b-button @click=activateRe variant="outline-primary" size="sm">{{ minOrMaxRe}}</b-button>
      <div v-if=resprateActive>
        <br>
      <b-row>
        <b-col>
        <b-form-input
          id="input-respratemean"
          v-model="form.resprate_mean"
          type="number"
          placeholder="Mean resprate"
          required
        ></b-form-input>
        </b-col>
        <br />
        <b-col>
        <b-form-input
          id="input-respratemin"
          v-model="form.resprate_min"
          type="number"
          placeholder="Min resprate"
          required
        ></b-form-input>
        </b-col>
        <br />
        <b-col>
        <b-form-input
          id="input-respratemax"
          v-model="form.resprate_max"
          type="number"
          placeholder="Max resprate"
          required
        ></b-form-input>
        </b-col>
      </b-row>
      </div>
      </b-form-group>
      <br />
      
      <b-form-group
        id="input-group-glucose"
        label="Patient's glucose values:"
        label-class="font-weight-bold"
        label-for="input-bp"
      >
      
      <b-button @click=activateGl variant="outline-primary" size="sm">{{ minOrMaxGl}}</b-button>
      <div v-if=glucoseActive>
        <br>
      <b-row>
        <b-col>
        <b-form-input
          id="input-glucosemean"
          v-model="form.glucose_mean"
          type="number"
          placeholder="Mean glucose value"
          required
        ></b-form-input>
        </b-col>
        <br />
        <b-col>
        <b-form-input
          id="input-glucosemin"
          v-model="form.glucose_min"
          type="number"
          placeholder="Min glucose value"
          required
        ></b-form-input>
        </b-col>
        <br />
        <b-col>
        <b-form-input
          id="input-glucosemax"
          v-model="form.glucose_max"
          type="number"
          placeholder="Max glucose value"
          required
        ></b-form-input>
        </b-col>
      </b-row>
      </div>
      </b-form-group>

      <br />

      <b-form-group
        id="input-group-history"
        label="Patient's history:"
        label-class="font-weight-bold"
        label-for="input-history"
      >
        <vue-bootstrap-typeahead
          v-model="valueHist"
          placeholder="Select Diagnoses"
          :data="this.availableDiagnoses"
          @hit="appendHistory"
        >
        </vue-bootstrap-typeahead>

        Selected Diagnoses for Patient's History:
        {{ form.patient_history.join(", ") }}
      </b-form-group>

      <br />
      <b-form-group
        id="input-group-8"
        label="Patient's diagnoses:"
        label-class="font-weight-bold"
        label-for="input-8"
      >
        <vue-bootstrap-typeahead
          v-model="valueDiag"
          placeholder="Select Diagnoses"
          :data="this.availableDiagnoses"
          @hit="appendDiagnoses"
        >
        </vue-bootstrap-typeahead>

        Selected Diagnoses: {{ form.diagnoses.join(", ") }}
      </b-form-group>

      <b-button
        style="margin-bottom:30px"
        type="submit"
        variant="outline-success"
        >Submit</b-button
      >
    </b-form>

    <v-footer>
      <p style="color:dimgrey">2021 - RoboDoc</p>
    </v-footer>
  </div>
</template>

<script>
import PatientService from "../services/PatientService";
import DiagnosesService from "../services/DiagnosesService";

export default {
  data() {
    return {
      username: "",
      availableDiagnoses: [],
      valueDiag: "",
      valueHist: "",
      defaultBpMean: "120", 
      defaultBpMin:"110",
      defaultBpMax:"130",
      defaultGlMean:"80",
      defaultGlMin:"70",
      defaultGlMax:"90",
      defaultReMean:"18", 
      defaultReMin:"16", 
      defaultReMax:"20",
      bloodpressureActive:false, 
      glucoseActive:false, 
      resprateActive:false, 

    

      form: {
        name: "",
        dateOfBirth: "",
        gender: "",
        weight: "",
        height: "",
        bloodtypes: null,
        meanbp_mean: "",
        meanbp_min: "",
        meanbp_max: "",
        resprate_min: "",
        resprate_max: "",
        resprate_mean: "",
        tempc_mean: "",
        glucose_min: "",
        glucose_max: "",
        glucose_mean: "",
        patient_history: [],
        diagnoses: [],
      },
      bloodtypes: [
        { text: "Unknown", value: null },
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "0+",
        "0-",
      ],
    };
  },

  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/registration");
    }

    this.username = this.$store.getters.getUser.username;

    try {
      const response = await DiagnosesService.fetchDiagnoses();
      this.availableDiagnoses = response;
      this.availableDiagnoses = this.availableDiagnoses
        .map((a) => a.short_title)
        .reduce(function(a, b) {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, []);
      console.log(this.availableDiagnoses);
    } catch (error) {
      console.log("unable to fetch diagnoses from server");
    }
  },
  computed:{
    minOrMaxBp(){
      if(this.bloodpressureActive){
        return "-";
      }else{
        return "+";
      }
    }, 
      minOrMaxGl(){
      if(this.glucoseActive){
        return "-";
      }else{
        return "+";
      }
    }, 
    minOrMaxRe(){
      if(this.resprateActive){
        return "-";
      }else{
        return "+";
      }
    }, 

  },
  methods: {

    activateBp(){
      this.bloodpressureActive=!this.bloodpressureActive; 
    }, 
    activateGl(){
      this.glucoseActive=!this.glucoseActive; 
    }, 
    activateRe(){
      this.resprateActive=!this.resprateActive;
    },

    minimizeBp(){
      this.bloodpressureActive=false;
    },
    minimizeGl(){
      this.glucoseActive=false; 
    }, 
    minimizeRe(){
      this.resprateActive=false;
    },


    logout() {
      this.$router.push("/");
      this.$store.dispatch("logout");
    },

    appendDiagnoses() {
      this.form.diagnoses.push(this.valueDiag);
      this.valueDiag = "";
    },

    appendHistory() {
      this.form.patient_history.push(this.valueHist);
      this.valueHist = "";
    },

    getDiagnoses() {
      return this.availableDiagnoses;
    },

    async submit() {
      if(this.form.meanbp_mean==""){
        this.form.meanbp_mean=this.defaultBpMean
      }
      if(this.form.meanbp_min==""){
        this.form.meanbp_min=this.defaultBpMin
      }
      if(this.form.meanbp_max==""){
        this.form.meanbp_max=this.defaultBpMax
      }

      if(this.form.glucose_min==""){
        this.form.glucose_min=this.defaultGlMin
      }
      if(this.form.glucose_mean==""){
        this.form.glucose_mean=this.defaultGlMean
      }
      if(this.form.glucose_max==""){
        this.form.glucose_max=this.defaultGlMax
      }

      if(this.form.resprate_mean==""){
        this.form.resprate_mean=this.defaultReMean
      }
      if(this.form.resprate_min==""){
        this.form.resprate_min=this.defaultReMin
      }
      if(this.form.resprate_max==""){
        this.form.resprate_max=this.defaultReMax
      }

      try {
        const patientObject = {
          patient: {
            name: this.form.name,
            dateOfBirth: this.form.dateOfBirth,
            gender: this.form.gender,
            weight: this.form.weight,
            height: this.form.height,
            medicalData: {
              bloodtypes: this.form.bloodtypes,
              bloodpressure: {
                mean: this.form.meanbp_mean,
                min: this.form.meanbp_min,
                max: this.form.meanbp_max,
              },
              resprate: {
                min: this.form.resprate_min,
                max: this.form.resprate_max,
                mean: this.form.resprate_mean,
              },
              temperature: {
                mean: this.form.tempc_mean,
              },
              glucose: {
                min: this.form.glucose_min,
                max: this.form.glucose_max,
                mean: this.form.glucose_mean,
              },
              patient_history: this.form.patient_history,
              diagnoses: this.form.diagnoses,
            },
          },
        };
        const response = await PatientService.createPatient(patientObject);
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
      this.$router.push("/homepage");
    },
  },
};
</script>

<style scoped>
#formular {
  margin-left: 50px;
  margin-right: 100px;
}
</style>
