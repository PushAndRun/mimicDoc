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

app.use(logger('dev'))
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use('/',endpointRouter)
app.use('/request',requestRouter)
app.get('/', express.static("./static"))


app.get('/stay_prognose', (req, res, next) => {
  res.send("Thank you, next!");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)