const { Quizzes } = require('../models');

exports.getAll = (req, res) => {
  let quizzes = [];
  const { userId } = req.query;
  if (!userId) {
    quizzes = Quizzes.findAll();
  } else {
    quizzes = Quizzes.findByUser(userId);
  }
  res.json(quizzes);
};

exports.getPublic = (req, res) => {
  const quizzes = Quizzes.findPublic();
  res.json(quizzes);
};

exports.getAllByUser = (req, res) => {
  const quizzes = Quizzes.filterByUser();
  res.json(quizzes);
};

exports.getOneById = (req, res) => {
  const { id } = req.params;
  const quiz = Quizzes.findByPk(id);
  if (!quiz) {
    res.sendStatus(404);
    return;
  }
  res.json(quiz);
};

exports.createQuiz = (req, res) => {
  const { name, type } = req.body;
  const id = Quizzes.create({ name, type });
  res.json({ id });
};

exports.updateQuiz = (req, res) => {
  const { id } = req.params;
  const updatedQuiz = Quizzes.update(req.body, id);
  res.json(updatedQuiz);
};

exports.deleteQuiz = (req, res) => {
  const { id } = req.params;
  Quizzes.destroy(id);
  res.sendStatus(200);
};
