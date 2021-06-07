import axios from 'axios';



import apiURL from '../apiConfig'




export default {
    fetchDiagnoses(){

        return axios
            .get(apiURL + '/diagnoses')
            .then(response=>response.data);

    }
}
