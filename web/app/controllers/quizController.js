exports.renderLanding = async (req, res) => {
    // const quizzes = await req.API.get('/quizzes/public')
    console.log('hit the controller')
    res.render('landing', {quizzes})
}