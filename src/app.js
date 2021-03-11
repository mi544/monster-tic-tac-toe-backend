const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const middlewares = require('./middlewares')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
  res.send('respond with a resource.')
})

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = { app }
