const router = require('express').Router();
const QuestionController = require('../controllers/questionController');
const ValidationController = require('../controllers/validationController');

// Question Detail
router.get('/:id', QuestionController.renderQuestionDetails);

//  Create Question
router.get('/new', QuestionController.renderQuestionForm);
router.post('/new', [
  ValidationController.validate('createQuestion'),
  QuestionController.renderQuestionFormWithErrors,
  QuestionController.saveQuestion,
]);

// Edit Question
router.get('/edit/:id', QuestionController.renderEditForm);
router.post('/edit/:id', [
  ValidationController.validate('editQuestion'),
  QuestionController.renderQuestionFormWithErrors,
  QuestionController.saveQuestion,
]);

// Delete Question
router.get('/delete/:id', [
  ValidationController.validate('deleteQuestion'),
  QuestionController.goBackOnError,
  QuestionController.deleteQuestion,
]);

module.exports = router;
