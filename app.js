require("dotenv/config");
const express = require("express"); // Access
const socket = require("socket.io");

const app = express(); // Initialize and server ready

app.use(express.static("public"));

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});

let io = socket(server);

io.on("connection", (socket) => {
  console.log("Made socket connection ");

  // Received data
  socket.on("beginPath", (data) => {
    // data -> data from server
    // Now transfer data to all connected computer
    io.sockets.emit("beginPath", data);
  });

  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  });

  socket.on("redoUndo", (data) => {
    io.sockets.emit("redoUndo", data);
  });
});
