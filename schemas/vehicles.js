const joi = require('joi');

const vehiclesSchema = joi.object({
    datetime: joi
        .date()
        .allow('')
        .error(() => (new Error('Placa inválida'))),
    plate: joi
        .string()
        .allow('')
        .error(() => (new Error('Placa inválida'))),
});

module.exports = vehiclesSchema;