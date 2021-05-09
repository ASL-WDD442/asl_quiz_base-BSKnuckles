// pull in the express package
const express = require('express')
// add the logger
const log = require('debug')('web:logging')
// add another logger
const error = require('debug')('web:error')
// create an express app
const app = express()
// set up a folder to hold all the static files
app.use(express.static('public'))
// example middleware that runs once for every request
app.use((req, res, next) => {
    log('\nRuns once for every request')
    setTimeout(() => { next(); }, 2000)
}, (req, res, next) => {
    log('Will run when next step is called')
    next()
})

// route specific middleware
app.use('/about', (req, res, next) => {
    log('Runs only on the /about page')
    next(new Error('Not authorized'))
})

// four params are required to mark this as an error handling middleware
// the commend below allows for eslint to not throw an error because I am not using the enxt function
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    error('Error found:', err)
    res.sendStatus(500)
})

// export the express app
module.exports = app