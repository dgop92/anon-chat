const dotenv = require("dotenv");
const { listenerNames, emitNames, MAX_USERS } = require("./constants");
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
  if (!/\w+/.test(name)) {
    socket.emit(emitNames.ENTRY_ERROR, {
      errorMessage: "invalid username",
    });
    // maybe it was already disconnect from the client
    setTimeout(() => socket?.disconnect(true), 3000);
  }
  if (usernames.has(name)) {
    socket.emit(emitNames.ENTRY_ERROR, {
      errorMessage: "The username is already taken",
    });
    setTimeout(() => socket?.disconnect(true), 3000);
  } else if (io.engine.clientsCount > MAX_USERS) {
    socket.emit(emitNames.ENTRY_ERROR, {
      errorMessage: "The chat is full, wait until someone left chat",
    });
    setTimeout(() => socket?.disconnect(true), 3000);
  } else {
    socket.emit(emitNames.SUCCESS_CONNECTION);
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
