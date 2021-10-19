/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useSocket } from "./contexts/SocketProvider";
// import PrimaryButton from "./base/PrimaryButton";

export default function ChatRoom() {
  const { socket, userNickname, socketConnected } = useSocket();

  return (
    <Box
      elevation={1}
      sx={{
        m: { xs: 0, sm: 2 },
        maxWidth: 1200,
        width: { xs: "100vw", sm: "85vw" },
        height: { xs: "100vh", sm: "90vh" },
        display: "flex",
        flexDirection: "column",
        borderRadius: (theme) => theme.spacing(1.5),
        backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
      }}
      component={Paper}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          borderRadius: 0,
          borderTopRightRadius: (theme) => theme.spacing(1.5),
          borderTopLeftRadius: (theme) => theme.spacing(1.5),
        }}
        elevation={2}
        component={Paper}
      >
        <Typography sx={{ fontWeight: 700 }} variant="h5" component="h5">
          Chat
        </Typography>
      </Box>
      {socketConnected ? (
        <ChatReady socket={socket} userNickname={userNickname} />
      ) : (
        <ChatLoading />
      )}
    </Box>
  );
}

function ChatReady({ socket, userNickname }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket == null) return undefined;

    socket.on("on-new-message", (data) => {
      setMessages((oldMessages) => [...oldMessages, data]);
    });

    return () => socket.off("on-new-message");
  }, [socket]);
  return (
    <>
      <MessageContainer messages={messages} userNickname={userNickname} />
      <InputContainer socket={socket} />
    </>
  );
}

function ChatLoading() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row-reverse",
        },
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          mb: { xs: 4, sm: 0 },
          fontSize: { xs: "1.8rem", sm: "2.125rem" },
        }}
        variant="h4"
        component="h4"
        textAlign="center"
      >
        Connecting to the server...
      </Typography>
      <CircularProgress color="primary" sx={{ mr: { xs: 0, sm: 3 } }} />
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
        borderBottomRightRadius: theme.spacing(1.5),
        borderBottomLeftRadius: theme.spacing(1.5),
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
        maxWidth: "45%",
        width: "fit-content",
        minWidth: "20%",
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
