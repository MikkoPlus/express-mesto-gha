const ERROR_CODE_INVALID_DATA = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_ITERNAL = 500;

const iternalServerError = (res, err) => {
  res.status(ERROR_CODE_ITERNAL).send({
    message: 'Iternal Server Error',
    err: err.message,
    stack: err.stack,
  });
};

const invalidDataError = (res, err, message) => {
  res.status(ERROR_CODE_INVALID_DATA).send({
    message: `${message}`,
    err: err.message,
    stack: err.stack,
  });
};

const notFoundError = (res, err, message) => {
  res.status(ERROR_CODE_NOT_FOUND).send({
    message: `${message}`,
    err: err.message,
    stack: err.stack,
  });
};

module.exports = {
  iternalServerError,
  invalidDataError,
  notFoundError,
};
