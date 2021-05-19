const router = require('express').Router();
const choicesController = require('../controllers/choices');

router.get('/', choicesController.getQuestionChoices);
router.get('/:id', choicesController.getOneById);
router.post('/', choicesController.createChoice);
router.put('/:id', choicesController.updateChoice);
router.delete('/:id', choicesController.deleteChoice);

module.exports = router;
