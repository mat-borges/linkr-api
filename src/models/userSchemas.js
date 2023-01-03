import joi from "joi";

export const authSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().required(),
    password: joi.string().max(70).min(3).required(),
    password_comfirmation: joi.any().equal(joi.ref('password')).required().label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
    image: joi.string().required()
});
export const authSignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().max(70).min(3).required()
});