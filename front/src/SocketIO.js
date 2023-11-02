import socketIOClient from "socket.io-client";

const socket = socketIOClient(
  "https://make-private-rooms-server-849c15b38d63.herokuapp.com"
);

socket.on("disconnect", () => {
  console.log("Disconnected from the server.");
  window.location.reload();
});

export default socket;
