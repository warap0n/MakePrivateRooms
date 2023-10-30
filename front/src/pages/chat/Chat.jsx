import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import ChatContainer from "../../components/ChatContainer";
import styled from "styled-components";
import SendFormContainer from "../../components/SendFormContainer";
import socket from "../../SocketIO";

const Chat = ({ someProp }) => {
  const [messages, setMessages] = useState([]);
  const roomId = "653bf165cb7795d9daed5674";

  const sendMessage = (message) => {
    const roomId = "653bf165cb7795d9daed5674";

    socket.emit("chatMessage", { message, roomId, senderIp: "125.555.111.22" });
  };

  useEffect(() => {
    // ルームに参加
    // const roomId = "653bf165cb7795d9daed5674";
    socket.emit("joinRoom", roomId);

    // チャットメッセージを受信
    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <Container>
        <TopBar roomName={"roomName"} />
        <ChatContainer messages={messages} setMessages={setMessages} />
        <SendFormContainer
          setMessages={setMessages}
          sendMessage={sendMessage}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #393939;
`;

export default Chat;
