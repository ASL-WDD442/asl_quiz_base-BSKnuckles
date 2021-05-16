const { Choices } = require('../models')

exports.getAll = (req, res) => {
    const { questionId } = req.query
    const choices = Choices.findByQuestion(questionId)
    res.json(choices)
}

exports.getOneById = (req, res) => {
    const { id } = req.params
    const choice = Choices.findByPk(id)
    if (!choice) {
        res.sendStatus(404)
        return;
    }
    res.json(choice)
}

exports.createChoice = (req, res) => {
    const { value, type, questionId } = req.body
    const id = Choices.create({ value, type, questionId })
    res.json({id})
}

exports.updateChoice = (req, res) => {
    const { id } = req.params
    const updatedChoice = Choices.update(req.body, id)
    res.json(updatedChoice)
}

exports.deleteChoice = (req, res) => {
    const { id } = req.params
    Choices.destroy(id)
    res.sendStatus(200)
}