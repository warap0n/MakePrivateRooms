import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useUserInfoContext } from "./UserInfoProvider";
import { useNavigate } from "react-router-dom";

const ChatContainer = ({ messages, setMessages }) => {
  const { roomId, roomName, senderIp } = useUserInfoContext();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const scrollToBottom = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  //apiからmessagesを取得
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`message?roomId=${roomId}`);

        setMessages(response.data);
      } catch (err) {
        //おそらくここには到達しない
        console.log(err);
        navigate("/error");
      }
    };
    fetchMessages();
  }, []);
  //scroll
  useEffect(() => {
    // メッセージが追加された場合にスクロールを下に移動
    scrollToBottom();
  }, [messages]);
  return (
    <Container>
      {messages.length === 0 ? (
        <div className="initial">
          <h2>Welcome to {roomName} !</h2>
          <p>you can send a message here</p>
        </div>
      ) : (
        <>
          {messages.map((data, index) => (
            <div className="chatContainer" key={index} ref={containerRef}>
              <div className="showIp">
                <div className="ip">{data.senderIp}</div>{" "}
                <div className="symbol">&gt;</div>
              </div>
              <div className="message">{data.message}</div>
            </div>
          ))}
        </>
      )}

      <div className="chatContainer blink">
        <div className="showIp">
          <div className="ip">{senderIp}</div>{" "}
          <div className="symbol">&gt;</div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 70px;
  @media screen and (min-width: 720px) {
    padding-left: 20px;
    padding-top: 10px;
  }

  .initial {
    margin-top: 100px;
    color: #8e8d8d;
    text-align: center;

    h2 {
      font-size: 30px;
    }
    p {
      margin-top: 20px;
    }
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

  @keyframes blink {
    0% {
      opacity: 1;
    }
    40% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .chatContainer.blink {
    animation: blink 2s infinite; /* 1秒ごとに点滅 */
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
