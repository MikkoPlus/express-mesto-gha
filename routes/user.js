const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.patch('/me', updateUserData);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
