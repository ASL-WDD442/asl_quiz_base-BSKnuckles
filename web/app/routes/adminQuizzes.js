const router = require('express').Router()
const quizController = require('../controllers/quizController')
const validationCtrl = require('../controllers/validationController')
const { route } = require('./public')

// View quiz(zes)
// router.get('/:id', quizController.renderAdminDetail)

// Admin Views
//  - Create Quiz
router.get('/new', quizController.renderDecisionForm)
router.post('/new', [
    validationCtrl.validate('createDecisions'),
    quizController.renderDecisionFormWithErrors,
    quizController.saveDecision
])

// Edit Quiz
router.get('/edit/:id', quizController.renderEditForm)
router.post('/edit/:id', [
    validationCtrl.validate('editDecision'),
    quizController.renderDecisionFormWithErrors,
    quizController.saveDecision
])

// Delete Quiz
router.get('/delete/:id', [
    validationCtrl.validate('deleteDecision'),
    quizController.goBackOnError,
    quizController.deleteDecision
])

module.exports = router