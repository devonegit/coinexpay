import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    sessionId: String,
    status: {
        type: String,
        default: "Active",
    },
    expiryTime: { type: Date, required: true, expires: 0 },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

sessionSchema.index({ expiryTime: 1 }, { expireAfterSeconds: 0 }); // TTL index configuration


export default mongoose.model("session", sessionSchema);
