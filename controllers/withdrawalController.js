import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Coins from "../models/Coins.js";
import Withdrawal from "../models/Withdrawal.js";

import SupportTicket from "../models/SupportTicket.js";
import { encrypt } from "../utils/encryption.js";
import { convertToLargeString } from "../utils/coins.js";
import {
  checkIPHub,
  checkIPInfo,
  detectRevProxyProvider,
  getIP,
} from "../utils/IP/checkIP.js";
import {
  getBalance,
  getCurrencies,
  sendPayment,
} from "../utils/services/faucetpay.js";

export const getCoinList = async (req, res) => {
  try {
    const list = await Coins.find({ status: "Active" })
      .select({ cryptoNameFull: 1, cryptoNameShort: 1, status: 1 })
      .sort({ createdAt: -1 });
    const user = await User.findOne({ _id: req.user.userId }).select({
      coins: 1,
    });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(encrypt({ msg: "User not found" }));
    }

    // Combine the list of active coins with the user's coin balances
    const updatedList = list.map((coin) => {
      // Find if the user has a balance for the current coin
      const userCoin = user.coins.find(
        (uCoin) => uCoin.cryptoNameFull === coin.cryptoNameFull
      );

      // If the user has this coin, add the balance info to the coin object
      if (userCoin) {
        return {
          ...coin._doc, // Include all properties from the coin
          balanceSatoshi: userCoin.balanceSatoshi,
          balance: userCoin.balance,
        };
      }

      // If the user doesn't have this coin, return the coin as is
      return coin;
    });

    console.log(updatedList);
    res.status(StatusCodes.OK).json(encrypt({ list: updatedList }));
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const createWithdrawal = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User not found" });
    }
    //check withdrawal amount
    if (!req.body.withdrawAmount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid amount" });
    }
    if (
      convertToLargeString(req.body.withdrawAmount.balanceSatoshi) !==
      req.body.withdrawAmount.balance
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid amount" });
    }

    //deduct balance from user Find the user's coin entry in their coins array
    const updatedCoins = user.coins;
    const coinToUpdate = updatedCoins.find(
      (c) => c.cryptoNameFull === req.body.coin
    );

    if (!coinToUpdate) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Coin not found in user's account" });
    }

    coinToUpdate.balanceSatoshi -= req.body.withdrawAmount.balanceSatoshi;

    if (coinToUpdate.balanceSatoshi < 0) {
      // Check if balanceSatoshi becomes negative after withdrawal
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Insufficient balance" });
    }
    coinToUpdate.balance = convertToLargeString(coinToUpdate.balanceSatoshi);

    const updated = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { coins: updatedCoins } },
      {
        new: true,
      }
    );

    const latestWithdraw = await Withdrawal.findOne({}).sort({ createdAt: -1 });
    req.body.wid = latestWithdraw ? latestWithdraw.wid + 1 : 10000000;
    req.body.status = "Pending";
    req.body.claimBy = req.user.userId;
    req.body.claimByName = user.username;
    const withdraw = await Withdrawal.create(req.body);

    res.status(StatusCodes.OK).json(
      {
        msg: "success",
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

export const getWithdrawList = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ claimBy: req.user.userId })
      .select({
        createdAt: 1,
        wid: 1,
        coin: 1,
        paymentGateway: 1,
        status: 1,
        withdrawalType: 1,
        withdrawalFee: 1,
        withdrawAmount: 1,
        claimBy: 1,
        claimByName: 1,
        createdAt: 1,
      })
      .sort({ date: -1 }); // Sort by date in descending order

    res.status(StatusCodes.OK).json(
      encrypt({
        msg: "success",
        data: withdrawals,
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const getWithdrawList_Admin = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }
  try {
    const withdrawals = await Withdrawal.find({}).sort({ date: -1 }); // Sort by date in descending order

    res.status(StatusCodes.OK).json(
      encrypt({
        msg: "success",
        data: withdrawals,
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const rejectWithdraw_Admin = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }
  try {
    //get withdrawal data
    const withdrawal = await Withdrawal.findOne({
      _id: req.params.id,
    });

    if (!withdrawal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Request not found" });
    }

    if (withdrawal.status === "Rejected") {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Request already rejected" });
    }
    if (withdrawal.status === "Completed") {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Cannot reject completed request" });
    }

    //get user data
    const user = await User.findOne({ _id: withdrawal.claimBy });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    //add user fund
    const updatedCoins = user.coins;
    const coinToUpdate = updatedCoins.find(
      (c) => c.cryptoNameFull === withdrawal.coin
    );

    if (!coinToUpdate) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Coin not found in user's account" });
    }

    coinToUpdate.balanceSatoshi += withdrawal.withdrawAmount.balanceSatoshi;

    coinToUpdate.balance = convertToLargeString(coinToUpdate.balanceSatoshi);

    const updated = await User.findByIdAndUpdate(
      user._id,
      { $set: { coins: updatedCoins } },
      {
        new: true,
      }
    );

    //update withdrawal status
    await Withdrawal.findByIdAndUpdate(
      req.params.id,
      { $set: { status: "Rejected" } },
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

export const confirmWithdrawSingle_Admin = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }
  try {
    //get withdrawal data
    const withdrawal = await Withdrawal.findOne({
      _id: req.params.id,
    });

    if (!withdrawal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Request not found" });
    }
    if (withdrawal.status === "Rejected") {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Request rejected! Not able to confirm" });
    }

    if (withdrawal.status === "Completed") {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Request already completed" });
    }

    //get user data
    const user = await User.findOne({ _id: withdrawal.claimBy });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    // send user fund
    const coin = await Coins.findOne({ cryptoNameFull: withdrawal.coin });
    if(withdrawal.paymentGateway === 'FaucetPay' && withdrawal.destinationEmailAddress !== '') {

      const sendAmount = await sendPayment(
        withdrawal.destinationEmailAddress,
        withdrawal.withdrawAmount.balanceSatoshi,
        user.ipHistory[0].ip,
        coin.cryptoNameShort
      );

      if (sendAmount.success === false) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: sendAmount.message });
      }
      if(sendAmount.success === true) {
        const faucetBalance = {
          faucetpay:{

            balanceSatoshi:Number(sendAmount.balance),
            balance:sendAmount.balanceBitcoin
          }
        }
        const updateCoin = await Coins.findOneAndUpdate(
          { cryptoNameFull: withdrawal.coin },
          { $set: { faucetBalance } },
          { new: true }
        )
        const updatewithdrawal = await Withdrawal.findByIdAndUpdate(
          req.params.id,
          { $set: { paymentResponse:sendAmount, status: "Completed", processedAt: new Date() } },
          {
            new: true,
          }
        );

      }
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
