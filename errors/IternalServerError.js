class IternalServerError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Произошла ошибка сервера';
    this.statusCode = 500;
  }
}

module.exports = IternalServerError;
