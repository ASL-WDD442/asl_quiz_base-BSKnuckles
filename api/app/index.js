const error = require('debug')('api:error');
const express = require('express');
const morganDebug = require('morgan-debug');

const quizzesRouter = require('./routes/quizzes');
const questionsRouter = require('./routes/questions');
const choicesRouter = require('./routes/choices');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganDebug('api:request', 'dev'));

app.use('/quizzes', quizzesRouter);
app.use('/questions', questionsRouter);
app.use('/choices', choicesRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

module.exports = app;
