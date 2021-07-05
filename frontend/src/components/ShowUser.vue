
<template>


    <div class="alluser">

        <b-button @click = "showAllUsers">Show Users </b-button>

        

        {{users}}

 <v-footer>

          <p style="color:dimgrey"> 2021 - RoboDoc </p>    


      </v-footer>
    </div>

</template>

<script>

import getUserService from '@/services/UserService'
export default {
    name: 'ShowUser', 
    data(){
        return{
            users: [], 
        }
    }, 
    async showAllUsers (){
        const response = await getUserService.fetchAllUsers;
        this.users = response.users; 

    }

}

</script>

<style scoped>

</style>
