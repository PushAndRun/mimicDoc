import axios from 'axios';



const url = 'http://localhost:8081/api';




export default {
    fetchDiagnoses(){

        return axios
            .get(url + '/diagnoses')
            .then(response=>response.data);

    }
}
