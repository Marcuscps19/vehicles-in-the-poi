const vehicleSchema = require('../schema/vehicle');

const validatePayload = (req, _res, next) => {
  const { date, plate } = req.body;
  const { error } = vehicleSchema.validate({ date, plate });
  if (error) {
    return next({ message: error.message, statusCode: 400 });
  }
  return next();
};

module.exports = { validatePayload };
