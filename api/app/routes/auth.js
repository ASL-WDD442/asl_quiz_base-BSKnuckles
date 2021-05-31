const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/google', authController.exchangeCode);
router.post('/signup', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
