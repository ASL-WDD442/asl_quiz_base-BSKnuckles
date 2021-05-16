const router = require('express').Router()
const quizController = require('../controllers/quizzes')

router.get('/', quizController.getAll)
router.get('/public', quizController.getPublic)
router.get('/:id', quizController.getOneById)
router.post('/', quizController.createQuiz)
router.put('/:id', quizController.updateQuiz)
router.delete('/:id', quizController.deleteQuiz)

module.exports = router