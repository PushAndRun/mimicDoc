import Vue from 'vue'
import Router from 'vue-router'
import Form from '../components/Form'
import Registration from '../components/Registration'
import Patients from '../components/Patients'
import Homepage from '../components/Homepage'

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
        }, 
        {
        path: '/patients', 
        name:'Patients', 
        component:Patients
        }, 
        {
        path:'/homepage',
        name:'Homepage',
        component: Homepage
        }
    ]
})
