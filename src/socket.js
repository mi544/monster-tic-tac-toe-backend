const { io } = require('./index.js')

const getPlayersIds = (roomName) => io.of('/').adapter.rooms.get(roomName)
const getSocketsByIds = (socketId) => io.of('/').sockets.get(socketId)
const getPlayersSockets = (roomName) =>
  getPlayersIds(roomName).map((socketId) => getSocketsByIds(socketId))

io.of('/').adapter.on('join-room', (room, id) => {
  if (room === 'wait-room') {
    console.log(`heya! socket ${id} has joined room ${room}`)

    console.log('ids', getPlayersIds('wait-room').values().next().value)
    console.log('socket', getSocketsByIds(getPlayersIds('wait-room').values().next().value))
    // if (getPlayersIds('wait-room').size === 2) {
    //   getPlayersIds('wait-room').forEach((socketId) => {})
    // }
  }
})

io.of('/').on('connection', (socket) => {
  console.log('made socket connection with id ', socket.id)
  socket.join('wait-room')
  //   socket.emit('bryan', 'is nice')
})
