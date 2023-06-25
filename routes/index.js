const router = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const notFound = require('../controllers/notFound');
const auth = require('../middlewares/auth');

router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', notFound);


module.exports = router;
