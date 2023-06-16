const mongoose = require('mongoose');
const express = require('express');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '648ab9d9c6251df3263ed9fe',
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server start on port: ${PORT}`);
});
