const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');
const { userProfileValidation } = require('../middlewares/celebrateValidation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', getUserById);
router.patch('/me', userProfileValidation, updateUserData);
router.patch('/me/avatar', userProfileValidation, updateUserAvatar);

module.exports = router;
