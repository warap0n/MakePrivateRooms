const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema(
  {
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

module.exports = mongoose.model("Message", MessageSchema);
