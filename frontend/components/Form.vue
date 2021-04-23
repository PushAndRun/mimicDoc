<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        
        
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group 
      id="input-group-2" 
      label="Your Name:"
      label-for="input-2"
      >
      
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

       <b-form-group 
      id="input-group-3" 
      label="Your Age:" 
      label-for="input-3">
        <b-form-datepicker
          id="input-3"
          v-model="form.age"
          placeholder="Enter your birthday"
          required
        ></b-form-datepicker>
      </b-form-group>

       <b-form-group 
      id="input-group-4" 
      label="Your Weight:" 
      label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.weight"
          placeholder="Enter weight"
          required
        ></b-form-input>
      </b-form-group>


      <b-form-group 
      id="input-group-5" 
      label="Your Height:" 
      label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.weight"
          placeholder="Enter height"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Please choose your Bloodtype:" label-for="input-6">
        <b-form-select
          id="input-6"
          v-model="form.bloodtype"
          :options="bloodtypes"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-7" v-slot="{ ariaDescribedby }" label="Please choose your gender:" label-for="input-7">
        <b-form-checkbox-group
          v-model="form.selected"
          :options="options"
          id="checkboxes-7"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="male">male</b-form-checkbox>
          <b-form-checkbox value="female">female</b-form-checkbox>
          <b-form-checkbox value="deverse">deverse</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="success">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    
  </div>
</template>

<script>
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
      }
    },

    data() {
      return {
        form: {
          email: '',
          name: '',
          age: '',
          weight: '',
          height: '',
          bloodtypes: null,
          selected: [],
           options: [
          { text: 'male', value: 'male' },
          { text: 'female', value: 'female' },
          { text: 'deverse', value: 'diverse' }
        ]
        },
        bloodtypes: [{ text: 'Unknown', value: null }, 'A+', 'A-', 'B+', 'B-' , 'AB+' , 'AB-' , '0+' , '0-'],
        
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.age = ''
        this.form.weight = ''
        this.form.height = ''
        this.form.bloodtype = null
        this.form.gender = []
       
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

</style>
