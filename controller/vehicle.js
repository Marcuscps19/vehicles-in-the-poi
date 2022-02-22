const vehicleServices = require('../service/vehicle');

const vehicleController = async (req, res, _next) => {
  const { datetime, plate } = req.body;
  try {
    const response = await vehicleServices(datetime, plate);
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = vehicleController;
