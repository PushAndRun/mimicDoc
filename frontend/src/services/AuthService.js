import axios from 'axios'; 

const url = '/api';

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

    isAdmin(){
        return axios
            .get(url + '/auth/isAdmin')
            .then(response=>response.data);
    }
};
