exports.renderLanding = async (req, res) => {
    const quizzes = await req.API.get('/quizzes/public')
    console.log(quizzes)
    res.render('landing', {quizzes})
}