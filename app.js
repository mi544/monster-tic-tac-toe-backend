const express = require('express')
const app = express()
const server = app.listen(5005)
const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:8080' },
})

io.on('connection', function (socket) {
  console.log('made socket connection')
  socket.emit('bryan', 'is nice')
})
