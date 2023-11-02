import styled from "styled-components";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { TextareaAutosize } from "@mui/material";
import { useUserInfoContext } from "./UserInfoProvider";
import axios from "axios";

const SendFormContainer = ({ setMessages, sendMessage }) => {
  const [message, setMessage] = useState("");
  const { roomId, senderIp } = useUserInfoContext();

  const postMessage = async (data) => {
    await axios.post(
      `https://make-private-rooms-server-849c15b38d63.herokuapp.com/api/message`,
      data
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendingData = {
      message: message,
      roomId,
      senderIp,
    };
    // setMessages((prevMessages) => [...prevMessages, sendingData]);
    sendMessage(message);
    setMessage("");
    postMessage(sendingData);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <TextareaAutosize
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
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

  .input {
    background-color: #535353;
  }

  textarea {
    width: 230px;
    height: 30px;
    padding: 5px 10px;
    border-radius: 30px;
    margin-right: 10px;
    border: none;
    resize: none;
    font-size: 18px;
    background-color: white;

    &:focus {
      outline: none;
    }
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    background-color: #535353;
  }
  .css-i4bv87-MuiSvgIcon-root {
    background-color: #535353;
    color: #08ce08;

    &:hover {
      color: #069506;
    }
  }

  @media screen and (min-width: 720px) {
    textarea {
      width: 500px;
    }
  }
`;

export default SendFormContainer;
