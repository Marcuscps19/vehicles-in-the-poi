const express = require('express');
const bodyParser = require('body-parser');
const vehiclesRoutes = require('./routes/vehicles');
const errors = require('./middleware/error');

const app = express();

app.use(bodyParser.json());

app.use('/', vehiclesRoutes);

app.use(errors);

module.exports = app;
