exports.renderQuestionDetails = async (req, res) => {
  const { id } = req.params;
  const question = await req.API.get(`/questions/${id}`);
  const choices = await req.API.get(`/choices?questionId=${id}`);
  res.render('question/detail', { question, choices });
};

exports.renderQuestionForm = async (req, res) => {
  const { quizId } = req.query;
  res.render('question/form', { title: '', type: 'private', quizId });
};

exports.renderQuestionFormWithErrors = (errors, req, res, next) => {
  const { title, type } = req.body;
  res.render('question/form', { title, type, errors });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const { title, type, quizId } = await req.API.get(`/questions/${id}`);
  res.render('question/form', { title, type, quizId });
};

exports.saveQuestion = async (req, res) => {
  const { title, quizId } = req.body;
  const { id } = req.params;
  let data = {};
  if (id) {
    data = await req.API.put(`/questions/${id}`, { title, quizId });
  } else {
    data = await req.API.post('/questions', { title, quizId });
  }
  res.redirect(`/admin/questions/edit/${data.id}`);
};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect('back');
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  await req.API.delete(`/questions/${id}`);
  res.redirect('/');
};
