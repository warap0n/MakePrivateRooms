const Room = require("../models/Room");
const Message = require("../models/Room");
const router = require("express").Router();

//roomを作成
router.post("/", async (req, res) => {
  const getRandomString = (length, result = "") => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    if (length <= 0) {
      return result;
    }

    const randomIndex = Math.floor(Math.random() * chars.length);
    return getRandomString(length - 1, result + chars[randomIndex]);
  };
  const roomId = getRandomString(20) + new Date().getTime();
  const roomName = req.body.roomName;
  // 既存のルームを検索
  const existingRoom = await Room.findOne({ roomName: roomName });

  if (existingRoom) {
    // すでに同じ名前のルームが存在する場合
    return res.status(400).json({ error: "The room name already exists." });
  }
  const newRoom = new Room({
    roomId: roomId,
    roomName: roomName,
  });

  try {
    const savedRoom = await newRoom.save();
    return res.status(200).json(savedRoom);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//roomNameを取得
router.get("/", async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.query.roomId }); // roomUrlを使って検索

    return res.status(200).json(room);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
