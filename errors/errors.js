const ERROR_CODE_INVALID_DATA = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_ITERNAL = 500;

const iternalServerError = (res) => {
  res.status(ERROR_CODE_ITERNAL).send({
    message: 'Iternal Server Error',
  });
};

const invalidDataError = (res, message) => {
  res.status(ERROR_CODE_INVALID_DATA).send({
    message: `${message}`,
  });
};

const notFoundError = (res, message) => {
  res.status(ERROR_CODE_NOT_FOUND).send({
    message: `${message}`,
  });
};

module.exports = {
  iternalServerError,
  invalidDataError,
  notFoundError,
};
