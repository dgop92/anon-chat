const dotenv = require("dotenv");
dotenv.config();

const io = require("socket.io")(8080, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const name = socket.handshake.query.userNickname;

  socket.on("send-message", (message) => {
    io.emit("on-new-message", { sender: name, message: message });
  });
});