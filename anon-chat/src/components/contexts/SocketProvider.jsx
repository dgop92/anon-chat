import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ userNickname, children }) {
  const [socket, setSocket] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_CHAT_WEBSOCKET_SERVER, {
      query: { userNickname },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setSocketConnected(true);
    });
    newSocket.on("disconnect", () => {
      setSocketConnected(false);
    });

    return () => {
      newSocket.close();
      newSocket.off("connect");
      newSocket.off("disconnect");
    };
  }, [userNickname]);

  return (
    <SocketContext.Provider value={{ socket, userNickname, socketConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
