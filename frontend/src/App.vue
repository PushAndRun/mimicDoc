

<template>
  <div id="app">
    
    <router-view @login-User=loginUser @register-Employee=registerEmployee @createPatient=createPatient>
      
    </router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: { 
    
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

    },
    loginUser(registration){
      this.user.username = registration.username
      this.user.password = registration.password
      console.log(JSON.stringify(this.uses));
      alert(JSON.stringify(this.user));
    },
    registerEmployee(registration) {
      this.employee.name = registration.name
      this.employee.email = registration.email
      this.employee.username = registration.username
      this.employee.password = registration.password
      console.log(JSON.stringify(this.employee));
      alert(JSON.stringify(this.employee));

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
      },
      user:{
        username:'',
        password:'',
      },
      employee:{
        name:'',
        email:'',
        username:'',
        password:'',
      }
    }
  }
}
  

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
