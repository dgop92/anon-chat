import React from "react";
import { Box, Chip } from "@mui/material";
import { BaseModal, ModalHeader } from "../../../components/Modal";
import { useSocket } from "../../../providers/SocketProvider";
import { useChatUsers } from "../hooks/useChatUsers";

export default function OnlineUsersModal({ open, onClose }) {
  const { socket } = useSocket();
  const { usernames } = useChatUsers({ socket });

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      extraBaseStyles={{ maxWidth: 500, width: "95vw" }}
    >
      <ModalHeader title="Online users" onClose={onClose} />
      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2.5 }}>
        {usernames.map((username) => (
          <Chip
            sx={{
              m: 0.5,
              px: 1.5,
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            }}
            key={username}
            label={username}
            variant="filled"
          />
        ))}
      </Box>
    </BaseModal>
  );
}
