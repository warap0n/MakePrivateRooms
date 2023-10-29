import React from "react";
import styled from "styled-components";
import dummyData from "./dummyData.json";

const ChatContainer = () => {
  return (
    <Container>
      {dummyData.map((data, index) => (
        <div className="chatContainer" key={index}>
          <div className="showIp">
            <div className="ip">{data.senderIp}</div>{" "}
            <div className="symbol">&gt;</div>
          </div>
          <div className="message">
            {data.message}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdf
          </div>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  .chatContainer {
    margin-top: 15px;
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
