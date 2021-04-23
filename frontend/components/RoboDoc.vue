<template>
<div>
  <NavBar></NavBar>

  <Form></Form>
 </div> 
</template>

<script>

import Form from './Form.vue'
import NavBar from './NavBar.vue'

export default {
  name: 'RoboDoc',
  components: { 
    NavBar, 
    Form
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
