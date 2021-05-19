const router = require('express').Router();
const quizController = require('../controllers/quizController');

router.get('/', quizController.renderLanding);
router.get('/quizzes/:id', quizController.renderQuiz);

module.exports = router;
