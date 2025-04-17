const Joi = require('joi');

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

const updateUserValidator = Joi.object({
  user: Joi.object({
    username: Joi.string().optional(),
    password: Joi.string().optional(),
    bio: Joi.string().optional(),
    image: Joi.string().optional(),
  }).required()
});

module.exports = {
  createUserValidator,
  loginUserValidator,
  updateUserValidator,
};