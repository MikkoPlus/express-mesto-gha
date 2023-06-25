const { celebrate, Joi } = require('celebrate');
const  urlRegExp  = require('../utils/regexp');

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).max(30).regex(urlRegExp)
  }),
});
const userDataValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30).email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).regex(urlRegExp),
  }),
});

module.exports = {
  createCardValidation,
  userDataValidation,
};
