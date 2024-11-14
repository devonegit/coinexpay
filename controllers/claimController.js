import Coins from "../models/Coins.js";
import ClaimHistory from "../models/ClaimHistory.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { encrypt } from "../utils/encryption.js";
import { convertToLargeString } from "../utils/coins.js";
import day from "dayjs";

const getMysteryBonus = () => {
  const randomChance = Math.random() * 100; // Generate a random number between 0 and 100

  if (randomChance < 80) {
    // 80% chance for a number between 1 and 10
    return Math.floor(Math.random() * 10) + 1;
  } else if (randomChance < 90) {
    // 10% chance for a number between 10 and 50
    return Math.floor(Math.random() * 41) + 10;
  } else {
    // 10% chance for a number between 50 and 60
    return Math.floor(Math.random() * 11) + 50;
  }
};

export const claimManualFaucet = async (req, res) => {
  try {
    const coin = await Coins.findOne({ cryptoNameFull: req.body.cryptoCoin });
    if (!coin) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(encrypt({ msg: "Coin not found" }));
    }
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(encrypt({ msg: "User not found" }));
    }

    const latestClaim = await ClaimHistory.findOne({
      claimBy: req.user.userId,
    }).sort({ createdAt: -1 });

    //check timer locked and return timer if exist
    if (latestClaim) {
      const targetTime = day(latestClaim.nextClaimUnlocketAt);
      const now = day();
      let remainingSeconds = Math.max(0, targetTime.diff(now, "second"));
      if (remainingSeconds > 0) {
        return res.status(StatusCodes.OK).json(
          encrypt({
            msg: "locked",
            claimUnlockedAt: latestClaim.nextClaimUnlocketAt,
          })
        );
      }
    }

    //update referralBonus with active referral
    const referredUsers = await User.find({
      "referHistory.referBy": user.userID,
    });
    const filteredReferredUserList = referredUsers.map((referredUser) => {
      const lastLogin =
        referredUser.bonus.length > 0 &&
        referredUser.bonus[0].bonusHistory.length > 0
          ? referredUser.bonus[0].bonusHistory[0].date // Access the last login date
          : null; // Set to null if not available

      const isActive = lastLogin && day().diff(new Date(lastLogin), "days") < 5;

      return {
        username: referredUser.username,
        isActive,
      };
    });
    // Calculate active user count and cap at 100
    const activeUserCount = filteredReferredUserList.reduce(
      (count, user) => (user.isActive ? count + 1 : count),
      0
    );
    const cappedActiveUserCount = Math.min(activeUserCount, 100);

    const bonusAll = user.bonus;
    const referralBonusIndex = bonusAll.findIndex(
      (bonus) => bonus.name === "referral"
    );
    const mysteryBonusIndex = bonusAll.findIndex(
      (bonus) => bonus.name === "mystery"
    );

    const newObject_Referral = {
      name: "referral",
      value: cappedActiveUserCount,
    };

    const newObject_Mystery = {
      name: "mystery",
      value: getMysteryBonus(),
    };

    bonusAll[referralBonusIndex] = newObject_Referral;
    bonusAll[mysteryBonusIndex] = newObject_Mystery;

    //create more data for claim
    const baseReward = coin.baseRewardSatoshi;
    const loyaltyBonus = bonusAll.find((bonus) => bonus.name === "task").value;
    const referralBonus = newObject_Referral.value;
    const mysteryBonus = newObject_Mystery.value;
    const taskBonus = bonusAll.find((bonus) => bonus.name === "task").value;

    const loyaltyAmount = (baseReward * loyaltyBonus) / 100;
    const referralAmount = (baseReward * referralBonus) / 100;
    const mysteryAmount = (baseReward * mysteryBonus) / 100;
    const taskAmount = (baseReward * taskBonus) / 100;

    const totalReward =
      baseReward + loyaltyAmount + referralAmount + mysteryAmount + taskAmount;
    const roundedTotalReward = Math.floor(totalReward);
    const claimData = {
      baseReward,
      loyaltyBonus,
      referralBonus,
      mysteryBonus,
      taskBonus,
      loyaltyAmount,
      referralAmount,
      mysteryAmount,
      taskAmount,
      totalReward,
      roundedTotalReward,
    };

    // Find the user's coin entry in their coins array
    const updatedCoins = user.coins;
    const coinToUpdate = updatedCoins.find(
      (c) => c.cryptoNameFull === req.body.cryptoCoin
    );

    // Update the user's coin balance
    coinToUpdate.balanceSatoshi += roundedTotalReward;
    coinToUpdate.balance = convertToLargeString(coinToUpdate.balanceSatoshi);

    const updated = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { coins: updatedCoins, bonus: bonusAll } },
      {
        new: true,
      }
    );

    //calculate cid

    const lastClaim = await ClaimHistory.findOne({}).sort({ createdAt: -1 });


    const history = await ClaimHistory.create({
      claimID: lastClaim ? lastClaim.claimID + 1 : 10000000,
      type: "Manual-Faucet",
      coin: req.body.cryptoCoin,
      rewardSatoshi: roundedTotalReward,
      claimData,
      reward: convertToLargeString(roundedTotalReward),
      nextClaimUnlocketAt: day(new Date())
        .add(Number(coin.timer), "minute")
        .format("DD-MMM-YYYY hh:mm:ss A"),
      claimBy: req.user.userId,
      claimByName: user.username,
      balanceAfter: {
        balanceSatoshi: coinToUpdate.balanceSatoshi,
        balance: coinToUpdate.balance,
      },
      status: "Success",
    });

    res.status(StatusCodes.OK).json(
      encrypt({
        msg: "success",
        data: {
          coin: req.body.cryptoCoin,
          rewardSatoshi: coin.baseRewardSatoshi,
          referralBonus: cappedActiveUserCount,
          taskBonus: bonusAll.find((bonus) => bonus.name === "task").value,
          mysteryBonus: newObject_Mystery.value,
          claimID: history.claimID,
          claimUnlockedAt: day(new Date())
            .add(Number(coin.timer), "minute")
            .format("DD-MMM-YYYY hh:mm:ss A"),
        },
      })
    );
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(encrypt({ message: err.message }));
  }
};

export const getClaimsHistory = async (req, res) => {
  const list = await ClaimHistory.find({ claimBy: req.user.userId }).sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json(encrypt({ list }));
};
export const getClaimsHistoryToday = async (req, res) => {
  const list = await ClaimHistory.find({
    claimBy: req.user.userId,
    createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
  }).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json(encrypt({ list }));
};

export const getClaimsList_Admin = async (req, res) => {
  try {
    const claimHistory = await ClaimHistory.find()
      .select({
        claimID: 1,
        type: 1,
        coin: 1,
        rewardSatoshi: 1,
        claimData: 1,
        reward: 1,
        claimBy: 1,
        balanceAfter: 1,
        claimByName: 1,
        status: 1,
        createdAt: 1,
      })
      .sort({ date: -1 }); // Sort by date in descending order

    res.status(StatusCodes.OK).json(
      encrypt({
        msg: "success",
        data: claimHistory,
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};
