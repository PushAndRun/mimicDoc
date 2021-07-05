import axios from 'axios'

const url = '/api';

export default {

    fetchAllUsers () {
        return axios
                .get(url + '/user/')
                .then(response => response.data);  

    },

    fetchSingleUser(id) {
        axios 
        .get(url + '/user/' + id)
        .then(response => response.data); 
    },

    deleteUser(id){
        return axios
        .delete(url + '/user/id/' + id)
        .then(response => response.data)
    },
    getUserByUsername(username){
        return axios
        .get(url + '/user/username/' + username)
        .then(response=>response.data)
    }

}
