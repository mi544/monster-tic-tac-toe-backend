const { io } = require('./index.js')

const socketIdsFromRoom = (roomName) => Array.from(io.of('/').adapter.rooms.get(roomName))
const socketFromId = (socketId) => io.of('/').sockets.get(socketId)
const socketInstancesFromRoom = (roomName) =>
  socketIdsFromRoom(roomName).map((socketId) => socketFromId(socketId))

io.of('/').adapter.on('join-room', (room, id) => {
  if (room === 'wait-room') {
    console.log(`heya! socket ${id} has joined room ${room}`)
    if (socketIdsFromRoom('wait-room').length === 2) {
      socketInstancesFromRoom('wait-room').forEach((socket) => {
        socket.leave('wait-room')
        socket.join('game-room-1')
      })
    }
  }

  if (room === 'game-room-1') {
    console.log(`hey!! gaming time! socket ${id} has joined room ${room}`)
  }
})

io.of('/').on('connection', (socket) => {
  console.log('connected: ', socket.id)
  socket.join('wait-room')
  //   socket.emit('bryan', 'is nice')
})
