const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

const User = require('../models/user');
const { NotFoundError } = require('../errors/errors');

const notFoundError = (message) => new NotFoundError(message);

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('');
    })
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  //Проверяю, есть ли почта и пароль в теле запроса
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: 'Отсутствует почта или пароль' });
    return;
  }
  //Получаю из тела запроса пароль, хеширую при помощи bcrypt
  bcrypt.hash(String(req.body.password), 10).then((hashedPassword) => {
    //Создаю пользователя
    User.create({ ...req.body, password: hashedPassword })
      .then((user) => res.status(201).send(user))
      .catch(next);
  });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    res.status(400).send({ message: 'Отсутствует ссылка на аватар' });
    return;
  }

  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError('');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const { name, about } = req.body;
  if (!name && !about) {
    res.status(400).send({ message: 'Отсутствуют данные' });
    return;
  }

  User.findByIdAndUpdate(
    req.user._id,
    { name: name, about: about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError('');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: 'Отсутствует email или password' });
    return;
  }

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new NotFoundError('');
    })
    .then((user) => {
      bcrypt.compare(String(password), user.password).then((isValidUser) => {
        if (isValidUser) {
          // создал jwt
          const jwt = jsonWebToken.sign(
            {
              _id: user._id,
            },
            process.env['JWT_SECRET'],
            { expiresIn: '7d' }
          );
          // Прикрепил к куке
          res.cookie('jwt', jwt, {
            httpOnly: true,
            sameSite: true,
          });
          res.send({ data: user.toJSON() });
        } else {
          res.status(403).send({ message: 'Неправильный email или пароль' });
        }
      });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserData,
  updateUserAvatar,
  login,
  getUserInfo,
};
