/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Paper, TextareaAutosize, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useSocket } from "./contexts/SocketProvider";
// import PrimaryButton from "./base/PrimaryButton";

export default function ChatRoom() {
  const { socket, userNickname } = useSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket == null) return undefined;

    socket.on("on-new-message", (data) => {
      setMessages((oldMessages) => [...oldMessages, data]);
    });

    return () => socket.off("on-new-message");
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
      <MessageContainer messages={messages} userNickname={userNickname} />
      <InputContainer socket={socket} />
    </Box>
  );
}

function MessageContainer({ messages, userNickname }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [messages]);
  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY: "auto",
      }}
    >
      {messages.map((m, index) => (
        <MessageItem
          key={index}
          message={m.message}
          sender={m.sender}
          fromSender={userNickname === m.sender}
        />
      ))}
    </Box>
  );
}

function InputContainer({ socket }) {
  const theme = useTheme();
  const textAreaRef = useRef(null);

  const handleSendMessage = useCallback(
    (e) => {
      if (e.key === "Enter") {
        socket.emit("send-message", textAreaRef.current.value);
        textAreaRef.current.value = "";
        e.preventDefault();
      }
    },
    [socket]
  );

  useEffect(() => {
    const tArea = textAreaRef.current;
    tArea.addEventListener("keypress", handleSendMessage);
    return () => {
      tArea.removeEventListener("keypress", handleSendMessage);
    };
  }, [handleSendMessage]);

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

function MessageItem({ message, sender, fromSender }) {
  const extraStyles = fromSender ? { alignSelf: "flex-end" } : {};

  return (
    <Box
      sx={{
        width: "33%",
        backgroundColor: "background.paper",
        p: 1.2,
        m: 1,
        borderRadius: 2,
        ...extraStyles,
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
