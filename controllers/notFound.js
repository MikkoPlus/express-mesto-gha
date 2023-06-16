const notFound = (req, res) => {
  res.status(404).send({ message: 'no' });
};

module.exports = notFound;
