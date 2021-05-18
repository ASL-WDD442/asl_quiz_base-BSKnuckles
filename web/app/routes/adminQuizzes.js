const router = require('express').Router();
const QuizController = require('../controllers/quizController');
const ValidationController = require('../controllers/validationController');

// My Quizzes
router.get('/list', QuizController.renderMyQuizzes);

// Quiz Detail
router.get('/:id', QuizController.renderQuizDetail);

//  Create Quiz
router.get('/new', QuizController.renderQuizForm);
router.post('/new', [
  ValidationController.validate('createQuiz'),
  QuizController.renderQuizFormWithErrors,
  QuizController.saveQuiz,
]);

// Edit Quiz
router.get('/edit/:id', QuizController.renderEditForm);
router.post('/edit/:id', [
  ValidationController.validate('editQuiz'),
  QuizController.renderQuizFormWithErrors,
  QuizController.saveQuiz,
]);

// Delete Quiz
router.get('/delete/:id', [
  ValidationController.validate('deleteQuiz'),
  QuizController.goBackOnError,
  QuizController.deleteQuiz,
]);

module.exports = router;
