import React, { useEffect } from "react";
import styled from "styled-components";
import dummyData from "./dummyData.json";
import axios from "axios";
import { useUserInfoContext } from "./UserInfoProvider";
import { Navigate, useNavigate } from "react-router-dom";

const ChatContainer = ({ messages, setMessages }) => {
  const { roomId } = useUserInfoContext();
  const navigate = useNavigate();

  //apiからmessagesを取得
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`message/${roomId}`);
        console.log(response.data);
        setMessages(response.data);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
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
  margin-bottom: 50px;
  @media screen and (min-width: 720px) {
    padding-left: 20px;
    padding-top: 10px;
  }

  .chatContainer {
    padding: 15px 10px;
    display: flex;
  }
  .showIp {
    display: flex;
    color: #09f409;
    /* font-size: 14px; */
  }

  .ip {
    font-size: 15px;
    margin-top: 3px;
    margin-right: 3px;
    @media screen and (min-width: 720px) {
      margin-right: 5px;
      font-size: 20px;
    }
  }

  .symbol {
    margin-top: 1px;
    @media screen and (min-width: 720px) {
      margin-top: 4px;
    }
  }

  .message {
    min-width: 1px;
    word-wrap: break-word;
    color: white;
    margin-left: 5px;
    @media screen and (min-width: 720px) {
      margin-top: 4px;
    }
  }
`;

export default ChatContainer;
