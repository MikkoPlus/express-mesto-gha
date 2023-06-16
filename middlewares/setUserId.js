const setUserId = (req, res, next) => {
  req.user = {
    _id: '648ab9d9c6251df3263ed9fe',
  };
  next();
};

module.exports = setUserId;
