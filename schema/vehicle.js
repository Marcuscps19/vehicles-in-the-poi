const Joi = require('joi').extend(require('@joi/date'));

const vehicleSchema = Joi.object({
  datetime: Joi
    .date()
    .format('YYYY-MM-DD')
    .allow('')
    .optional()
    .error(() => (new Error('Data inválida'))),
  plate: Joi
    .string()
    .allow('')
    .optional()
    .error(() => (new Error('Placa inválida'))),
});

module.exports = vehicleSchema;
