const dotenv = require("dotenv");
const { listenerNames, emitNames } = require("./constants");
dotenv.config();

const io = require("socket.io")(8080, {
  cors: {
    origins: process.env.CLIENT_URLS.split(","),
    methods: ["GET", "POST"],
  },
});

const usernames = new Map();

io.on("connection", (socket) => {
  const name = socket.handshake.query.userNickname;
  if (usernames.has(name)) {
    socket.disconnect(true);
    //send message to user
  } else {
    usernames.set(name, { color: "#000" });

    io.emit(emitNames.NEW_CLIENT, {
      user: name,
      usernames: Array.from(usernames.keys()),
    });
    socket.broadcast.emit(emitNames.NEW_MESSAGE, {
      sender: name,
      message: "Has joined the chat",
    });

    socket.on(listenerNames.SEND_MESSAGE, (message) => {
      io.emit(emitNames.NEW_MESSAGE, { sender: name, message: message });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit(emitNames.NEW_MESSAGE, {
        sender: name,
        message: "Has left the chat",
      });
      usernames.delete(name);
      socket.broadcast.emit(emitNames.CLIENT_LEFT, {
        user: name,
        usernames: Array.from(usernames.keys()),
      });
    });
  }
});

console.log("Server running");
