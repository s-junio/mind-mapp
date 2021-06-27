//Validations
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

const updateValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    avatar: Joi.string(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
