import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "../../components/TopBar";
import ChatContainer from "../../components/ChatContainer";
import styled from "styled-components";
import SendFormContainer from "../../components/SendFormContainer";
import socket from "../../SocketIO";
import { UserInfoProvider } from "../../components/UserInfoProvider";
import axios from "axios";

const Chat = ({ someProp }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get("roomId");
  console.log(roomId);
  const [messages, setMessages] = useState([]);
  const [senderIp, setSenderIp] = useState();
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  const sendMessage = (message) => {
    socket.emit("chatMessage", {
      message,
      roomId,
      senderIp,
    });
  };

  //senderIp, roomName取得
  useEffect(() => {
    const getIp = async () => {
      // fetchを使ってipapi.coに接続
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setSenderIp(data.ip);
      } catch (err) {
        console.log(err);
        navigate("/error");
      }
    };
    getIp();
    const getRoomName = async () => {
      try {
        const response = await axios.get(
          `https://make-private-rooms-server-849c15b38d63.herokuapp.com/api/room?roomId=${roomId}`
        );
        if (!response.data) {
          navigate("/error");
        }
        console.log(response);
        setRoomName(response.data.roomName);
      } catch (err) {
        console.log(err);
      }
    };
    getRoomName();
  }, []);

  //socket
  useEffect(() => {
    // ルームに参加
    // const roomId = "653bf165cb7795d9daed5674";
    socket.emit("joinRoom", roomId);

    // チャットメッセージを受信
    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <UserInfoProvider senderIp={senderIp} roomId={roomId} roomName={roomName}>
        <Container>
          <TopBar />
          <ChatContainer messages={messages} setMessages={setMessages} />
          <SendFormContainer
            setMessages={setMessages}
            sendMessage={sendMessage}
          />
        </Container>
      </UserInfoProvider>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #393939;
`;

export default Chat;
