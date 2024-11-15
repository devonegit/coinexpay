import { StatusCodes } from "http-status-codes";
import User from "../../models/User.js";
import Coins from "../../models/Coins.js";

let connectedUsersNew = new Set();
const timerStateStore = new Map();
const activeTimers = new Map();

const timerController = async (socket) => {
  console.log("New client connected Timer Controller:", socket.user);

  socket.on("start-timer", async (data) => {
    if (socket.user.role === "user") {
      try {
        console.log(timerStateStore);
        console.log(socket.user.userId);

        //if data.coin === useEffect then return its active timer data means user refresh or unmount the page
        if (data.coin === "useEffect") {
          console.log('called useEffect');
          if (activeTimers.has(socket.user.userId)) {
            const remainingTimeInSeconds = timerStateStore.get(
              socket.user.userId
            );
            console.log('called timer');
            startTimer(socket, remainingTimeInSeconds);
          }
        } else if (timerStateStore.has(socket.user.userId)) {
          // If a timer already exists, retrieve remaining time
          const remainingTimeInSeconds = timerStateStore.get(
            socket.user.userId
          );
          startTimer(socket, remainingTimeInSeconds);
        } else {
          const getCoinTimer = await Coins.findOne({
            cryptoNameFull: data.coin,
          }).select({ timer: 1, status: 1 });

          if (!getCoinTimer) {
            console.log("No timer found for the coin:", data.coin);
            return;
          }
          let initialTimeInSeconds = Number(getCoinTimer.timer) * 60 + 240;
          // Save initial time and start the timer
          timerStateStore.set(socket.user.userId, initialTimeInSeconds);
          startTimer(socket, initialTimeInSeconds);
        }
      } catch (error) {
        console.error("Error in timerController:", error);
        socket.disconnect();
      }
    }
  });

  socket.on("disconnect", async () => {
    console.log("Client disconnected");
    if (socket.user.role === "user") {
      connectedUsersNew.delete(Number(socket.user.userId));
      // Optionally, keep the timer state even if disconnected
    }
  });
};

// Function to start the timer
const startTimer = (socket, remainingTimeInSeconds) => {

  // Clear any existing timer for this user
  if (activeTimers.has(socket.user.userId)) {
    console.log(`Clearing existing timer for user: ${socket.user.userId}`);
    clearInterval(activeTimers.get(socket.user.userId).interval);
  }

  const timerInterval = setInterval(() => {
    if (remainingTimeInSeconds > 0) {
      remainingTimeInSeconds -= 1;
      timerStateStore.set(socket.user.userId, remainingTimeInSeconds);
      console.log("remaining time:", remainingTimeInSeconds);
      socket.emit("timer", {
        remainingTimeInSeconds,
      });
    } else {
      console.log("Timer has expired for user:", socket.user.userId);
      socket.emit("expired-timer", { message: "Timer has expired" });
      clearInterval(timerInterval);
      timerStateStore.delete(socket.user.userId);
      activeTimers.delete(socket.user.userId);
    }
  }, 1000);

  // Store the interval reference in activeTimers
  activeTimers.set(socket.user.userId, { interval: timerInterval });
};


export default timerController;
