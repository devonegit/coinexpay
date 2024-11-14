import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Series from "../models/Series.js";
import Sessions from "../models/Sessions.js";
import Coins from "../models/Coins.js";
import Withdrawal from "../models/Withdrawal.js";
import SupportTicket from "../models/SupportTicket.js";
import ClaimHistory from "../models/ClaimHistory.js";
import Bonus from "../models/Bonus.js";
import { encrypt } from "../utils/encryption.js";
import BigNumber from "bignumber.js";
import requestIp from "request-ip";
import day from "dayjs";
import { comparePassword, hashPassword } from "../utils/password.js";
import { sendMail } from "../utils/mail.js";
import crypto from "crypto";
import { cp } from "fs";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  const ipAddress = requestIp.getClientIp(req);

  console.log(`User 's IP address: ${ipAddress}`);

  res
    .status(StatusCodes.OK)
    .json(encrypt({ user: user.withoutPasswordEmail() }));
};

export const addLoyaltyBonus = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  const bonusAll = user.bonus;
  const loyaltyBonus = bonusAll.find((bonus) => bonus.name === "loyalty");
  const bonusIndex = bonusAll.indexOf(loyaltyBonus);

  if (loyaltyBonus.details === undefined) {
    if (loyaltyBonus.value === 0) {
      const newObject = {
        name: "loyalty",
        value: 1,
        details: {
          lastLoginDate: day().format("DD-MMM-YYYY hh:mm A"),
          last50Logins: [],
        },
      };
      // Update the therapy object in the array
      bonusAll[bonusIndex] = newObject;
    }
  }

  // const updated = await User.findOneAndUpdate(
  //   { _id: req.user.userId },
  //   { $set: { bonus: bonusAll } },
  //   {
  //     new: true,
  //   }
  // );

  // console.log(updated);

  res
    .status(StatusCodes.OK)
    .json(encrypt({ msg: "Loyalty bonus added successfully" }));
};

export const addCoin = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }
    const { cryptoNameFull, cryptoNameShort } = req.body;

    // Validate request body
    if (!cryptoNameFull || !cryptoNameShort) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Missing required fields" });
    }

    // Check if the coin already exists in any user's coins array
    const existingCoin = await User.findOne({
      "coins.cryptoNameShort": cryptoNameShort,
    });

    // If the coin already exists, return an error
    if (existingCoin) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Coin already exists in one or more users" });
    }

    // Update all users with the new coin
    const updateResult = await User.updateMany(
      {}, // Filter: empty object means all users
      {
        $addToSet: {
          coins: {
            cryptoNameFull,
            cryptoNameShort,
            balanceSatoshi: 0,
            balance: "0.00000000",
          },
        },
      } // $addToSet ensures coin is added only if not present
    );

    const updateCoins = await Coins.create({
      cryptoNameFull,
      cryptoNameShort,
      status: "Inactive",
      baseRewardSatoshi: 0,
      baseReward: "0.00000000",
      timer: 1,
    });

    res.status(StatusCodes.OK).json({ msg: "updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const updateBonus = async (req, res) => {
  const { bonus } = req.params;
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(encrypt({ msg: "User not found" }));
  }

  if (bonus === "task") {
    const bonusIndex = user.bonus.findIndex((item) => item.name === bonus);
    if (bonusIndex === -1) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(encrypt({ msg: "Invalid bonus" }));
    }

    const taskBonus = user.bonus[bonusIndex];

    //first time login
    const bonusAll = user.bonus;
    if (taskBonus.bonusHistory === undefined) {
      if (taskBonus.value === 0) {
        const newObject = {
          name: "task",
          value: 1,
          bonusHistory: [
            { type: "FirstLogin", date: day().format("DD-MMM-YYYY hh:mm A"),lastClaimDate: day().format("DD-MMM-YYYY hh:mm A"),
              lastClaimDelay: 0, name: "task", value: 1 },
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
        res.status(StatusCodes.OK).json(encrypt({ msg: "success" }));
      }
    }

    //subsequent logins
    const now = day();
    const latestClaimDate = taskBonus.bonusHistory?.[0]?.date;
    const dayDifference = latestClaimDate
      ? now.diff(latestClaimDate, "days")
      : 0;

    if (dayDifference <= 10) {
      taskBonus.value += 1;
      taskBonus.bonusHistory.unshift({
        type: "Increase",
        date: now.format("DD-MMM-YYYY hh:mm A"),
        lastClaimDate: latestClaimDate,
        lastClaimDelay: dayDifference,
        name: "task",
        value: taskBonus.value += 1,
        
      });
    } else if (dayDifference > 10) {
      taskBonus.value = 1;
      taskBonus.bonusHistory.unshift({
        type: "Reset",
        date: now.format("DD-MMM-YYYY hh:mm A"),
        lastClaimDate: latestClaimDate,
        lastClaimDelay: dayDifference,
        name: "task",
        value: taskBonus.value = 1,
      });
    }

    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { bonus: user.bonus } },
      {
        new: true,
      }
    );
    res.status(StatusCodes.OK).json(encrypt({ msg: "success" }));
  }
};

export const getBonus = async (req, res) => {
  try {
    const { bonus } = req.params;
    const user = await User.findOne({ _id: req.user.userId });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(encrypt({ msg: "User not found" }));
    }

    // Find the bonus directly using `find`
    const bonusData = user.bonus.find((item) => item.name === bonus);

    if (!bonusData) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(encrypt({ msg: "Invalid bonus" }));
    }

    // Send success response with the bonus data
    return res
      .status(StatusCodes.OK)
      .json(encrypt({ msg: "success", bonusData }));
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(encrypt({ msg: "Internal server error" }));
  }
};

export const getReferredUserList = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(encrypt({ msg: "User not found" }));
    }

    // // Query to find users referred by this user (assuming `referBy` stores the userID of the referrer)
    const referredUsers = await User.find({
      "referHistory.referBy": user.userID,
    });

    // Map through the referred users to get username and last login
    const userList = referredUsers.map((referredUser) => {
      const lastLogin =
        referredUser.bonus.length > 0 &&
        referredUser.bonus[0].bonusHistory.length > 0
          ? referredUser.bonus[0].bonusHistory[0].date // Access the last login date
          : null; // Set to null if not available

      const isActive =
        day().diff(new Date(lastLogin), "days") < 5 ? true : false;

      return {
        username: referredUser.username,
        lastLogin,
        isActive,
      };
    });

    // Send success response with the bonus data
    return res
      .status(StatusCodes.OK)
      .json(encrypt({ msg: "success", list: userList }));
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(encrypt({ msg: "Internal server error" }));
  }
};

export const getUserData_userId = async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(encrypt({ msg: "Unauthorized" }));
  }
  try {
    const userId = req.params.id;
    const [userData, session, withdrawals, claims, tickets] = await Promise.all(
      [
        User.findOne({ _id: userId }).select({
          username: 1,
          coins: 1,
          status: 1,
          activity: 1,
          bonus: 1,
          ipHistory: 1,
        }),
        Sessions.find({ userId }),
        Withdrawal.find({ claimBy: userId }).sort({ createdAt: -1 }),
        ClaimHistory.find({ claimBy: userId }).sort({ createdAt: -1 }),
        SupportTicket.find({ createdBy: userId }).sort({ createdAt: -1 }),
      ]
    );
    // Check if user exists
    if (!userData) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(encrypt({ msg: "User not found" }));
    }
    // Update userData.coins array
    const updatedCoins = userData.coins.map((coin) => ({
      ...coin,
      name: `${coin.cryptoNameFull} (${coin.cryptoNameShort})`,
    }));
    // Determine if user is logged in
    const isLoggedIn = session.length > 0;

    //merged array of bonus
    let combinedBonus = [];

    const loyaltyBonus = userData.bonus.find((bonus) => bonus.name === "loyalty");
    const taskBonus = userData.bonus.find((bonus) => bonus.name === "task");
    
    
    if(taskBonus.bonusHistory !== undefined || loyaltyBonus.bonusHistory !== undefined){
      if (loyaltyBonus) {
        combinedBonus = [...combinedBonus, ...loyaltyBonus.bonusHistory];
      }
      
      if (taskBonus && taskBonus.bonusHistory && taskBonus.bonusHistory.length > 0) {
        combinedBonus = [...combinedBonus, ...taskBonus.bonusHistory];
      }
    }
    
    // // Add a serial number to each item in the combined array
    // combinedBonus = combinedBonus.map((item, index) => ({
    //   ...item,
    //   serial: index + 1, // Start serial numbers from 1
    // }));
    
    console.log(combinedBonus);

    


    res.status(StatusCodes.OK).json(
      encrypt({
        msg: "success",
        data: {
          coins: updatedCoins,
          status: userData.status,
          activity: userData.activity,
          ipHistory: userData.ipHistory,
          bonus: userData.bonus,
          username: userData.username,
          combinedBonus,
          isLoggedIn,
          withdrawals,
          claims,
          tickets,
        },
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const updateUserData_userId = async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(encrypt({ msg: "Unauthorized" }));
  }
  try {
    if (req.body.type === "user-active-inactive-switch") {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { status: req.body.status } },
        {
          new: true,
        }
      );
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(encrypt({ msg: "User not found" }));
      }
      res.status(StatusCodes.OK).json(encrypt({ msg: "success" }));
    }
    if (
      req.body.type === "user-login-logout-switch" &&
      req.body.status === "inactive"
    ) {
      const session = await Sessions.findOneAndDelete({
        userId: req.params.id,
      });
      if (!session) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(encrypt({ msg: "session not found" }));
      }
      res.status(StatusCodes.OK).json(encrypt({ msg: "success" }));
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "user") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }

  const { confirmPassword, currentPassword } = req.body;
  if (!confirmPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Password is required" });
  }
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    const isValidUser =
      user && (await comparePassword(currentPassword, user.password));

    if (!isValidUser) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Incorrect password" });
    }

    const hashedPassword = await hashPassword(confirmPassword);
    if (!hashedPassword) {
      throw new Error("Failed to hash password");
    }

    const updateUser = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { $set: { password: hashedPassword } },
      {
        new: true,
      }
    );
    if (!updateUser) {
      throw new Error("Failed to update user");
    }

    const session = await Sessions.findOneAndDelete({
      userId: req.user.userId,
    });
    if (!session) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "session not found" });
    }

    res.status(StatusCodes.OK).json({
      msg: "success",
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const getEmail = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "user") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }
  try {
    const user = await User.findOne({ _id: req.user.userId }).select({
      email: 1,
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(encrypt({ msg: "User not found" }));
    }

    // Send success response with the bonus data
    return res
      .status(StatusCodes.OK)
      .json(encrypt({ msg: "success", email: user.email }));
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(encrypt({ msg: "Internal server error" }));
  }
};

export const updateProfile = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "user") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }

  const { username, newEmail } = req.body;

  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    const isEmailExist = await User.findOne({ email: newEmail });
    if (isEmailExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Email already exists" });
    }

    // send mail
    const emailVerifyToken = crypto.randomBytes(20).toString("hex");
    const url = `http://localhost:5173/user/mail-confirmation/${emailVerifyToken}/${user.userID}`;
    const mail = await sendMail(
      user.email,
      "User Profile Update",
      `Hello,<br>Please click on this <a href="${url}">link</a> to verify your email`
    );

    // Prepare update fields
    const updateFields = {};
    if (username) updateFields.username = username;
    if (newEmail) updateFields.email = newEmail;

    //update request array
    const requests = user.updateRequests;

    const newObject = {
      type: "profile-update",
      date: day().format("DD-MMM-YYYY hh:mm:ss A"),
      data: updateFields,
      status: "pending",
      verifyToken: emailVerifyToken,
      expiresAt: day().add(1, "day").format("DD-MMM-YYYY hh:mm:ss A"), // Add expiration date
    };
    requests.unshift(newObject);

    const updated = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { updateRequests: requests } },
      {
        new: true,
      }
    );

    res.status(StatusCodes.OK).json({
      msg: "success",
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const confirmEmail = async (req, res) => {
  const { token, id } = req.params;

  try {
    const user = await User.findOne({ userID: id });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }
    const requests = user.updateRequests;
    const request = requests.find((item) => item.verifyToken === token);

    if (!request) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Invalid token" });
    }

    if (request.status !== "pending") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Request already processed" });
    }

    if (request.expiresAt < day().format("DD-MMM-YYYY hh:mm:ss A")) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Token expired" });
    }

    const updated = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          updateRequests: requests,
          username: request.data.username,
          email: request.data.email,
        },
      },
      {
        new: true,
      }
    );
    if (!updated) {
      throw new Error("Failed to update user");
    }
    const session = await Sessions.findOneAndDelete({
      userId: user._id,
    });
    if (!session) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "session not found" });
    }

    res.status(StatusCodes.OK).json({
      msg: "success",
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const updateProfileAndPassword_byAdmin = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    const updateData = {};

    // Handle password update
    if (req.body.password) {
      const hashedPassword = await hashPassword(req.body.password);
      if (!hashedPassword) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: "Failed to hash password" });
      }
      updateData.password = hashedPassword;
    }

    // Handle email and username updates
    if (req.body.email || req.body.username) {
      if (req.body.email) {
        const isEmailExist = await User.findOne({ email: req.body.email });
        if (isEmailExist) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Email already exists" });
        }
        updateData.email = req.body.email;
      }
      if (req.body.username) {
        updateData.username = req.body.username;
      }
    }

    if (Object.keys(updateData).length > 0) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      );
      if (!updatedUser) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: "Failed to update user" });
      }

      // Optionally clear user sessions
      await Sessions.deleteMany({ userId: req.params.id });

      return res.status(StatusCodes.OK).json({ msg: "success" });
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No valid fields to update" });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const getUsersList_Admin = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }
  try {
    const userList = await User.find({ role: "user" }).sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json(
      encrypt({
        msg: "success",
        data: userList,
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const registerUser_Admin = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    // Hash password
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      throw new Error("Failed to hash password");
    }
    req.body.password = hashedPassword;

    //userid
    const series = await Series.findOne();
    req.body.userID = series.userSeries + 1;
    req.body.status = "active";
    await Series.updateOne({}, { $set: { userSeries: req.body.userID } });

    //transformed coin
    const coins = await Coins.find().lean();
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
      } = coin;

      return {
        ...rest,
        balanceSatoshi: 0,
        balance: "0.00000000",
      };
    });

    //role and referral
    req.body.role = "user";
    req.body.referHistory = {
      isRefer: false,
      referBy: null,
    };
    //create user
    const user = await User.create({
      ...req.body,
      isEmailVerified: true,
      emailVerifyToken: "",

      coins: transformedCoins,
      bonus: [
        { name: "loyalty", value: 0 },
        { name: "referral", value: 0 },
        { name: "mystery", value: 0 },
        { name: "task", value: 0 },
      ],
    });

    res.status(StatusCodes.OK).json({
      msg: "success",
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};
