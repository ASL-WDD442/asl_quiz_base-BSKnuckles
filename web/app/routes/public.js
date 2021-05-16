const router = require('express').Router()
const quizController = require('../controllers/quizController')

router.get('/', quizController.renderLanding)

module.exports = router