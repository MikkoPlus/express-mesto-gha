const User = require('../models/user');
const {
  iternalServerError,
  invalidDataError,
  notFoundError,
} = require('../errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      iternalServerError(res);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        notFoundError(res, 'Пользователь по указанному _id не найден.');
        return;
      }
      if (err.stack.includes('CastError')) {
        invalidDataError(res, 'Передан некорректный _id пользователя');
        return;
      }
      iternalServerError(res);
    });
};

const createUser = (req, res) => {
  console.log(req.body)
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        invalidDataError(
          res,
          err,
          'Переданы некорректные данные при создании пользователя.',
        );
        return;
      }
      iternalServerError(res);
    });
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Not found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'Not found') {
        notFoundError(res, 'Пользователь с указанным _id не найден');
        return;
      }
      if (err.name === 'ValidationError') {
        invalidDataError(
          res,
          'Переданы некорректные данные при обновлении аватара.',
        );
        return;
      }
      iternalServerError(res);
    });
};

const updateUserData = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Not found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'Not found') {
        notFoundError(res, 'Пользователь с указанным _id не найден.');
        return;
      }
      if (err.name === 'ValidationError') {
        invalidDataError(
          res,
          'Переданы некорректные данные при обновлении профиля.',
        );
        return;
      }
      iternalServerError(res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserData,
  updateUserAvatar,
};
