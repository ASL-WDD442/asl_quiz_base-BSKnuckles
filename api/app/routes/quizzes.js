const router = require('express').Router();
const quizController = require('../controllers/quizzes');
const protectedRoute = require('../utils/protectedRoute');

router.get('/', protectedRoute, quizController.getAll);
router.get('/public', quizController.getPublic);
router.get('/:id', quizController.getOneById);
router.post('/', protectedRoute, quizController.createQuiz);
router.put('/:id', protectedRoute, quizController.updateQuiz);
router.delete('/:id', protectedRoute, quizController.deleteQuiz);

module.exports = router;
