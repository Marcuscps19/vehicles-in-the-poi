const vehiclesSchema = require('../schemas/vehicles');

const validatePayload = (req, _res, next) => {
  const { datetime='', plate='' } = req.body;
  const { error } = vehiclesSchema.validate({ datetime, plate });
  if (error) {
    return next({ message: error.message, statusCode: 400 });
  }
  return next();
};

module.exports = { validatePayload };
