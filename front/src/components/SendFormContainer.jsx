import React from "react";
import styled from "styled-components";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { TextareaAutosize } from "@mui/material";

const SendFormContainer = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {};

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <TextareaAutosize />
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
