const { io } = require('./index.js')

const socketIdsFromRoom = (roomName) => Array.from(io.of('/').adapter.rooms.get(roomName))
const socketFromId = (socketId) => io.of('/').sockets.get(socketId)
const socketInstancesFromRoom = (roomName) =>
  socketIdsFromRoom(roomName).map((socketId) => socketFromId(socketId))

// on `join-room`
io.of('/').adapter.on('join-room', (room, id) => {
  // if joined `wait-room`
  if (room === 'wait-room') {
    console.log(`heya! socket ${id} has joined room ${room}`)
    // if exactly 2 players are in `wait-room`
    if (socketIdsFromRoom('wait-room').length === 2) {
      // moving to game-room-1
      socketInstancesFromRoom('wait-room').forEach((socket) => {
        socket.leave('wait-room')
        socket.join('game-room-1')
      })
    }
  }

  // if joined `game-room-1`
  if (room === 'game-room-1') {
    // if exactly 2 players are in `game-room-1`
    if (socketIdsFromRoom('game-room-1').length === 2) {
      const player1 = socketIdsFromRoom('game-room-1')[0]
      const player2 = socketIdsFromRoom('game-room-1')[1]
      //!!! call game start function here
      // EVENTS
      // game start (full state)
      const socketMarks = {}
      socketMarks[player1] = 'x'
      socketMarks[player2] = 'o'
      io.in('game-room-1').emit('GAME_START', socketMarks)

      // move (change)
      // game end
    }
    console.log(`hey!! gaming time! socket ${id} has joined room ${room}`)
  }
})

// on `connection`
io.of('/').on('connection', (socket) => {
  console.log('connected: ', socket.id)
  socket.join('wait-room')
  //   socket.emit('bryan', 'is nice')
})
