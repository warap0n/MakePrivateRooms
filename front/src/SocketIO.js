import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://warap0n.com:53681");

socket.on("disconnect", () => {
  console.log("Disconnected from the server.");
  window.location.reload();
});

export default socket;
