class InvalidDataError extends Error {
  constructor(err, msg) {
    super(err);
    this.message = msg || 'Переданы некорректные данные';
    this.statusCode = 400;
  }
}

module.exports = InvalidDataError;
