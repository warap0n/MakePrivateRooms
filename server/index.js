const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
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
    // senderIpを匿名化する関数
    const anonymizeIP = (ip) => {
      // IPアドレスを分割
      const parts = ip.split(".");

      parts[3] = "**";

      // マスキングされたIPを結合して返す
      return parts.join(".");
    };
    let { message, roomId, senderIp } = data;
    senderIp = anonymizeIP(senderIp);
    const newMessage = { message, roomId, senderIp };

    // メッセージをルームの参加者に送信
    io.to(roomId).emit("chatMessage", newMessage);
  });

  // ルームに参加
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected.");
  });
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // レスポンスヘッダーにAccess-Control-Allow-Credentialsを追加。ユーザー認証等を行う場合は、これがないとブラウザがレスポンスを捨ててしまうそう。
  optionsSuccessStatus: 200, // レスポンスのHTTPステータスコードを「200(成功)」に設定
};

//ミドルウェア
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/message", messageRoute);
app.use("/api/room", roomRoute);

httpServer.listen(PORT, () => {
  console.log("server is running on port 5000");
});
