const dotenv = require("dotenv");
const { listenerNames, emitNames, MAX_USERS } = require("./constants");
const { getColorGenerator, createArrayOfUsersFromObject } = require("./utils");
dotenv.config();

const io = require("socket.io")(8080, {
  cors: {
    origins: process.env.CLIENT_URLS.split(","),
    methods: ["GET", "POST"],
  },
});

const users = new Map();
const colorGen = getColorGenerator();

io.on("connection", (socket) => {
  const name = socket.handshake.query.userNickname;
  if (!/\w{2,15}$/.test(name)) {
    socket.emit(emitNames.ENTRY_ERROR, {
      errorMessage: "invalid username",
    });
    // maybe it was already disconnect from the client
    setTimeout(() => socket?.disconnect(true), 3000);
  }
  if (users.has(name)) {
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
    users.set(name, { color: colorGen.next().value });

    io.emit(emitNames.NEW_CLIENT, {
      user: name,
      users: createArrayOfUsersFromObject(Object.fromEntries(users)),
    });
    socket.broadcast.emit(emitNames.NEW_MESSAGE, {
      sender: name,
      message: "Has joined the chat",
      color: users.get(name).color,
    });

    socket.on(listenerNames.SEND_MESSAGE, (message) => {
      io.emit(emitNames.NEW_MESSAGE, {
        sender: name,
        message: message,
        color: users.get(name).color,
      });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit(emitNames.NEW_MESSAGE, {
        sender: name,
        message: "Has left the chat",
        color: users.get(name).color,
      });
      users.delete(name);
      socket.broadcast.emit(emitNames.CLIENT_LEFT, {
        user: name,
        users: createArrayOfUsersFromObject(Object.fromEntries(users)),
      });
    });
  }
});

console.log("Server running");
