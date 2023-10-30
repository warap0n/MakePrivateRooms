const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

const PORT = 5000;
const messageRoute = require("./routes/message");
const roomRoute = require("./routes/room");
const mongoose = require("mongoose");
require("dotenv").config();

// モデルのインポート
const Room = require("./models/Room");
const Message = require("./models/Message");

//データベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => {
    console.log(err);
  });

//socket
io.on("connection", (socket) => {
  console.log("A user connected.");

  // チャットメッセージを受信
  socket.on("chatMessage", async (data) => {
    const { message, roomId, senderIp } = data;

    // メッセージをデータベースに保存
    // const newMessage = new Message({ text, roomId, sender });
    // await newMessage.save();
    const newMessage = { message, roomId, senderIp };

    // メッセージをルームの参加者に送信
    socket.to(roomId).emit("chatMessage", newMessage);
  });

  // ルームに参加
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected.");
  });
});

//ミドルウェア
app.use(express.json());
app.use("/api/message", messageRoute);
app.use("/api/room", roomRoute);

httpServer.listen(PORT, () => {
  console.log("server is running on port 5000");
});
