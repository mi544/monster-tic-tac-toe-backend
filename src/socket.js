const { io } = require('./index.js')

const connectedPlayers = []

io.on('connection', function (socket) {
  console.log('made socket connection with id ', socket.id)
  connectedPlayers.push({ id: socket.id, ref: socket })
  socket.emit('bryan', 'is nice')
})

setInterval(
  () =>
    console.log(
      connectedPlayers.map((i) => ({
        id: i.id,
        connected: i.ref.connected,
        disconnected: i.ref.disconnected,
      }))
    ),
  5 * 1000
)
