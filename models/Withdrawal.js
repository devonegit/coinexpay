import mongoose from 'mongoose';
const { Schema } = mongoose;

const WithdrawalSchema = new mongoose.Schema({
    wid: Number,
    coin: String,
    paymentGateway: String,
    withdrawalType: String,
    withdrawalFee:Object,
    destinationAddress:{
        type:String,
        default:""
    },
    destinationEmailAddress:{
        type:String,
        default:""
    },
    withdrawAmount:Object,
    paymentResponse: Object,
    captcha: String,
    claimByName: String,
    processedAt: Date,
    claimBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    status: String
   
  
}, { timestamps: true });       

export default mongoose.model('Withdrawals', WithdrawalSchema);