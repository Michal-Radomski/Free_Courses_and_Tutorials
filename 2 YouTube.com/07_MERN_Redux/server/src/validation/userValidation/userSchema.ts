import Joi from "joi";

export const userSchema = {
  signupUser: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  }),
  signinUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  }),
  // sendVerificationMail: Joi.object({
  //   email: Joi.string().email().required(),
  // }),
  // verifyUserMail: Joi.object({
  //   token: Joi.string().required(),
  // }),
  // sendForgotPasswordMail: Joi.object({
  //   email: Joi.string().email().required(),
  // }),
  // verifyForgotMail: Joi.object({
  //   token: Joi.string().required(),
  //   password: Joi.string().required(),
  // }),
};
