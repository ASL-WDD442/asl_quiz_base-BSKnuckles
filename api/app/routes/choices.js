const router = require('express').Router();
const choicesController = require('../controllers/choices');
const protectedRoute = require('../utils/protectedRoute');

router.get('/', choicesController.getQuestionChoices);
router.get('/:id', choicesController.getOneById);
router.post('/', protectedRoute, choicesController.createChoice);
router.put('/:id', protectedRoute, choicesController.updateChoice);
router.delete('/:id', protectedRoute, choicesController.deleteChoice);

module.exports = router;
