import axios from 'axios'

import apiURL from '../apiConfig'

export default {

    fetchAllUsers () {
        return axios
                .get(apiURL + '/user/')
                .then(response => response.data);  

    },

    fetchSingleUser(id) {
        axios 
        .get(apiURL + '/user/' + id)
        .then(response => response.data); 
    },

    deleteUser(id){
        return axios
        .delete(apiURL + '/user/id/' + id)
        .then(response => response.data)
    }

}
