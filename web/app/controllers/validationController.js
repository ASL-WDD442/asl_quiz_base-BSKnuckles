const { check, validationResult } = require('express-validator');

const checks = {
  id: check('id').isUUID().withMessage('ID is not valid, please go back and try again'),
  name: check('name').exists().withMessage('Quiz name is required').isLength(3)
    .withMessage('Quiz name is required to be at least 3 characters'),
  type: check('type').exists().withMessage('Quiz type is required').isIn(['public', 'private'])
    .withMessage('Decision must be public or private'),
  title: check('title').exists().withMessage('Question title is required').isLength(2)
    .withMessage('Question title is required to be at least 3 characters'),
  value: check('value').exists().withMessage('Choice value is required').isLength(1)
    .withMessage('Choice value is required'),
  correct: check('correct').exists().withMessage('Choice correct option is required').isIn(['correct', 'incorrect'])
    .withMessage('Decision must be public or private'),
  questionId: check('questionId').isUUID().withMessage('Question ID is not valid, please go back and try again'),
  quizId: check('quizId').isUUID().withMessage('Quiz ID is not valid, please go back and try again'),
};

const checkForErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return next(errors.mapped());

  return next();
};

exports.validate = (method) => {
  switch (method) {
    case 'createQuiz': {
      return [checks.name, checks.type, checkForErrors];
    }
    case 'editQuiz': {
      return [checks.id, checks.name, checks.type, checkForErrors];
    }
    case 'deleteQuiz': {
      return [checks.id, checkForErrors];
    }
    case 'createQuestion': {
      return [checks.title, checks.quizId, checkForErrors];
    }
    case 'editQuestion': {
      return [checks.id, checks.title, checks.quizId, checkForErrors];
    }
    case 'deleteQuestion': {
      return [checks.id, checkForErrors];
    }
    case 'createChoice': {
      return [checks.value, checks.correct, checks.questionId, checkForErrors];
    }
    case 'editChoice': {
      return [checks.id, checks.value, checks.correct, checks.questionId, checkForErrors];
    }
    case 'deleteChoice': {
      return [checks.id, checkForErrors];
    }
    default: {
      return [];
    }
  }
};
