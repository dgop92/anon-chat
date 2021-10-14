/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from "react";
import { Box, Paper, TextareaAutosize, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useSocket } from "./contexts/SocketProvider";
// import PrimaryButton from "./base/PrimaryButton";

const testMesages = [
  {
    sender: "pedro",
    message: "lore ams das das das ",
  },
  {
    sender: "juan",
    message: "123 ams das das das ",
  },
  {
    sender: "juan",
    message: "123 asdasd das das das ",
  },
];

export default function ChatRoom() {
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;

    console.log(socket.connected);
  }, [socket]);

  return (
    <Box
      elevation={1}
      sx={{
        m: 2,
        maxWidth: 1200,
        width: "85vw",
        maxHeight: 600,
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
      }}
      component={Paper}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography sx={{ fontWeight: 700 }} variant="h5" component="h5">
          Chat
        </Typography>
      </Box>
      <MessageContainer messages={testMesages} />
      <InputContainer />
    </Box>
  );
}

function MessageContainer({ messages }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY: "auto",
      }}
    >
      {messages.map((m, index) => (
        <MessageItem key={index} message={m.message} sender={m.sender} />
      ))}
    </Box>
  );
}

function InputContainer() {
  const theme = useTheme();
  const textAreaRef = useRef(null);

  const handleSendMessage = (e) => {
    if (e.key === "Enter") {
      console.log(textAreaRef.current.value);
      textAreaRef.current.value = "";
      e.preventDefault();
    }
  };

  useEffect(() => {
    const tArea = textAreaRef.current;
    tArea.addEventListener("keypress", handleSendMessage);
    return () => {
      tArea.removeEventListener("keypress", handleSendMessage);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "primary.light",
        py: 1,
      }}
    >
      <TextareaAutosize
        placeholder="Escribe un mensaje"
        ref={textAreaRef}
        style={{
          width: "95%",
          padding: theme.spacing(1.5),
          borderRadius: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          fontFamily: theme.typography.fontFamily,
          outline: 0,
        }}
      />
      {/* <PrimaryButton ></PrimaryButton> */}
    </Box>
  );
}

function MessageItem({ message, sender }) {
  return (
    <Box
      sx={{
        width: "33%",
        backgroundColor: "background.paper",
        p: 1.2,
        m: 1,
        borderRadius: 2,
      }}
      component={Paper}
      elevation={1}
    >
      <Typography fontWeight={700} variant="body1">
        {sender}
      </Typography>
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
}
