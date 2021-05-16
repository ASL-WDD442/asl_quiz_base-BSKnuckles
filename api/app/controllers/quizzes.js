const { Quizzes } = require('../models')

exports.getAll = (req, res) => {
    const quizzes = Quizzes.findAll()
    res.json(quizzes)
}

exports.getPublic = (req, res) => {
    const quizzes = Quizzes.findPublic()
    res.json(quizzes)
}

exports.getOneById = (req, res) => {
    const { id } = req.params
    const quiz = Quizzes.findByPk(id)
    if (!quiz) {
        res.sendStatus(404)
        return;
    }
    res.json(quiz)
}

exports.createQuiz = (req, res) => {
    const { name, type } = req.body
    const id = Quizzes.create({ name, type })
    res.json({id})
}

exports.updateQuiz = (req, res) => {
    const { id } = req.params
    const updatedQuiz = Quizzes.update(req.body, id)
    res.json(updatedQuiz)
}

exports.deleteQuiz = (req, res) => {
    const { id } = req.params
    Quizzes.destroy(id)
    res.sendStatus(200)
}