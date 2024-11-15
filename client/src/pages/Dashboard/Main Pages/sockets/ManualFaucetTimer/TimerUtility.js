import { io } from "socket.io-client";

let socket;

export const connectSocket = (claimID, coin) => {
  if (!socket) {
    socket = io("http://localhost:5100/timer", {
      withCredentials: true,
      query: {
        room: "timer",
        coin,
        claimID,
      },
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToTimer = (claimID, coin, callback) => {
  
  if (socket) {

    // Emit request for timer with claimID and coin
    const data = {
      claimID,
      coin,
    };
    socket.emit("start-timer", data);
  
    // Ensure the callback is a function before invoking it
    socket.on("timer", (response) => {
      callback(response); // Call the callback with the response
    });
  };
};

export const subscribeToTimerExpired = (callback) => {
  if (!socket) return;
  socket.on("expired-timer", (data) => {
    callback(data);
  });
};
