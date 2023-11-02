import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const CreateRoom = ({ created, setCreated }) => {
  const [url, setUrl] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const inputRef = useRef();
  const createdHandler = async (e) => {
    const roomName = inputRef.current.value;
    if (!roomName) {
      return;
    }
    try {
      const response = await axios.post(`/room`, { roomName: roomName });
      const roomId = response.data.roomId;
      console.log(roomId);

      setUrl(`http://warap0n.com:53681/chat?roomId=${roomId}`);
    } catch (err) {
      console.log(err);
      setDuplicate(true);
      return;
    }
    setCreated(true);
    setDuplicate(false);
  };
  return (
    <Container>
      {created ? (
        <div className="responseContainer">
          <h2>Success</h2>
          <p className="url">URL</p>
          <p>{url}</p>
          <img src={url} alt="QRコード" />
          <p className="share">
            Let's share this link or QR code with those you want to invite!
          </p>
        </div>
      ) : (
        <>
          <div className="inputContainer">
            <div className="inputRoomName">
              <p>What's your room name?</p>
              <div className="input">
                <p className="console">&gt;</p>
                <input type="text" ref={inputRef} />
              </div>
              {duplicate ? (
                <p className="alert">this name has been used</p>
              ) : (
                ""
              )}
            </div>
            <button onClick={createdHandler}>Create</button>
          </div>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  .inputContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;

    .alert {
      font-size: 20px;
      margin-left: 60px;
      color: #ff2e2e;
    }

    .inputRoomName {
      display: flex;
      flex-direction: column;
    }
    .input {
      display: flex;
      padding: 20px;
      input {
        border: 1px solid #696969; /* 薄い灰色の境界線を設定 */
        border-radius: 10px;
        margin-left: 10px;
        padding-left: 10px;
        color: white;
        &:focus {
          outline: none;
        }
      }
    }
    p {
      font-size: 30px;
    }
  }

  .responseContainer {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-size: 30px;
      margin-bottom: 30px;
    }
    p {
      width: 280px;
      min-width: 1px;
      overflow-wrap: break-word;
    }

    .url {
      color: #09f409;
    }

    img {
      margin-top: 50px;
    }

    .share {
      text-align: center;
      margin-top: 30px;
    }

    @media screen and (min-height: 600px) and (min-width: 720px) {
      margin-top: 0;
      h2 {
        font-size: 80px;
      }
      p {
        width: 100%;
        font-size: 30px;
      }
    }
  }
`;

export default CreateRoom;
