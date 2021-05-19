const router = require('express').Router();
const questionsController = require('../controllers/questions');

router.get('/', questionsController.getQuizQuestions);
router.get('/:id', questionsController.getOneById);
router.post('/', questionsController.createQuestion);
router.put('/:id', questionsController.updateQuestion);
router.delete('/:id', questionsController.deleteQuestion);

module.exports = router;
