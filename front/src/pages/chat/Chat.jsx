import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import ChatContainer from "../../components/ChatContainer";
import styled from "styled-components";
import SendFormContainer from "../../components/SendFormContainer";
import socketIOClient from "socket.io-client";

const Chat = ({ someProp }) => {
  let { id } = useParams();
  const [messages, setMessages] = useState([]);
  const socket = socketIOClient("http://localhost:5000");

  useEffect(() => {
    // ルームに参加
    const roomId = "653bf165cb7795d9daed5674";
    socket.emit("joinRoom", roomId);

    // チャットメッセージを受信
    // socket.on("chatMessage", (message) => {
    //   setMessages([...messages, message]);
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Container>
        <TopBar roomName={"roomName"} />
        <ChatContainer messages={messages} setMessages={setMessages} />
        <SendFormContainer setMessages={setMessages} />
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
