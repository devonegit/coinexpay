import mongoose from 'mongoose';
const { Schema } = mongoose;

const ClaimHistorySchema = new mongoose.Schema({
    claimID: Number,
    type: String,
    coin: String,
    rewardSatoshi: Number,
    claimData: {
        type:Object,
        default: {}
    },
    reward: String,
    nextClaimUnlocketAt: Date,
    claimBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    balanceAfter: Object,
    claimByName: String,
    status: String
   
  
}, { timestamps: true });       

export default mongoose.model('Claims', ClaimHistorySchema);