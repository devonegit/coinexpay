import mongoose from "mongoose";
const { Schema } = mongoose;

const BonusHistorySchema = new mongoose.Schema(
  {
    claimId: String,
    type: String,
    claimBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    details: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bonus", BonusHistorySchema);
