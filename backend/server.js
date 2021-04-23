'use strict'

const express = require('express')
var logger = require('morgan')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// App
const app = express();
const endpointRouter = require('./routes/endpoints')

app.use(logger('dev'))

app.use('/',endpointRouter)
app.get('/', express.static("./static"))

app.get('/stay_prognose', (req, res, next) => {
  res.send("Thank you, next!");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)