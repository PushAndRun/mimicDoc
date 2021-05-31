import axios from 'axios'

const url = 'http://localhost:8081/api';

export default {

    fetchAllUsers () {
        return axios
                .get(url + '/user/')
                .then(response => response.data);  

    },

    fetchSingleUser (id) {
        axios 
        .get(url + '/user/' + id)
        .then(response => response.data); 
    }

}