import axios from 'axios';



const url = 'api';




export default {
    fetchDiagnoses(){

        return axios
            .get(url + '/diagnoses')
            .then(response=>response.data);

    }
}