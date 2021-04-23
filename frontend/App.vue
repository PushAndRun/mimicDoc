<template>
  <div id="app">
    <RoboDoc></RoboDoc>
  </div>
</template>

<script>
import RoboDoc from './components/RoboDoc.vue'

export default {
  name: 'App',
  components: {
    RoboDoc
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
