import React, { useEffect } from "react";
import { Typography, Box, Paper } from "@mui/material";
import { useSocket } from "./contexts/SocketProvider";

export default function ChatRoom() {
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;

    console.log(socket.connected);
  }, [socket]);

  return (
    <Box elevation={1} m={2} p={3} sx={{ maxWidth: 800 }} component={Paper}>
      <Typography sx={{ fontWeight: 700 }} mb={2} variant="h4" component="h4">
        Status:
      </Typography>
    </Box>
  );
}
