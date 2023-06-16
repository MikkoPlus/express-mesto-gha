const router = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const notFound = require('../controllers/notFound');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/404', notFound);

module.exports = router;
