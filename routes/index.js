const router = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res, next) => next(new NotFoundError('Такого метода или URL не существует')));

module.exports = router;
