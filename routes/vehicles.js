const express = require('express');

const router = express.Router();
const vehicleController = require('../controller/vehicle');

router.get('/', vehicleController);

module.exports = router;
