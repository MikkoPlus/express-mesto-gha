const Card = require('../models/card');
const {
  iternalServerError,
  invalidDataError,
  notFoundError,
} = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      iternalServerError(res, err);
    });
};

const createCard = (req, res) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((cards) => res.status(201).send(cards))
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        invalidDataError(
          res,
          err,
          'Переданы некорректные данные при создании карточки.',
        );
        return;
      }
      iternalServerError(res, err);
    });
};

const deleteCard = (req, res) => {
  Card.deleteOne({ _id: req.params.cardId })
    .orFail(() => new Error('Not found'))
    .then(() => res.status(200).send({ message: 'Card is delete' }))
    .catch((err) => {
      if (err.message === 'Not found') {
        notFoundError(res, err, 'Карточка с указанным _id не найдена.');
        return;
      }
      iternalServerError(res, err);
    });
};

const likeCard = async (req, res) => {
  const { _id } = req.user;
  try {
    const oldCard = await Card.findById(req.params.cardId);

    if (!oldCard) {
      throw new Error('Not found');
    } else if (oldCard.likes.includes(_id)) {
      throw new Error('Invalid data');
    }

    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: _id } },
      { new: true },
    );

    res.status(200).send(card);
  } catch (err) {
    if (err.message === 'Not found') {
      notFoundError(res, err, 'Передан несуществующий _id карточки');
      return;
    }
    if (err.message === 'Invalid data') {
      invalidDataError(
        res,
        err,
        'Переданы некорректные данные для постановки лайка',
      );
      return;
    }
    iternalServerError(res, err);
  }
};

const dislikeCard = async (req, res) => {
  const { _id } = req.user;
  try {
    const oldCard = await Card.findById(req.params.cardId);

    if (!oldCard) {
      throw new Error('Not found');
    } else if (!oldCard.likes.includes(_id)) {
      throw new Error('Invalid data');
    }

    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    res.status(200).send(card);
  } catch (err) {
    if (err.message === 'Not found') {
      notFoundError(res, err, 'Передан несуществующий _id карточки');
      return;
    }
    if (err.message === 'Invalid data') {
      invalidDataError(
        res,
        err,
        'Переданы некорректные данные для снятия лайка',
      );
      return;
    }
    iternalServerError(res, err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
