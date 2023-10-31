import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:5000");

socket.on("disconnect", () => {
  console.log("Disconnected from the server.");
  window.location.reload();
});

export default socket;
