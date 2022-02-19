const express = require('express');
const bodyParser = require('body-parser');
const vehiclesRoutes = require('./routes/vehiclesRoutes');
const app = express();

app.use(bodyParser.json());

app.use('/', vehiclesRoutes);

module.exports = app;

