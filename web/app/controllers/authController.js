const querystring = require('querystring');
const log = require('debug')('web:request');

exports.renderSignup = (req, res) => {
  res.render('auth/signup');
};

exports.verifySignup = async (req, res) => {
  const { token, loggedIn } = await req.API.post('/auth/signup', req.body);
  req.session.loggedIn = loggedIn;
  req.session.token = token;
  res.redirect('/admin/quizzes/list');
};

exports.renderLogin = (req, res) => {
  res.render('auth/login');
};

exports.redirectToGoogle = (req, res) => {
  const GOOGLE_URL = 'https://accounts.google.com/o/oauth2/v2/auth?';
  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  });
  log(GOOGLE_URL + params);
  res.redirect(GOOGLE_URL + params);
};

exports.verifyGoogleCode = async (req, res) => {
  const { code } = req.query;
  const { token, loggedIn } = await req.API.post('/auth/google', { code, url: process.env.CALLBACK_URL });
  req.session.loggedIn = loggedIn;
  req.session.token = token;
  res.redirect('/admin/quizzes/list');
};

exports.login = async (req, res) => {
  const apiResponse = await req.API.post('/auth/login', req.body);
  if (!apiResponse.error) {
    req.session.loggedIn = apiResponse.loggedIn;
    req.session.token = apiResponse.token;
    res.redirect('/admin/quizzes/list');
  } else {
    res.render('auth/login', { errors: [{ msg: apiResponse.error }] });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
