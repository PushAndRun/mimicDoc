import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'
import Registration from '@/components/Registration'

Vue.use(Router)

export default new Router ({
    routes:[
        {
        path: '/form',
        name: 'Form',
        component: Form 
        }, 
        {
        path: '/' ,
        name: 'Registration', 
        component: Registration
        }
    ]
})