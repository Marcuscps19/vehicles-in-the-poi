const express = require('express');
const router = express.Router();
const vehicleController = require('../controller/vehicleController');
const {validatePayload} = require('../middleware/vehicles');

router.get('/', validatePayload, vehicleController);

module.exports = router;