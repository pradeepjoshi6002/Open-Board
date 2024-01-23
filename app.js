const express = require("express");
const socket = require("socket.io");

const app = express();
let port = process.env.PORT || 7000;

app.use(express.static("public"));

let server = app.listen(port, () => {
  console.log("listening to port", port);
});

let io = socket(server);

io.on("connection", (socket) => {
  console.log("socket connection made");
  //received data
  socket.on("beginPath", (data) => {
    //now transfer data to all connections
    io.sockets.emit("beginPath", data);
  });
  socket.on("drawStroke", (data) => {
    //now transfer data to all connections
    io.sockets.emit("drawStroke", data);
  });
});
