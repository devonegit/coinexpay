import Coins from "../models/Coins.js";
import { StatusCodes } from "http-status-codes";
import { encrypt } from "../utils/encryption.js";
import BigNumber from "bignumber.js";
import { convertToLargeString } from "../utils/coins.js";

export const getCoinList = async (req, res) => {
  const list = await Coins.find();
  res.status(StatusCodes.OK).json(encrypt({ list }));
};

export const editCoin = async (req, res) => {
  // let balance = new BigNumber("0.0000000056");
  // let addition = new BigNumber(convertToLargeString(85));

  // // Adding the balance and the value
  // req.body.baseReward = balance.plus(addition).toFixed(10);
 if(req.body.numberValue) {
    req.body.baseRewardSatoshi = req.body.numberValue
    req.body.baseReward = convertToLargeString(req.body.numberValue);
 }

  const updatedCoin = await Coins.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "successfully modified" });
};


export const coinDelete = async (req, res) => {
  console.log(req.params.id);
  const removeCoin = await Coins.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'coin deleted'});

};

