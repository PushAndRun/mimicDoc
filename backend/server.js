'use strict'

global.__root   = __dirname + '/'; 
const express = require('express')
var logger = require('morgan')


// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// App
const app = express();
const endpointRouter = require('./routes/endpoints').router
const requestRouter = require('./routes/request')

const UserController = require('./routes/user/UserController')
const AuthController = require('./routes/auth/AuthController')
const db = require('./db')

app.use(logger('dev'))
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use('/api',endpointRouter)
app.use('/api/request',requestRouter)
app.get('/', express.static("./static"))

app.use('/api/user',UserController)
app.use('/api/auth',AuthController)

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)