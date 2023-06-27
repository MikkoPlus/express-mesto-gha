const router = require('express').Router();
const {
  createCardValidation,
  checkId,
} = require('../middlewares/celebrateValidation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', checkId, deleteCard);
router.put('/:cardId/likes', checkId, likeCard);
router.delete('/:cardId/likes', checkId, dislikeCard);

module.exports = router;
