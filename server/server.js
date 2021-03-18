const { disconnect } = require("process");

const http = require("http").createServer()



const io = require("socket.io")(http, {
  cors: {
    origin: '*'
  }
  });

http.listen(3000)

io.on("connection", socket => {
  console.log("biri bağlandı")

  socket.on("disconnect", () => {
    console.log("biri ayrıldı")
  })
})