exports.renderLanding = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  res.render('landing', { quizzes });
};

exports.renderQuiz = async (req, res) => {
  const { id } = req.params;
  const quiz = await req.API.get(`/quizzes/${id}`);
  res.render('quiz/index', { quiz });
};

exports.renderQuizDetail = async (req, res) => {
  const { id } = req.params;
  const { name, type } = await req.API.get(`/quizzes/${id}`);
  const questions = await req.API.get(`/questions?quizId=${id}`);
  res.render('quiz/index', { name, type, questions });
};

exports.renderMyQuizzes = async (req, res) => {
  const { userId } = req.query;
  const quizzes = await req.API.get(`/quizzes?userId=${userId}`);
  console.log(await req.API.get(`/quizzes?userId=${userId}`));
  res.render('quiz/user', { quizzes });
};

exports.renderQuizForm = async (req, res) => {
  res.render('quiz/form', { id: '', name: '', type: 'private' });
};

exports.renderQuizFormWithErrors = (errors, req, res, next) => {
  const { name, type } = req.body;
  res.render('quiz/form', { name, type, errors });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const { name, type } = await req.API.get(`/quizzes/${id}`);
  res.render('quiz/form', { id, name, type });
};

exports.saveQuiz = async (req, res) => {
  const { name, type } = req.body;
  const { id } = req.params;
  let data = {};
  if (id) {
    data = await req.API.put(`/quizzes/${id}`, { name, type });
  } else {
    data = await req.API.post('/quizzes', { name, type });
  }
  res.redirect(`/admin/quizzes/edit/${data.id}`);
};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect('back');
};

exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;
  await req.API.delete(`/quizzes/${id}`);
  res.redirect('/');
};
