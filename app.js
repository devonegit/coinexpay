import "express-async-errors";

import * as dotenv from "dotenv";
dotenv.config();


import express from "express";
const app = express();

import cors from "cors";

import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

//router
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import coinRouter from "./routes/coin.js";
import claimRouter from "./routes/claim.js";
import taskRouter from "./routes/task.js";
import supportRouter from "./routes/support.js";
import withdrawalRouter from "./routes/withdrawal.js";
console.log('testing put')



// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// middleware
import errorHandlerMiddleware from "./middleware/error.js";
import { authenticateUser } from "./middleware/auth.js";
import { socketAuth } from "./middleware/socket.js";


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/coins", authenticateUser, coinRouter);
app.use("/api/v1/tasks", authenticateUser, taskRouter);
app.use("/api/v1/claim", authenticateUser, claimRouter);
app.use("/api/v1/support", authenticateUser, supportRouter);
app.use("/api/v1/withdrawal", authenticateUser, withdrawalRouter);

app.get('/ip', async(req, res) => {
  const data = await checkIPInfo(req, true);
  console.log("Real IP (Direct):", data);
  res.send("Check your console for the IP address");
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

// ********************************************************************Socket={.io} start*********************

import http from "http";
import { Server } from "socket.io";
import { socketController } from "./controllers/supportController.js";
import supportController from './controllers/socketControllers/supportController.js';
import timerController from './controllers/socketControllers/timerController.js';
import { supportsocketAuth, timersocketAuth } from "./middleware/socket.js";
import { checkIPHub, checkIPInfo, getIP } from "./utils/IP/checkIP.js";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL (Vite)
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Use the socket authentication middleware
socketAuth(io);

// Define namespaces for different routes
const supportNamespace = io.of("/support");
const timerNamespace = io.of("/timer");

// Pass the namespace to the respective controllers
supportNamespace.use(supportsocketAuth(supportNamespace));
timerNamespace.use(timersocketAuth(timerNamespace));

supportNamespace.on("connection", (socket) => supportController(socket,io, supportNamespace));
timerNamespace.on("connection", (socket) => timerController(socket,timerNamespace));


// Pass io to the socketController
io.on("connection", (socket) => socketController(socket, io));



// ********************************************************************Socket={.io} end*********************

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.URI);
  server.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
