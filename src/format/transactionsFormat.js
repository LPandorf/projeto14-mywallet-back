import joi from 'joi';

const transactionsFormat = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().required()
});

export {transactionsFormat};