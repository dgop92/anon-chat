/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useCallback } from "react";
import { Box, TextareaAutosize } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function InputContainer({ socket }) {
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
