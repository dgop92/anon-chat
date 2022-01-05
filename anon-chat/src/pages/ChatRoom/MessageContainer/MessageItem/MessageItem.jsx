import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function MessageItem({ message, sender, fromSender }) {
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
