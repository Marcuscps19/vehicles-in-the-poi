const express = require('express');
const bodyParser = require('body-parser');
const vehiclesRoutes = require('./routes/vehicles');

const app = express();

app.use(bodyParser.json());

app.use('/', vehiclesRoutes);

module.exports = app;
