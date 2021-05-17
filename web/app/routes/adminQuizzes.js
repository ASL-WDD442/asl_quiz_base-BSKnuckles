const router = require('express').Router();
const QuizController = require('../controllers/quizController');
const ValidationController = require('../controllers/validationController');

// My Quizzes
router.get('/list', QuizController.renderMyQuizzes);

// Quiz Detail
router.get('/:id', QuizController.renderQuizDetail);

//  Create Quiz
router.get('/new', QuizController.renderQuizForm);
// router.post('/new', [
//   validationController.validate('createQuiz'),
//   quizController.renderQuizFormWithErrors,
//   quizController.saveQuiz,
// ]);

// Edit Quiz
router.get('/edit/:id', QuizController.renderEditForm);
// router.post('/edit/:id', [
//   validationController.validate('editQuiz'),
//   quizController.renderQuizFormWithErrors,
//   quizController.saveQuiz,
// ]);

// Delete Quiz
router.get('/delete/:id', [
  ValidationController.validate('deleteQuiz'),
  QuizController.goBackOnError,
  QuizController.deleteQuiz,
]);

module.exports = router;
