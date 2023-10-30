import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import ChatContainer from "../../components/ChatContainer";
import styled from "styled-components";
import SendFormContainer from "../../components/SendFormContainer";

const Chat = ({ someProp }) => {
  let { id } = useParams();
  const [messages, setMessages] = useState([]);

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
