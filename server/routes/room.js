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
  const newRoom = new Room({
    roomId: roomId,
    roomName: req.body.roomName,
  });

  try {
    const savedRoom = await newRoom.save();
    return res.status(200).json(savedRoom);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//roomNameを取得
router.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId }); // roomUrlを使って検索
    if (room) {
      return res.status(200).json(room);
    } else {
      return res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
