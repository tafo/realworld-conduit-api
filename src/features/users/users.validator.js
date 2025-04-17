const Joi = require('joi');

const getValidationErrorResponse = (error) => {
  return {
    errors: {
      body: error.details.map(detail => detail.message)
    }
  };
};

const createUserValidator = Joi.object({
  user: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required()
});

const loginUserValidator = Joi.object({
  user: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required()
});

module.exports = {
  getValidationErrorResponse,
  createUserValidator,
  loginUserValidator,
};