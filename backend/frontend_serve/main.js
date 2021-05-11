import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)


// set auth header 
Axios.defaults.headers.common['Authorization'] = `Bearer${store.state.token}`;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
