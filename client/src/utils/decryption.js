import CryptoJS from "crypto-js";
// import { useNavigate } from "react-router-dom";
import customFetch from "./customFetch";
// const DECRYPTION_KEY = import.meta.env.VITE_API_KEY;
const DECRYPTION_KEY = 'secret1234';
import { toast } from "react-toastify";

export const decrypt = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, DECRYPTION_KEY);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  } catch (error) {
    return { error };
  }
};

export const decryptExit = async () => {
  await customFetch.get("/auth/logout");
  toast.error("Unauthorized Access", {
    autoClose: 2000,
  });
};
