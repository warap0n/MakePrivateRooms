import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import socketIOClient from "socket.io-client";

function App() {
  const socket = socketIOClient("http://localhost:5000");

  useEffect(() => {
    // ルームに参加
    const roomId = "653bf165cb7795d9daed5674";
    socket.emit("joinRoom", roomId);

    // チャットメッセージを受信
    // socket.on("chatMessage", (message) => {
    //   setMessages([...messages, message]);
    // });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/:id" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
