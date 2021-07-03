import axios from 'axios';



const url = '/api';




export default {
    fetchDiagnoses(){

        return axios
            .get(url + '/getdiagnoses')
            .then(response=>response.data);

    },

    fetchSymptoms(){

        return axios
            .get(url + '/getsymptoms')
            .then(response=>response.data);
        
    },

    getDiagnosesFromSymptoms(symptoms){
        console.log(symptoms)

        return axios
            .post(url + '/symptoms', symptoms)
            .then(response=>response.data);
    }
}
