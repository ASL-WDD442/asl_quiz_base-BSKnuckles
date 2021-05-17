exports.renderChoiceDetails = async (req, res) => {
  const { id } = req.params;
  const choice = await req.API.get(`/choices/${id}`);
  res.render('choice/detail', { choice });
};

exports.renderChoiceForm = async (req, res) => {
  res.render('choice/form', { value: '', type: 'private' });
};

exports.renderChoiceFormWithErrors = (errors, req, res, next) => {
  const { value, type } = req.body;
  res.render('choice/form', { value, type, errors });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const { value, type, questionId } = await req.API.get(`/choices/${id}`);
  res.render('choice/form', { value, type, questionId });
};

exports.saveChoice = async (req, res) => {
  const { value, quizId } = req.body;
  const { id } = req.params;
  let data = {};
  if (id) {
    data = await req.API.put(`/choices/${id}`, { value, quizId });
  } else {
    data = await req.API.post('/choices', { value, quizId });
  }
  res.redirect(`/admin/choices/edit/${data.id}`);
};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect('back');
};

exports.deleteChoice = async (req, res) => {
  const { id } = req.params;
  await req.API.delete(`/choices/${id}`);
  res.redirect('/');
};
