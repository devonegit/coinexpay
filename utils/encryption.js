import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";
dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

export const encrypt = (data) => {
  const text = JSON.stringify(data);
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
};
