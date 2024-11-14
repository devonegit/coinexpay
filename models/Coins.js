import mongoose from 'mongoose';
const { Schema } = mongoose;

const CoinSchema = new mongoose.Schema({
    cryptoNameFull: String,
    cryptoNameShort: String,
    timer: String,
    status: {
        type: String,
        default: "Inactive",
    },
    baseRewardSatoshi: {
        type:Number,
        default: 0
    },
    faucetBalance: {
        type:Object,
        default: {}
    },

    baseReward: {
        type:String,
        default: "0.00000000"
    },
  
}, { timestamps: true });       

export default mongoose.model('Coin', CoinSchema);