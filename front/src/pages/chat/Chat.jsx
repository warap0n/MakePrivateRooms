import React from "react";
import { useParams } from "react-router-dom";

const Chat = ({ someProp }) => {
  let { id } = useParams();
  return <div>Chat, {id}</div>;
};

export default Chat;
