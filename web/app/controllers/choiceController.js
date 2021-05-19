exports.renderChoiceDetails = async (req, res) => {
  const { id } = req.params;
  const choice = await req.API.get(`/choices/${id}`);
  res.render('choice/detail', { choice });
};

exports.renderChoiceForm = async (req, res) => {
  const { questionId } = req.query;
  res.render('choice/form', { value: '', type: 'private', questionId });
};

exports.renderChoiceFormWithErrors = (errors, req, res, next) => {
  const { questionId } = req.query;
  const { value, correct } = req.body;
  res.render('choice/form', {
    value, correct, questionId, errors,
  });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const { value, type, questionId } = await req.API.get(`/choices/${id}`);
  const correct = type;
  res.render('choice/form', { value, correct, questionId });
};

exports.saveChoice = async (req, res) => {
  const { value, correct, questionId } = req.body;
  const type = correct;
  const { id } = req.params;
  if (id) {
    req.API.put(`/choices/${id}`, { value, type, questionId });
  } else {
    await req.API.post('/choices', { value, type, questionId });
  }
  res.redirect(`/admin/questions/${questionId}`);
};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect('back');
};

exports.deleteChoice = async (req, res) => {
  const { id } = req.params;
  await req.API.delete(`/choices/${id}`);
  res.redirect('/');
};
