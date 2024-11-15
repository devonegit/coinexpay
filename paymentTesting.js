import { getBalance, getCurrencies } from "./utils/services/faucetpay.js";



(async () => {
  const balance = await getCurrencies();
  console.log(balance);
})();
