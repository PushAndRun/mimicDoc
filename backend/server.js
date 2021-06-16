'use strict'

const express = require('express')
var logger = require('morgan')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// App
const app = express();
const endpointRouter = require('./routes/endpoints').router
const requestRouter = require('./routes/request')
const usertRouter = require('./routes/user_management.js')

app.use(logger('dev'))
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use('/',endpointRouter)
app.use('/request',requestRouter)
app.use('/user',requestRouter)
app.get('/', express.static("./static"))

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)