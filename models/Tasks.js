import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema(
  {
    type: String,
    counts: Number,
    description: String,
    status: {
      type: String,
      default: "Inactive",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
  },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
