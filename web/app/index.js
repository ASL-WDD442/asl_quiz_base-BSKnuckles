const express = require('express')
const log = require('debug')('web:logging')
const error = require('debug')('web:error')

const publicRoutes = require('./routes/public')

const API = require('./utils/API')
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(API)

app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)

app.use('/', publicRoutes)

app.use((err, req, res, next) => {
    error('ERROR FOUND:', err)
    res.sendStatus(500)
})

module.exports = app