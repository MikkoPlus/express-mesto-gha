const notFound = (req, res) => {
  res.status(404).send({ message: '' });
};

module.exports = notFound;
