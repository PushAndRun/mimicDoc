'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', express.static("./static"));

app.get('/stay_prognose', (req, res, next) => {
  res.send("Thank you, next!");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);