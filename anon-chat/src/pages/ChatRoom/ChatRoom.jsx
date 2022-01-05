import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useSocket } from "../../providers/SocketProvider";
import { ChatReady } from "./ChatReady";
import { ChatLoading } from "./ChatLoading";

export default function ChatRoom() {
  const { socketConnected } = useSocket();

  return (
    <Box
      elevation={1}
      sx={{
        maxWidth: 1200,
        width: { xs: "100vw", sm: "95vw" },
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
          borderTopRightRadius: "inherit",
          borderTopLeftRadius: "inherit",
        }}
        elevation={2}
        component={Paper}
      >
        <Typography sx={{ fontWeight: 700 }} variant="h5" component="h5">
          Chat
        </Typography>
      </Box>
      {socketConnected ? <ChatReady /> : <ChatLoading />}
    </Box>
  );
}
