const protectedRoute = (req, res, next) => {
  const { loggedIn = false } = req.session;
  if (!loggedIn) return res.redirect('/');
  return next();
};

module.exports = protectedRoute;
