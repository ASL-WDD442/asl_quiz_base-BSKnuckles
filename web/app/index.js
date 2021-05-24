const express = require('express');
const error = require('debug')('web:error');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const publicRoutes = require('./routes/public');
const adminQuizRoutes = require('./routes/adminQuizzes');
const adminQuestionRoutes = require('./routes/adminQuestions');
const adminChoiceRoutes = require('./routes/adminChoices');

const API = require('./utils/API');
const protectedRoute = require('./utils/protectedRoute');

const app = express();

app.use(expressSession({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore(),
}));

app.use((req, res, next) => {
  const { loggedIn = false } = req.session;
  res.locals.loggedIn = loggedIn;
  next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(API);

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use('/', publicRoutes);
app.use('/quiz', publicRoutes);
app.use('/admin/quizzes', protectedRoute, adminQuizRoutes);
app.use('/admin/questions', protectedRoute, adminQuestionRoutes);
app.use('/admin/choices', protectedRoute, adminChoiceRoutes);

app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

module.exports = app;
