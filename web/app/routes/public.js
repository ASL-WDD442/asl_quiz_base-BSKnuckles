const router = require('express').Router();
const quizController = require('../controllers/quizController');
const authController = require('../controllers/authController');

router.get('/', quizController.renderLanding);
router.get('/quizzes/:id', quizController.renderQuiz);

// Auth routes
// Sign up
router.get('/signup', authController.renderSignup);
router.post('/signup', authController.verifySignup);
// Login
router.get('/login', authController.renderLogin);
router.post('/login', authController.login);
// OAuth2.0
router.get('/login/google', authController.redirectToGoogle);
router.get('/google/callback', authController.verifyGoogleCode);
// Logout
router.get('/logout', authController.logout);

module.exports = router;
