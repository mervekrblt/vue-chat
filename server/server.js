const { disconnect } = require("process");

const http = require("http").createServer()

const io = require("socket.io")(http, {
  cors: {
    origin: '*'
  }
  });

http.listen(3000)

let users = []
let messages = []

io.on("connection", socket => {
  // console.log("biri bağlandı")

  socket.on('new_user', (name) => {
    users.push({
      id: socket.id,
      name: name
    })
    io.emit('users', users)

    // when new user login, display all messages
    io.emit('messages', messages)
  })

  socket.on('new_message', (data) => {
    messages.unshift({
      user: data.name,
      message: data.message,
      id: socket.id
    })
    io.emit('messages', messages)
  })

  socket.on('disconnect', () => {
    const index = users.indexOf(socket.id)
    users.splice(index, 1)
    io.emit('users', users)
  })

})