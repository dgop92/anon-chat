import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Lobby, ChatRoom } from "../pages";
import { SocketProvider } from "../providers/SocketProvider";

const BACKGROUND_IMAGE_URL = "https://source.unsplash.com/CdBPMI26KDo/1920x1280";

export default function AppSetup() {
  const [userNickname, setUserNickname] = useState("");

  const goToChatRoom = (name) => {
    setUserNickname(name);
  };

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        backgroundImage: `url("${BACKGROUND_IMAGE_URL}")`,
        backgroundRepeat: "no-repeat",
      }}
    >
      {userNickname ? (
        <SocketProvider userNickname={userNickname}>
          <ChatRoom />
        </SocketProvider>
      ) : (
        <Lobby goToChatRoom={goToChatRoom} />
      )}
    </Box>
  );
}
