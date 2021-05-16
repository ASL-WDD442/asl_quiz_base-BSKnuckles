const router = require('express').Router()
const questionsController = require('../controllers/questions')

router.get('/', questionsController.getAll)
router.get('/:id', questionsController.getOneById)
router.post('/', questionsController.createQuestion)
router.put('/:id', questionsController.updateQuestion)
router.delete('/:id', questionsController.deleteQuestion)

module.exports = router