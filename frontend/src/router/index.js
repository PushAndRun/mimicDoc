import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'
import Registration from '@/components/Registration'
import Patients from '@/components/Patients'

Vue.use(Router)

export default new Router ({
    routes:[
        {
        path: '/form',
        name: 'Form',
        component: Form 
        }, 
        {
        path: '/registration' ,
        name: 'Registration', 
        component: Registration
        }, 
        {
            path: '/patients', 
            name:'patients', 
            component:Patients
        }
    ]
})