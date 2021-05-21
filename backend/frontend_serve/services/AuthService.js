import axios from 'axios'; 

const url = 'http://localhost:8081/api';

export default {
    login(credentials){
        return axios
            .post(url + '/auth/login/', credentials)
            .then(response=>response.data);
    }, 

    signUp(credentials){
        return axios
            .post(url + '/auth/register/',credentials)
            .then(response => response.data);
    },
};
