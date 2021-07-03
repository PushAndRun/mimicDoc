import Vue from 'vue'
import Router from 'vue-router'
import Form from '../components/Form'
import Registration from '../components/Registration'
import Patients from '../components/Patients'
import Homepage from '../components/Homepage'
import AdminHome from '../components/AdminHome'
import UserManagement from '../components/UserManagement'
import AllPatients from '../components/AllPatients'
import SinglePatient from '../components/SinglePatient'
import Diagnoses from '../components/Diagnoses'


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
        }, 
        
        {
        path:'/adminHome',
        name:'adminHome', 
        component: AdminHome
        }, 
        {
        path:'/userManagement', 
        name: 'userManagement', 
        component:UserManagement
        }, 
        {
        path:'/allPatients',
        name: 'AllPatients', 
        component:AllPatients
        }, 
        {
        path:"/singlePatient", 
        name: "SinglePatient", 
        component:SinglePatient
        },
        {
        path:"/diagnoses", 
        name: "Diagnoses", 
        component:Diagnoses
        }
    ]
})

