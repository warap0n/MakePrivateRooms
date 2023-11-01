const Message = require("../models/Message");
const router = require("express").Router();

//メッセージを追加する
router.post("/", async (req, res) => {
  const { message, roomId, senderIp } = req.body;
  const newMessage = {
    message: message,
    roomId: roomId,
    senderIp: senderIp,
  };
  try {
    const newMessageInstance = new Message(newMessage);
    const savedMessage = await newMessageInstance.save();
    return res.status(200).json(savedMessage);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//メッセージを読み込む
router.get("/", async (req, res) => {
  // senderIpを匿名化する関数
  const anonymizeIP = (ip) => {
    // IPアドレスを分割
    const parts = ip.split(".");

    parts[3] = "**";

    // マスキングされたIPを結合して返す
    return parts.join(".");
  };
  try {
    const messages = await Message.find({
      roomId: req.query.roomId,
    });
    // senderIpを匿名化
    messages.forEach((message) => {
      message.senderIp = anonymizeIP(message.senderIp);
    });
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
