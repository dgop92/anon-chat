const dotenv = require("dotenv");
const { listenerNames, emitNames } = require("./constants");
dotenv.config();

const io = require("socket.io")(8080, {
  cors: {
    origins: process.env.CLIENT_URLS.split(","),
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const name = socket.handshake.query.userNickname;

  io.emit(emitNames.NEW_CLIENT, {
    user: name,
    nClients: io.engine.clientsCount,
  });

  socket.on(listenerNames.SEND_MESSAGE, (message) => {
    io.emit(emitNames.NEW_MESSAGE, { sender: name, message: message });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit(emitNames.CLIENT_LEFT, {
      user: name,
      nClients: io.engine.clientsCount,
    });
  });
});

console.log("Server running")