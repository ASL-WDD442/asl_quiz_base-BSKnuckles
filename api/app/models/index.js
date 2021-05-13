const uuid = require('uuid')
const quizzes = require('./quizzes')
const questions = require('./questions')
const choices = require('./choices')

class Model {
    constructor(data) {
        this.values = data
    }

    create(item) {
        const id = uuid()
        this.values.push({ id, ...item })
        return id
    }

    update(valuesToChange, id) {
        const index = this.values.findIndex(item => item.id === id)
        const newValue = { ...this.values[index], ...valuesToChange }
        this.values = [
            ...this.values.slice(0, index),
            newValue,
            ...this.values.slice(index + 1)
        ]

        return newValue
    }

    destroy(id) {
        this.values = this.values.filter((item) => {
            if (item.id === id) return false
            return true
        })
    }

    findByPk(id) {
        return this.values.find(item => item.id === id)
    }

    findAll() {
        return this.values
    }
}

module.exports = {
    Quizzes: new Model(quizzes),
    Questions: new Model(questions),
    Choices: new Model(choices)
}