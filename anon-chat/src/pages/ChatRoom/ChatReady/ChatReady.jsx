import React, { useEffect, useState } from "react";
import { MessageContainer } from "../MessageContainer";
import { InputContainer } from "../InputContainer";

export default function ChatReady({ socket, userNickname }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket == null) return undefined;

    socket.on("new-message", (data) => {
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
