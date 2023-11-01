const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      unique: true,
      required: true,
    },
    roomName: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", RoomSchema);
