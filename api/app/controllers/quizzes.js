const { Quizzes } = require('../models');

exports.getAll = async (req, res) => {
  const quizzes = await Quizzes.findAll({ where: { userId: req.userId } });
  res.json(quizzes);
};

exports.getPublic = async (req, res) => {
  const quizzes = await Quizzes.findAll({ where: { type: 'public' } });
  res.json(quizzes);
};

exports.getOneById = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quizzes.findByPk(id);
  if (!quiz) {
    res.sendStatus(404);
    return;
  }
  res.json(quiz);
};

exports.createQuiz = async (req, res) => {
  const { name, type } = req.body;
  try {
    const newQuiz = await Quizzes.create({ name, type, userId: req.userId });
    res.json({ id: newQuiz.id });
  } catch (e) {
    const errors = e.errors.map((err) => err.message);
    res.sendStatus(400).json({ errors });
  }
};

exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const [, [updatedQuiz]] = await Quizzes.update(req.body, {
      where: { id },
      returning: true,
    });
    res.json(updatedQuiz);
  } catch (e) {
    const errors = e.errors.map((err) => err.message);
    res.sendStatus(400).json({ errors });
  }
};

exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;
  await Quizzes.destroy({ where: { id } });
  res.sendStatus(200);
};
