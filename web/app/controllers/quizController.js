exports.renderLanding = async (req, res) => {
    const quizzes = await req.API.get('/quizzes/public')
    res.render('landing', {quizzes})
}

exports.renderQuiz = async (req, res) => {
    console.log('find quiz')
    const { id } = req.params
    const quiz = await req.API.get(`/quizzes/${id}`)
    res.render('quiz/index', {quiz})
}