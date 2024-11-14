import mongoose from "mongoose";
const { Schema } = mongoose;

const TicketSchema = new mongoose.Schema(
  {
    ticketId:Number,
    type: String,
    description: String,
    conversation:{
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "Open",
    },
    createdByName: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", TicketSchema);
