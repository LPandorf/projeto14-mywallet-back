import joi from 'joi';

const singUpFormat= joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

const singInFormat= joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export {singUpFormat, singInFormat};