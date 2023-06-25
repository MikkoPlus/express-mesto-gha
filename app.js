require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const router = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errors');
const { userDataValidation } = require('./middlewares/celebrateValidation');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '648ab9d9c6251df3263ed9fe',
  };
  next();
});
console.log(process.env['JWT_SECRET']);

app.post('/signin', userDataValidation, login);
app.post('/signup', userDataValidation, createUser);
app.use(cookieParser());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server start on port: ${PORT}`);
});
