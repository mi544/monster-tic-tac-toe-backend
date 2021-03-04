const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const middlewares = require('./middlewares')
require('dotenv').config()

const port = process.env.PORT || 5005

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

const httpServer = require('http').Server(app)
const io = require('socket.io')(httpServer, {
  cors: {
    origin: false,
  },
})

app.use((req, res, next) => {
  res.io = io
  next()
})

io.on('connection', (socket) => {
  console.log('headshake', socket.handshake)
})

app.get('/', function (req, res, next) {
  console.log(res.io.emit('socketToMe', 'users'))
  res.send('respond with a resource.')
})

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`)
  /* eslint-enable no-console */
})
