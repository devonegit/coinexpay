import React, { useState, useEffect } from "react";
import { BreadCrumb, ComingSoon } from "../../../../components";
import {
  FaCheckCircle,
  FaDollarSign,
  FaWallet,
  FaPlusCircle,
  FaRegCreditCard,
  FaMoneyBillWaveAlt,
  FaPlus,
} from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import styled from "styled-components";

import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import customFetch from "../../../../utils/customFetch";
import { useQuery } from "react-query";
import { decrypt, decryptExit } from "../../../../utils/decryption";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  /* Wrapper styles remain unchanged */
`;

const CreateWithdrawal = () => {
  const [cryptocoins, setCryptocoins] = useState([]);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    coin: "",
    availableBalance: { balance: "0.00000000", balanceSatoshi: 0 },
    paymentGateway: "",
    withdrawalFee: { balance: "0.00000000", balanceSatoshi: 0 },
    withdrawAmount: { balance: "0.00000000", balanceSatoshi: 0 },
    withdrawalType: "Normal",
    captcha: "",
    destinationAddress: "",
    destinationEmailAddress: "",

  });

  const { refetch: coinList } = useQuery(
    "coinList",
    async () => {
      const { data } = await customFetch.get("/withdrawal/get-list");
      return data;
    },
    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }

        setCryptocoins(dataDecrypt.list);
      },

      onError: (error) => {
        toast.error(error.response.data.msg);
      },
      cacheTime: 1000 * 60 * 60,
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    // Calculate withdrawal fee based on withdrawal type
    const calculateWithdrawalFee = () => {
      switch (formState.withdrawalType) {
        case "Instant":
          return { balance: "0.00000010", balanceSatoshi: 10 }; // Example fee for Instant
        case "Normal":
        default:
          return { balance: "0.00000005", balanceSatoshi: 5 }; // Example fee for Normal
      }
    };

    // Update withdrawal fee automatically
    setFormState({
      ...formState,
      withdrawalFee: calculateWithdrawalFee(),
    });
  }, [formState.withdrawalType]);

  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "Withdrawal", href: "/dashboard/withdrawal" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (e.target.type === "select-one") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const selectedValue = selectedOption.value;

      if (name === "coin") {
        const coinData = cryptocoins.find(
          (uCoin) => uCoin.cryptoNameFull === selectedValue
        );

        setFormState({
          ...formState,
          coin: selectedValue,
          availableBalance: {
            balance: coinData.balance,
            balanceSatoshi: coinData.balanceSatoshi,
          },
        });

        return;
      }
      if (name === "withdrawalType") {
        setFormState({
          ...formState,
          withdrawalType: selectedValue,
        });

        return;
      }
      if (name === "paymentGateway") {
        setFormState({
          ...formState,
          paymentGateway: selectedValue,
        });

        return;
      }
      if (name === "captcha") {
        setFormState({
          ...formState,
          captcha: selectedValue,
        });

        return;
      }
    }
    if (name === "withdrawAmount") {
      setFormState({
        ...formState,
        withdrawAmount: {
          balance: value,
          balanceSatoshi: Math.round(value * 100000000),
        },
      });

      return;
    }
    if (name === "destinationAddress") {
      setFormState({
        ...formState,
        destinationAddress: value,
      });

      return;
    }
    if (name === "destinationEmailAddress") {
      setFormState({
        ...formState,
        destinationEmailAddress: value,
      });

      return;
    }
  };

  const handleSubmit = async (e) => {
    if (!recaptchaToken)
      return toast.error("Please verify captcha", { autoClose: 1000 });
    if (!formState.coin)
      return toast.error("Please select crypto coin", { autoClose: 1000 });
    if ((formState.paymentGateway === "Direct-Wallet") && !formState.destinationAddress)
      return toast.error("Please enter crypto wallet address", { autoClose: 1000 });

    try {
      setLoading(true);

      const { data } = await customFetch.post(`/withdrawal/create-withdrawal`, {
        ...formState,
      });

      toast.success("Withdrawal created successfully", {
        autoClose: 1000,
      });
      
      setLoading(false);
      coinList();
      setFormState({
        coin: "",
        availableBalance: { balance: "0.00000000", balanceSatoshi: 0 },
        paymentGateway: "",
        withdrawalFee: { balance: "0.00000000", balanceSatoshi: 0 },
        withdrawAmount: { balance: "0.00000000", balanceSatoshi: 0 },
        withdrawalType: "Normal",
        captcha: "",
        destinationAddress: "",
        destinationEmailAddress: "",
        

      });
      navigate("/dashboard/withdraw/history")
    } catch (error) {
      console.log(error)
      
      toast.error(error.response.data.msg, {
        autoClose: 1000,
      });
    }
  };

  const setMaxAmount = () => {
    setFormState({
      ...formState,
      withdrawAmount: {
        balance: formState.availableBalance.balance,
        balanceSatoshi: formState.availableBalance.balanceSatoshi,
      },
    });
  };

  const isFormDisabled = !formState.coin; // Form is disabled if no currency is selected

  return (
    <Wrapper>
      <div>
        <BreadCrumb title="Withdrawal" breadcrumbs={breadcrumbs} />

        <div className="flex flex-col md:flex-row md:space-x-8 md:justify-between mt-8">
          <div className="flex flex-col space-y-4 mb-8 md:mb-0 hidden lg:flex">
            <div
              className="bg-gray-200 p-4 rounded-lg"
              style={{ width: "300px", height: "250px" }}
            >
              Left Ad Space 300×250
            </div>
            <div
              className="bg-gray-200 p-4 rounded-lg"
              style={{ width: "300px", height: "600px" }}
            >
              Left Ad Space 300×600
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white p-5 rounded-lg shadow-md glassmorphism">
            <form>
              <h2 className="text-xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                  Withdrawal
                </span>
              </h2>
              <div className="flex justify-between mb-4 items-center">
                <div>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
                    onClick={() => navigate("/dashboard/withdraw/history")}
                  >
                    <FaPlus className="mr-2" />
                    Withdrawal History
                  </button>
                </div>
              </div>

              <hr className="my-4 border-t border-gray-300" />
              <div className="mb-8 text-gray-700">
                {/* Content goes here */}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="currency"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Select Cryptocurrency
                </label>
                <div className="flex items-center border rounded-md bg-blue-50">
                  <span className="p-3 text-blue-500">
                    <FaDollarSign />
                  </span>
                  <select
                    id="coin"
                    name="coin"
                    className="w-full p-3 border-0 rounded-md bg-transparent"
                    value={formState.coin}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  >
                    <option value="" disabled>
                      Select Cryptocurrency
                    </option>
                    {cryptocoins.map(
                      (coin, index) =>
                        coin.status === "Active" && (
                          <option key={index} value={coin.cryptoNameFull}>
                            {coin.cryptoNameShort} - {coin.cryptoNameFull}
                          </option>
                        )
                    )}
                  </select>
                </div>
                {formState.coin && (
                  <div className="flex items-center border rounded-md bg-blue-50 p-2 mt-4">
                    <FaWallet className="text-blue-500 mr-8 ml-1" />
                    <div className="flex-1 text-gray-600 font-semibold">
                      Available Balance
                    </div>
                    <div className="flex-1 text-gray-500 font-semibold text-right">
                      {formState.availableBalance.balance}
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="withdrawAmount"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Amount to Withdraw
                </label>
                <div className="flex items-center border rounded-md bg-blue-50">
                  <span className="p-3 text-blue-500">
                    <FaPlusCircle />
                  </span>
                  <input
                    type="number"
                    id="withdrawAmount"
                    name="withdrawAmount"
                    className="w-full p-3 border-0 rounded-md bg-transparent"
                    value={formState.withdrawAmount.balance}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    min="0"
                    max={formState.availableBalance.balance}
                    step="0.00000001"
                    disabled={isFormDisabled}
                  />
                  <button
                    type="button"
                    className="p-3 text-blue-500 hover:bg-blue-100 rounded-md disabled:cursor-not-allowed"
                    onClick={setMaxAmount}
                    disabled={isFormDisabled}
                  >
                    Max
                  </button>
                </div>
                {formState.withdrawAmount.balance &&
                  parseFloat(formState.withdrawAmount.balance) >
                    parseFloat(formState.availableBalance.balance) && (
                    <p className="text-red-500 text-sm mt-2">
                      Amount exceeds available balance.
                    </p>
                  )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="withdrawalType"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Withdrawal Type
                </label>
                <div className="flex items-center border rounded-md bg-blue-50">
                  <span className="p-3 text-blue-500">
                    <FaRegCreditCard />
                  </span>
                  <select
                    id="withdrawalType"
                    name="withdrawalType"
                    className="w-full p-3 border-0 rounded-md bg-transparent"
                    value={formState.withdrawalType}
                    onChange={handleInputChange}
                    disabled={isFormDisabled}
                  >
                    <option value="Normal">Normal</option>
                    <option value="Instant">Instant</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="paymentGateway"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Payment Gateway
                </label>
                <div className="flex items-center border rounded-md bg-blue-50">
                  <span className="p-3 text-blue-500">
                    <FaRegCreditCard />
                  </span>
                  <select
                    id="paymentGateway"
                    name="paymentGateway"
                    className="w-full p-3 border-0 rounded-md bg-transparent"
                    value={formState.paymentGateway}
                    onChange={handleInputChange}
                    disabled={isFormDisabled}
                  >
                    <option value="" disabled>
                      Select Gateway
                    </option>
                    <option value="FaucetPay">FaucetPay</option>
                    <option value="Express-Crypto">ExpressCrypto</option>
                    <option value="Coinbase">Coinbase</option>
                    <option value="Direct-Wallet">Direct Wallet</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="withdrawalFee"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Withdrawal Fee
                </label>
                <div className="flex items-center border rounded-md bg-blue-50">
                  <span className="p-3 text-blue-500">
                    <FaMoneyBillWaveAlt />
                  </span>
                  <input
                    type="number"
                    id="withdrawalFee"
                    name="withdrawalFee"
                    className="w-full p-3 border-0 rounded-md bg-transparent"
                    value={formState.withdrawalFee.balance}
                    onChange={handleInputChange}
                    placeholder="0.0000000000"
                    step="0.0000000001"
                    disabled={true} // Disable the field
                  />
                </div>
              </div>
              {
                (formState.paymentGateway === "FaucetPay" || formState.paymentGateway === "Express-Crypto" || formState.paymentGateway === "Coinbase") ? (
                  <>
                     <div className="mb-4">
                <label
                  htmlFor="destinationEmailAddress"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email Address
                </label>
                <div className="flex items-center border rounded-md bg-blue-50">
                  <span className="p-3 text-blue-500">
                    <FaMoneyBillWaveAlt />
                  </span>
                  <input
                    type="text"
                    id="destinationEmailAddress"
                    name="destinationEmailAddress"
                    className="w-full p-3 border-0 rounded-md bg-transparent"
                    value={formState.destinationEmailAddress}
                    onChange={handleInputChange}
                    placeholder={`Please enter ${formState.paymentGateway} linked email address`}
                    
                  />
                </div>
              </div>
                  </>
                ):formState.paymentGateway === "Direct-Wallet"  ? (
                  <>
                   <div className="mb-4">
                <label
                  htmlFor="withdrawalFee"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Wallet Address
                </label>
                <div className="flex items-center border rounded-md bg-blue-50">
                  <span className="p-3 text-blue-500">
                    <FaMoneyBillWaveAlt />
                  </span>
                  <input
                    type="text"
                    id="destinationAddress"
                    name="destinationAddress"
                    className="w-full p-3 border-0 rounded-md bg-transparent"
                    value={formState.destinationAddress}
                    onChange={handleInputChange}
                    placeholder="Please enter destination crypto wallet address"
                    
                  />
                </div>
              </div>
           
                  </>
                ):null
              }

             
              <div className="mb-4">
                <label
                  htmlFor="captcha"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Captcha
                </label>
                <div className="flex items-center border rounded-md bg-blue-50">
                  <span className="p-3 text-blue-500">
                    <IoMdCheckmarkCircle />
                  </span>
                  <select
                    id="captcha"
                    name="captcha"
                    className="w-full p-3 border-0 rounded-md bg-transparent"
                    onChange={(e) => handleInputChange(e)}
                    value={formState.captcha}
                    disabled={isFormDisabled}
                  >
                    <option value="" disabled>
                      Select Captcha
                    </option>
                    <option value="recaptcha">reCAPTCHA</option>
                    {/* <option value="hcaptcha">hCAPTCHA</option>
                    <option value="solvemedia">SolveMedia</option> */}
                  </select>
                </div>
              </div>
              <div className="mb-4 flex justify-center">
                {formState.captcha === "recaptcha" ? (
                  <div className="w-full max-w-xs">
                    <ReCAPTCHA
                      sitekey="6LfmfqUpAAAAAESMBqkR921Hr-dY-VnRac55bw-H"
                      onChange={(token) => {
                        setRecaptchaToken(token);
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-md flex items-center space-x-2 hover:from-blue-600 hover:to-blue-800 ${
                    isFormDisabled
                      ? "opacity-50 disabled:cursor-not-allowed"
                      : ""
                  }`}
                  onClick={handleSubmit}
                  disabled={isFormDisabled}
                >
                  <FaCheckCircle />
                  <span>Withdraw</span>
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-col space-y-4 mb-8 md:mb-0 hidden lg:flex md:flex">
            <div
              className="bg-gray-200 p-4 rounded-lg"
              style={{ width: "300px", height: "250px" }}
            >
              Right Ad Space 300×250
            </div>
            <div
              className="bg-gray-200 p-4 rounded-lg"
              style={{ width: "300px", height: "600px" }}
            >
              Right Ad Space 300×600
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div
            className="bg-gray-200 p-4 rounded-lg"
            style={{ width: "728px", height: "90px" }}
          >
            Bottom Ad Space 728×90
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateWithdrawal;
