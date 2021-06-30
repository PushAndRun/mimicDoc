'use strict'

global.__root   = __dirname + '/'; 
const express = require('express')
const logger = require('morgan');
const cors = require('cors')


// Constants
const PORT = process.env.PORT || 8081
const HOST = process.env.HOST || '0.0.0.0'

// App
const app = express();
const endpointRouter = require('./routes/endpoints').router
const requestRouter = require('./routes/request/request')
const symptomsRouter = require('./routes/request/symptoms')
// db and user management
const UserController = require('./routes/user/UserController')
const PatientController = require('./routes/patients/PatientController')
// authentication encryption and json betokens
const AuthController = require('./routes/auth/AuthController')
// mongoose db connection
const db = require('./db')

app.use(cors())
app.use(logger('dev'))
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use('/api',endpointRouter)
app.use('/api/request',requestRouter)
app.use('/api/symptoms',symptomsRouter)
app.get('/', express.static("./static"))

app.use('/api/user',UserController)
app.use('/api/auth',AuthController)
app.use('/api/patients',PatientController)

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)