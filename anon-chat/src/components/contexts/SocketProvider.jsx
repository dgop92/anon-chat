import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ userNickname, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_CHAT_WEBSOCKET_SERVER, {
      query: { userNickname },
    });
    setSocket(newSocket);
    // console.log(newSocket);
    return () => newSocket.close();
  }, [userNickname]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
