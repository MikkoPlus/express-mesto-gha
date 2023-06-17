const notFound = (req, res) => {
  res.status(404).send({ message: 'incorrect url' });
};

module.exports = notFound;
