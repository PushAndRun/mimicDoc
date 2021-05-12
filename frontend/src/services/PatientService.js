import axios from 'axios'; 


const url = 'http://localhost:8081/api';

export default {
    createPatient(credentials){
        return axios
            .post(url + '/..../..../', credentials)
         //  .then(response=>response.data); 
    },

    fetchPatients(username){
        return axios
        .get(url + '/.../...' + (username))
       // .then(response => response.data);

    }
}