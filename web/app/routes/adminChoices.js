const router = require('express').Router();
const ChoiceController = require('../controllers/choiceController');
const ValidationController = require('../controllers/validationController');

//  Create Choice
router.get('/new', ChoiceController.renderChoiceForm);
router.post('/new', [
  ValidationController.validate('createChoice'),
  ChoiceController.renderChoiceFormWithErrors,
  ChoiceController.saveChoice,
]);

// Edit Choice
router.get('/edit/:id', ChoiceController.renderEditForm);
router.post('/edit/:id', [
  ValidationController.validate('editChoice'),
  ChoiceController.renderChoiceFormWithErrors,
  ChoiceController.saveChoice,
]);

// Delete Choice
router.get('/delete/:id', [
  ValidationController.validate('deleteChoice'),
  ChoiceController.goBackOnError,
  ChoiceController.deleteChoice,
]);

module.exports = router;
