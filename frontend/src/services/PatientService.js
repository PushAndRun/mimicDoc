import axios from 'axios';
import store from '../store.js'
import apiURL from '../apiConfig'





axios.defaults.headers.common['x-access-token'] = store.state.token; 


export default {
    createPatient(patient){
        console.log(store.state.token);
        return axios
            .post(apiURL + '/request', patient)
            //.then(response=>response.data);
            
    },

    async fetchPatients(){
        return axios
        .get(apiURL + "/patients/getPatientsByUser")
        .then(response => response.data);

    },

    async fetchSinglePatient(id){
        return axios
        .get (apiURL + "/patients/id/" + id)
        .then(response => response.data); 
    },

    async allPatients(){
        return axios
        .get(apiURL + "/patients")
        .then(response => response.data);

    },
}
