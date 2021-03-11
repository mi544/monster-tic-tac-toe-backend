const { app } = require('./app.js')

const PORT = process.env.PORT || 5005

const appInstance = app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${PORT}`)
})

const io = require('socket.io')(appInstance, {
  cors: { origin: 'http://localhost:8080' },
})

module.exports = { io }

require('./socket.js')
