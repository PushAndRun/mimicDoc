<template>
  <div class = "roboDoc">
  <NavBar></NavBar>

  <Form @create-Patient=createPatient></Form>
  </div>
</template>

<script>

import Form from './Form.vue'
import NavBar from './NavBar.vue'

export default {
  
  components: { 
    NavBar, 
    Form
    },
  name: 'RoboDoc',
  props: {
    msg: String
  },
  methods:{
    createPatient(form){
      
      /*Patient Objekt wird in der Ebene RoboDoc erstellt, dieser kann zur höheren Ebene App.vue weitergeleitet werden und dort mittels http an den Server gesendet werden*/ 
      this.patient.name = form.name; 
      this.patient.gender = form.gender;
      let currentDate = new Date(); 
      this.patient.age = currentDate.getFullYear() - form.age.substring(0,4);
      this.patient.weight = form.weight; 
      this.patient.height = form.height; 
      this.patient.email = form.email; 
      this.patient.diagnoses = form.diagnoses; 
      this.patient.bloodtype = form.bloodtype; 
      this.patient.bmi = (form.weight) / ((form.height/100) * (form.height/100));
      console.log(JSON.stringify(this.patient));
      alert(JSON.stringify(this.patient));

    }
  },
  data() {
    return {
      patient:{
        name:'', 
        gender:'', 
        age:'', 
        weight:'', 
        height:'', 
        email:'', 
        diagnoses:'', 
        bloodtype:[], 
        bmi:''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
