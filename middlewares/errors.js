const {
  NotFoundError,
  IternalServerError,
  UnauthorizedError,
  InvalidDataError,
  EmailIsExistsError,
  ForbiddenError,
} = require('../errors/errors');

const errorHandler = (err, req, res, next) => {
  let error;
  console.log(err)
  const reqDirectoryPath = req.path.split('/')[1];
  if (err.name === 'JsonWebTokenError') {
    error = new UnauthorizedError(err);
  } else if (err instanceof NotFoundError || err.statusCode === 404) {
    error = new NotFoundError(err);
    if (reqDirectoryPath === 'users') {
      error.message = 'Пользователь с таким _id не найден';
    } else if (reqDirectoryPath === 'cards') {
      error.message = 'Карточка с таким _id не найдена';
    }
  } else if (
    err.name === 'ValidationError' ||
    err.name === 'CastError' ||
    err.statusCode === 400
  ) {
    error = new InvalidDataError(err);
  } else if (err instanceof ForbiddenError) {
    error = new ForbiddenError(err);
  } else if (err.code === 11000) {
    error = new EmailIsExistsError(err);
  } else {
    error = new IternalServerError(err);
  }
  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
