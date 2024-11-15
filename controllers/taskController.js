import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import ClaimHistory from "../models/ClaimHistory.js";
import Coins from "../models/Coins.js";
import Tasks from "../models/Tasks.js";
import Bonus from "../models/Bonus.js";
import { encrypt } from "../utils/encryption.js";
import BigNumber from "bignumber.js";
import day from "dayjs";


export const addTask = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }
    const { taskType, counts, description } = req.body;
    console.log(req.body);
    req.body.createdBy = req.user.userId;
    const updateTask = await Tasks.create(req.body);

    res.status(StatusCodes.OK).json({ msg: "updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const getTaskList = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "user") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }
  const list = await Tasks.find();
  res.status(StatusCodes.OK).json(encrypt({ list }));
};

export const taskDelete = async (req, res) => {
  const removeTask = await Tasks.findByIdAndDelete(req.params.id);
  if (!removeTask) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Task not found" });
  }
  res.status(StatusCodes.OK).json({ msg: "task deleted" });
};

export const editTask = async (req, res) => {
  try {
    const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Task not found" });
    }
    res.status(StatusCodes.OK).json({ msg: "successfully modified" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const getTaskList_User = async (req, res) => {
  try {
    const taskList = await Tasks.find({ status: "Active" }).sort({
      createdAt: -1,
    });
    const claimListToday = await ClaimHistory.find({
      claimBy: req.user.userId,
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    }).sort({ createdAt: -1 });

    const newObject = taskList.map((task, index) => {
      const claimCount = claimListToday.filter(
        (claim) => claim.taskId === task._id
      ).length;
      return {
        id: task._id,
        serial: index + 1,
        description: task.description,
        task: `${
          claimListToday.filter((item) => item.type === "Manual-Faucet")
            .length >= task.counts
            ? task.counts
            : claimListToday.filter((item) => item.type === "Manual-Faucet")
                .length
        }/${task.counts}`,
        link: "/dashboard/manual-faucet",
      };
    });

    res
      .status(StatusCodes.OK)
      .json(encrypt({ msg: "successfully modified", list: newObject }));
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};
