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

// export the express app
module.exports = app