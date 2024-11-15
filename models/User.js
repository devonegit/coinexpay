import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  userID:Number,
  referHistory:{
    type: Object,
    default: {}
  },
  coins: {
    type: Array,
    default: [],
  },
  bonus:{
    type: Array,
    default: [],
  },
  updateRequests:{
    type: Array,
    default: [],
  },
  activity:{
    type: Array,
    default: [],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  ipHistory: {
    type: Array,
    default: [],
  },
  isEmailVerified: { type: Boolean, default: false },
  emailVerifyToken: String,
  
}, { timestamps: true });

UserSchema.methods.withoutPassword = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

UserSchema.methods.withoutPasswordEmail = function () {
  let obj = this.toObject();
  delete obj.password;
  delete obj.email;
  return obj;
};

export default mongoose.model('User', UserSchema);