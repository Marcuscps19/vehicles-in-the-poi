const express = require('express');
const bodyParser = require('body-parser');
const error = require('./middleware/error');
const vehiclesRoutes = require('./routes/vehiclesRoutes');
const app = express();

app.use(bodyParser.json());

app.use('/', vehiclesRoutes);

app.use(error);
module.exports = app;

