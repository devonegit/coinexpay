import { StatusCodes } from "http-status-codes";
import Coins from "../models/Coins.js";
import Bonus from "../models/Bonus.js";
import Series from "../models/Series.js";
import User from "../models/User.js";
import Sessions from "../models/Sessions.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { createJWT } from "../utils/token.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { nanoid } from "nanoid";
import * as dotenv from "dotenv";
dotenv.config();
import { verifyJWT } from "../utils/token.js";
import day from "dayjs";
import { checkIPInfo } from "../utils/IP/checkIP.js";

export const register = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  if (req.body.referHistory.isRefer === true) {
    const SourceUser = await User.findOne({
      userID: Number(req.body.referHistory.referBy),
    });

    if (!SourceUser) {
      return res.status(400).json({ message: "Invalid refer code" });
    }
    req.body.referHistory.referByName = SourceUser.username;
    req.body.referHistory.referByID = SourceUser.id;
  }

  if (!username || !email || !password || !confirmpassword) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "admin" : "user";

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      throw new Error("Failed to hash password");
    }
    req.body.password = hashedPassword;

    const emailVerifyToken = crypto.randomBytes(20).toString("hex");

    //set existing coins array
    const coins = await Coins.find().lean(); // Use .lean() to get plain JavaScript objects instead of Mongoose documents
    const transformedCoins = coins.map((coin) => {
      const {
        timer,
        _id,
        status,
        baseRewardSatoshi,
        baseReward,
        createdAt,
        updatedAt,
        __v,
        ...rest
      } = coin; // Exclude 'unwantedProperty' from the new object
      // Add new properties
      return {
        ...rest,
        balanceSatoshi: 0, // Add the new property
        balance: "0.00000000",
      };
    });
    const series = await Series.findOne();
    req.body.userID = isFirstAccount ? 1000000 : series.userSeries + 1;
    req.body.status = "active";

    if (isFirstAccount) {
      await Series.create({ userSeries: req.body.userID });
    } else {
      await Series.updateOne({}, { $set: { userSeries: req.body.userID } });
    }

    const user = await User.create({
      ...req.body,
      isEmailVerified: false,
      emailVerifyToken,

      coins: transformedCoins,
      bonus: [
        { name: "loyalty", value: 0 },
        { name: "referral", value: 0 },
        { name: "mystery", value: 0 },
        { name: "task", value: 0 },
      ],
    });

    const url = `http://localhost:5173/register/mail-confirmation/${user.emailVerifyToken}`;
    await nodemailer
      .createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
      .sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Verify Email",
        html: `Hello,<br>Please click on this <a href="${url}">link</a> to verify your email`,
      });

    res.status(StatusCodes.CREATED).json({ msg: "user successfully register" });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ emailVerifyToken: token });
    if (!user) {
      throw new Error("Invalid token");
    }
    user.isEmailVerified = true;
    user.emailVerifyToken = "";
    await user.save();
    res.status(StatusCodes.OK).json({ msg: "Email verified succesfully" });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
  if (user.isEmailVerified === false)
    throw new UnauthorizedError("Please verify your email");
  if (user.status === "inactive")
    throw new UnauthorizedError(
      "Please contact admin! Your account is deactivated"
    );

  //generate session id
  const sessionId = nanoid(64);

  const token = createJWT({
    userId: user._id,
    role: user.role,
    session: sessionId,
  });

  // const expireTime = 1000 * 60 * 60 * 6;
  const expireTime = 1000 * 60 * 60 * 6;
  const session = await Sessions.findOne({ userId: user._id });

  if (session) {
    // Delete old session if it exists
    await Sessions.deleteMany({ userId: user._id });
  }

  //create new session id
  await Sessions.create({
    userId: user._id,
    sessionId,
    status: "active",
    expiryTime: new Date(Date.now() + expireTime),
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + expireTime),
    secure: process.env.NODE_ENV === "production",
  });

  //set loyalty bonus for users
  const bonusAll = user.bonus;
  const useractivity = user.activity || [];
  const useripHistory = user.ipHistory || [];
  const loyaltyBonus = bonusAll.find((bonus) => bonus.name === "loyalty");
  const bonusIndex = bonusAll.indexOf(loyaltyBonus);

  //first time logins
  if (loyaltyBonus.bonusHistory === undefined) {
    console.log("called first");
    if (loyaltyBonus.value === 0) {
      const newObject = {
        name: "loyalty",
        value: 1,
        bonusHistory: [
          {
            type: "FirstLogin",
            date: day().format("DD-MMM-YYYY hh:mm A"),
            lastLoginDate: day().format("DD-MMM-YYYY hh:mm A"),
            lastLoginDelay: 0,
            name: "loyalty",
            value: 1,
          },
        ],
      };
      // Update the therapy object in the array
      bonusAll[bonusIndex] = newObject;
      const updated = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { bonus: bonusAll } },
        {
          new: true,
        }
      );
    }
  }

  //Subsequent Logins
  if (loyaltyBonus.bonusHistory !== undefined) {
    console.log("called second");

    const latestClaim = loyaltyBonus.bonusHistory[0];

    const minuteDifference = day().diff(new Date(latestClaim.date), "minutes");
    //if minute difference is less than greater than 1440 but less than 2880
    if (minuteDifference > 1 && minuteDifference < 3) {
      const newObject = {
        name: "loyalty",
        value: loyaltyBonus.value + 1,
        bonusHistory: [
          {
            type: "Increase",
            date: day().format("DD-MMM-YYYY hh:mm A"),
            lastLoginDate: latestClaim.date,
            lastLoginDelay: minuteDifference,
            name: "loyalty",
            value: loyaltyBonus.value + 1,
          },

          ...loyaltyBonus.bonusHistory,
        ],
      };
      // Update the therapy object in the array
      bonusAll[bonusIndex] = newObject;
      const updated = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { bonus: bonusAll } },
        {
          new: true,
        }
      );
    }

    //if minute difference is less than greater than 2880
    if (minuteDifference > 3) {
      const latestClaim = loyaltyBonus.bonusHistory[0];

      const newObject = {
        name: "loyalty",
        value: 1,
        bonusHistory: [
          {
            type: "Reset",
            date: day().format("DD-MMM-YYYY hh:mm A"),
            lastLoginDate: latestClaim.date,
            lastLoginDelay: minuteDifference,
            name: "loyalty",
            value: 1,
          },

          ...loyaltyBonus.bonusHistory,
        ],
      };

      // Update the therapy object in the array
      bonusAll[bonusIndex] = newObject;
      const updated = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { bonus: bonusAll, activity: useractivity } },
        {
          new: true,
        }
      );
    }
  }

  // Update user activity
  const newActivity = {
    id: useractivity.length + 1,
    type: "Login",
    date: day().format("DD-MMM-YYYY hh:mm:ss A"),
  };
  useractivity.push(newActivity);

  // Update user ipHistory
  const ipInfo = await checkIPInfo(req);
  const ipExists = await useripHistory.find((entry) => {
    return String(entry.ip) === String(ipInfo.ip);
  });

  if (ipExists === undefined) {
    const newIpHistory = {
      id: useripHistory.length + 1,
      ...ipInfo,
      date: day().format("DD-MMM-YYYY hh:mm:ss A"),
    };
    useripHistory.push(newIpHistory);
  }

  const updated = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { activity: useractivity, ipHistory: useripHistory } },
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

export const logout = async (req, res) => {
  const { token } = req.cookies;
  const { userId } = verifyJWT(token);
  const session = await Sessions.findOne({ userId });

  if (session) {
    // Delete old session if it exists
    await Sessions.deleteMany({ userId });
  }

  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  const user = await User.findOne({ _id: userId }).select({
    activity: 1,
  });

  let useractivity = user.activity || [];

  // Update user activity
  const newActivity = {
    id: useractivity.length + 1,
    type: "Logout",
    date: day().format("DD-MMM-YYYY hh:mm:ss A"),
  };

  // Push the new activity
  useractivity.push(newActivity);
  const updated = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { activity: useractivity } },
    {
      new: true,
    }
  );
  // Optionally, you can check if the update was successful
  if (!updated) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to update activity" });
  }
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
