const { check, validationResult } = require('express-validator');

const checks = {
  id: check('id')
    .isUUID()
    .withMessage('ID is not valid, please go back and try again'),
  title: check('name')
    .exists()
    .withMessage('Quiz name is required')
    .isLength(3)
    .withMessage('Quiz name is required to be at least 3 characters'),
  type: check('type')
    .exists()
    .withMessage('Quiz type is required')
    .isIn(['public', 'private'])
    .withMessage('Decision must be public or private'),
  value: check('value')
    .exists()
    .withMessage('Question value is required')
    .isLength(1)
    .withMessage('Question value is required'),
  decisionId: check('quizId')
    .isUUID()
    .withMessage('Quiz ID is not valid, please go back and try again'),
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
      return [checks.value, checks.quizId, checkForErrors];
    }
    case 'editQuestion': {
      return [checks.id, checks.value, checks.quizId, checkForErrors];
    }
    case 'deleteQuestion': {
      return [checks.id, checkForErrors];
    }
    case 'createChoice': {
      return [checks.name, checks.type, checkForErrors];
    }
    case 'editChoice': {
      return [checks.id, checks.name, checks.type, checkForErrors];
    }
    case 'deleteChoice': {
      return [checks.id, checkForErrors];
    }
    default: {
      return [];
    }
  }
};
