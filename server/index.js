const express = require("express");
const app = express();
const PORT = 5000;
const messageRoute = require("./routes/message");
const roomRoute = require("./routes/room");
const mongoose = require("mongoose");
require("dotenv").config();

//データベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => {
    console.log(err);
  });

//ミドルウェア
app.use(express.json());
app.use("/api/message", messageRoute);
app.use("/api/room", roomRoute);

app.listen(PORT, () => {
  console.log("server is running on port 5000");
});
