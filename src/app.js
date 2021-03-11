const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const middlewares = require('./middlewares')
require('dotenv').config()

const PORT = process.env.PORT || 5005

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

const appInstance = app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${PORT}`)
})

const io = require('socket.io')(appInstance, {
  cors: { origin: 'http://localhost:8080' },
})

io.on('connection', function (socket) {
  console.log('made socket connection')
  socket.emit('bryan', 'is nice')
})
