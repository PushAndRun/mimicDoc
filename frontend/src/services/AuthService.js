import axios from 'axios'; 
import apiURL from '../apiConfig'


export default {
    login(credentials){
        return axios
            .post(apiURL + '/auth/login/', credentials)
            .then(response=>response.data);
    }, 

    signUp(credentials){
        return axios
            .post(apiURL + '/auth/register/',credentials)
            .then(response => response.data);
    },
};
