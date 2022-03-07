const express = require('express');

const router = express.Router();
const vehicleController = require('../controller/vehicle');
const { validatePayload } = require('../middleware/vehicle');

router.get('/', validatePayload, vehicleController);

module.exports = router;
