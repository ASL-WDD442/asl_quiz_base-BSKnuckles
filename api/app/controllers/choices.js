const { Choices } = require('../models');

exports.getQuestionChoices = async (req, res) => {
  const { questionId } = req.query;
  const questionChoices = await Choices.findAll({ where: { questionId } });
  res.json(questionChoices);
};

exports.getOneById = async (req, res) => {
  const { id } = req.params;
  const choice = await Choices.findByPk(id);
  if (!choice) {
    res.sendStatus(404);
    return;
  }
  res.json(choice);
};

exports.createChoice = async (req, res) => {
  const { value, type, questionId } = req.body;
  try {
    const newChoice = await Choices.create({ value, type, questionId });
    res.json({ id: newChoice.id });
  } catch (e) {
    const errors = e.errors.map((err) => err.message);
    res.sendStatus(400).json({ errors });
  }
};

exports.updateChoice = async (req, res) => {
  const { id } = req.params;
  try {
    const [, [updatedChoice]] = await Choices.update(req.body, {
      where: { id },
      returning: true,
    });
    res.json(updatedChoice);
  } catch (e) {
    const errors = e.errors.map((err) => err.message);
    res.sendStatus(400).json({ errors });
  }
};

exports.deleteChoice = async (req, res) => {
  const { id } = req.params;
  await Choices.destroy({ where: { id } });
  res.sendStatus(200);
};
