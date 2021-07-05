import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import store from './store'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import GoogleCharts from 'vue-google-charts'
import { BIcon, BIconExclamationCircle} from 'bootstrap-vue'

Vue.component('BIcon', BIcon)
Vue.component('BIconExclamationCircle', BIconExclamationCircle)

Vue.use(GoogleCharts)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)


// set auth header 
Axios.defaults.headers.common['Authorization'] = `Bearer${store.state.token}`;

new Vue({
  VueBootstrapTypeahead,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
