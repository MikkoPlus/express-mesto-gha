const NotFoundError = require('./NotFoundError');
const IternalServerError = require('./IternalServerError');
const UnauthorizedError = require('./UnauthorizedError');
const InvalidDataError = require('./InvalidDataError');
const EmailIsExistsError = require('./EmailIsExistsError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  NotFoundError,
  IternalServerError,
  UnauthorizedError,
  InvalidDataError,
  EmailIsExistsError,
  ForbiddenError,
};
