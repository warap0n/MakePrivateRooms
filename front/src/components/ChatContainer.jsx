import React, { useEffect } from "react";
import styled from "styled-components";
import dummyData from "./dummyData.json";
import axios from "axios";

const ChatContainer = ({ messages, setMessages }) => {
  //apiからmessagesを取得

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/message/653bf165cb7795d9daed5674`
      );
      console.log(response.data);
      setMessages(response.data);
    };
    fetchMessages();
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
