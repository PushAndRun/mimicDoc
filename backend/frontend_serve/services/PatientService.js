import axios from 'axios';
import store from '../store.js'




const url = 'http://localhost:8081/api';

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

    }
}