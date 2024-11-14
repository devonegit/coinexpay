import mongoose from "mongoose";

const SeriesSchema = new mongoose.Schema(
  {
    userSeries:{
      type: Number,
      default: 1000000,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Series", SeriesSchema);
