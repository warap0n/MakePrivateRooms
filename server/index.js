const express = require("express");
const app = express();
const PORT = 5000;
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

app.listen(PORT, () => {
  console.log("server is running");
});
