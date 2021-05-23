exports.renderLanding = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  res.render('landing', { quizzes });
};

exports.renderQuiz = async (req, res) => {
  const { id } = req.params;
  const rawQuestions = await req.API.get(`/questions?quizId=${id}`);
  const questions = [];
  rawQuestions.forEach(async (question) => {
    const choices = await req.API.get(`/choices?questionId=${question.id}`);
    const questionObj = {
      id: question.id,
      title: question.title,
      choices,
    };
    questions.push(questionObj);
  });
  const quiz = await req.API.get(`/quizzes/${id}`);
  res.render('quiz/index', { quiz, questions });
};

exports.renderQuizDetail = async (req, res) => {
  const { id } = req.params;
  const rawQuestions = await req.API.get(`/questions?quizId=${id}`);
  const questions = [];
  rawQuestions.forEach(async (question) => {
    const choices = await req.API.get(`/choices?questionId=${question.id}`);
    const questionObj = {
      id: question.id,
      title: question.title,
      choices,
    };
    questions.push(questionObj);
  });
  const data = {
    quiz: await req.API.get(`/quizzes/${id}`),
    questions,
  };
  // const quiz = await req.API.get(`/quizzes/${id}`);
  // const questions = await req.API.get(`/questions?quizId=${id}`);
  res.render('quiz/detail', data);
};

exports.renderMyQuizzes = async (req, res) => {
  // const { userId } = req.query;
  // const quizzes = await req.API.get(`/quizzes?userId=${userId}`);
  const quizzes = await req.API.get('/quizzes?userId=24a1fa46-c928-46c9-b578-78a415963200');
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
  if (id) {
    await req.API.put(`/quizzes/${id}`, { name, type });
  } else {
    await req.API.post('/quizzes', { name, type });
  }
  res.redirect('/admin/quizzes/list');
};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect('back');
};

exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;
  await req.API.delete(`/quizzes/${id}`);
  res.redirect('/admin/quizzes/list');
};
