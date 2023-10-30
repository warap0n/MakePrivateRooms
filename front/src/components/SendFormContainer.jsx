import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { TextareaAutosize } from "@mui/material";

const SendFormContainer = ({ setMessages, sendMessage }) => {
  const ref = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: ref.current.value,
        roomId: "653bf165cb7795d9daed5674",
        senderIp: "125.555.111.22",
      },
    ]);
    sendMessage(ref.current.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <TextareaAutosize ref={ref} />
        </div>
        <div className="button">
          <button type="submit">
            <SendIcon />
          </button>
        </div>
      </form>
    </Container>
  );
};

const Container = styled.div`
  form {
    width: 100%;
    background-color: #535353;
    padding: 10px;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  textarea {
    width: 180px;
    height: 30px;
    padding: 5px 10px;
    border-radius: 30px;
    margin-right: 10px;
    border: none;
    resize: none;
    font-size: 20px;

    &:focus {
      outline: none;
    }
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  @media screen and (min-width: 720px) {
    textarea {
      width: 500px;
    }
  }
`;

export default SendFormContainer;
