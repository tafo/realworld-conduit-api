const Joi = require('joi');

const createUserValidator = Joi.object({
  user: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required()
});

module.exports = {
  createUserValidator,
};