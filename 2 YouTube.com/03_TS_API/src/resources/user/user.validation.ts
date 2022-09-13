import Joi from 'joi';

const register = Joi.object({
  name: Joi.string().max(30).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(8).required()
});

const login = Joi.object({
  email: Joi.string().required(),

  password: Joi.string().required()
});

export default {register, login};
