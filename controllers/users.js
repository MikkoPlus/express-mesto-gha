const User = require('../models/user');
const {
  iternalServerError,
  invalidDataError,
  notFoundError,
} = require('../errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      iternalServerError(res, err);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        notFoundError(res, err, 'Пользователь по указанному _id не найден.');
        return;
      }
      iternalServerError(res, err);
    });
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        invalidDataError(
          res,
          err,
          'Переданы некорректные данные при создании пользователя.',
        );
        return;
      }
      iternalServerError(res, err);
    });
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.message === 'Not found') {
        notFoundError(res, err, 'Пользователь с указанным _id не найден');
        return;
      }
      if (err.message.includes('Validation failed')) {
        invalidDataError(
          res,
          err,
          'Переданы некорректные данные при обновлении аватара.',
        );
        return;
      }
      iternalServerError(res, err);
    });
};

const updateUserData = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.message === 'Not found') {
        notFoundError(res, err, 'Пользователь с указанным _id не найден.');
        return;
      }
      if (err.message.includes('Validation failed')) {
        invalidDataError(
          res,
          err,
          'Переданы некорректные данные при обновлении профиля.',
        );
        return;
      }
      iternalServerError(res, err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserData,
  updateUserAvatar,
};
