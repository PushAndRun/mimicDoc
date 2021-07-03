import axios from 'axios';
import store from '../store.js'




const url = '/api';

axios.defaults.headers.common['x-access-token'] = store.state.token; 


export default {
    createPatient(patient){
        console.log(store.state.token);
        return axios
            .post(url + '/request', patient)
            //.then(response=>response.data);
            
    },

    async fetchPatients(){
        return axios
        .get(url + "/patients/getPatientsByUser")
        .then(response => response.data);

    },

    async fetchSinglePatient(id){
        return axios
        .get (url + "/patients/id/" + id)
        .then(response => response.data); 
    },

    async allPatients(){
        return axios
        .get(url + "/patients")
        .then(response => response.data);

    },
}
