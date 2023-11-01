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
  try {
    const messages = await Message.find({
      roomId: req.query.roomId,
    });
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
