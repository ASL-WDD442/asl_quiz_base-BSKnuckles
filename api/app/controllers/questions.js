const { Questions } = require('../models')

exports.getAll = (req, res) => {
    const questions = Questions.findAll()
    res.json(questions)
}

exports.getOneById = (req, res) => {
    const { id } = req.params
    const question = Questions.findByPk(id)
    if (!question) {
        res.sendStatus(404)
        return;
    }
    res.json(question)
}

exports.createQuestion = (req, res) => {
    const { title, quizId } = req.body
    const id = Questions.create({ title, quizId })
    res.json({id})
}

exports.updateQuestion = (req, res) => {
    const { id } = req.params
    const updatedQuestion = Questions.update(req.body, id)
    res.json(updatedQuestion)
}

exports.deleteQuestion = (req, res) => {
    const { id } = req.params
    Questions.destroy(id)
    res.sendStatus(200)
}