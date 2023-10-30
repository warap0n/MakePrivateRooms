import React, { useEffect } from "react";
import styled from "styled-components";
import dummyData from "./dummyData.json";

const ChatContainer = ({ messages, setMessages }) => {
  useEffect(() => {
    setMessages(dummyData);
  }, []);
  return (
    <Container>
      {messages.map((data, index) => (
        <div className="chatContainer" key={index}>
          <div className="showIp">
            <div className="ip">{data.senderIp}</div>{" "}
            <div className="symbol">&gt;</div>
          </div>
          <div className="message">{data.message}</div>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 50px;

  .chatContainer {
    padding: 20px 10px;
    display: flex;
  }
  .showIp {
    display: flex;
    color: #09f409;
    /* font-size: 14px; */
  }

  .message {
    min-width: 1px;
    word-wrap: break-word;
    color: white;
    margin-left: 5px;
  }
`;

export default ChatContainer;
