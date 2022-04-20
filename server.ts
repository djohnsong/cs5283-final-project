const express = require("express");
const app = express();
const server = require("http").Server(app);

const port = 5000;

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  socket.on("join-room", (roomId: string, userId: string) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-joined", userId);

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-left", userId);
    });
  });
});

server.listen(port);
