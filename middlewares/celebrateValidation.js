const { celebrate, Joi } = require('celebrate');
const urlRegExp = require('../utils/regexp');

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegExp),
  }),
});
const userDataValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegExp),
  }),
});

module.exports = {
  createCardValidation,
  userDataValidation,
};
