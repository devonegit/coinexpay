import axios from "axios";
import https from 'https';
import * as dotenv from "dotenv";
dotenv.config();
// Configuration
const apiBase = "https://faucetpay.io/api/v1/";
const defaultCurrency = "BTC";

// Helper function for API requests
const exec = async (method, params = {}, options = {}) => {
  const apiKey = process.env.FAUCETPAY_API_KEY; // Get API key from .env
  const url = `${apiBase}${method}`;
  const mergedParams = {
    ...params,
    api_key: apiKey,
    currency: params.currency || defaultCurrency,
  };

  try {
    const response = await axios.post(url, mergedParams, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: `${getHost()} (axios)`,
      },
      timeout: 10000, // Timeout for 10 seconds
      httpsAgent: new https.Agent({
        rejectUnauthorized: options.verifyPeer !== false,
      }), 
    });

    return response.data;
  } catch (error) {
    console.error("Communication error:", error);
    return null;
  }
};

// Get host for the referer header
const getHost = () => {
  return typeof window !== "undefined" && window.location.host
    ? window.location.host
    : "Unknown";
};

// Send payment
export const sendPayment = async (
  to,
  amount,
  userIp,
  currency = defaultCurrency,
  referral = false
) => {
  const params = {
    to,
    amount,
    ip_address: userIp,
    referral: referral ? "true" : "false",
    currency,
  };

  const response = await exec("send", params);

  if (response && response.status === 200) {
    return {
      success: true,
      message: "Payment sent to you using FaucetPay.io",
      balance: response.balance,
      balanceBitcoin: response.balance_bitcoin,
      userHash: response.payout_user_hash,
    };
  }

  return {
    success: false,
    message: response?.message || "Unknown error",
  };
};

// Check address hash
export const checkAddressHash = async (address, currency = defaultCurrency) => {
  const params = { address, currency };
  const response = await exec("checkaddress", params);
  return response?.payout_user_hash || "";
};

// Get payouts
export const getPayouts = async (count, currency = defaultCurrency) => {
  const params = { count, currency };
  return await exec("payouts", params);
};

// Get available currencies
export const getCurrencies = async () => {
  const response = await exec("currencies");
  return response?.currencies || null;
};

// Get balance
export const getBalance = async (currency = defaultCurrency) => {
  const response = await exec("balance", { currency });
  return response;
};

