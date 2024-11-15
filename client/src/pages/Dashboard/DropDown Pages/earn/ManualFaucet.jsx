import {
  BreadCrumb,
  ComingSoon,
  ModalBox,
  Timer,
} from "../../../../components";
import { FaDollarSign, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
// import HCaptcha from '@hcaptcha/react-hcaptcha';
import { IoMdCheckmarkCircle } from "react-icons/io";
import styled from "styled-components";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import customFetch from "../../../../utils/customFetch";
import { useQuery } from "react-query";
import { decrypt, decryptExit } from "../../../../utils/decryption";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useEffect, useState } from "react";
import ManualFaucetTable from "./Source/Tables/ManualFaucetTable";
import {
  connectSocket,
  disconnectSocket,
  subscribeToTimer,
  subscribeToTimerExpired,
} from "../../Main Pages/sockets/ManualFaucetTimer/TimerUtility";
import {
  FaCoins,
  FaGift,
  FaQuestionCircle,
  FaTasks,
  FaEquals,
} from "react-icons/fa";
import { useDashboardContext } from "../../../../components/layout/DashboardLayout";

const Wrapper = styled.div``;

const ManualFaucet = () => {
  const [cryptocoins, setCryptocoins] = useState([]);
  const [claimHistory, setClaimHistory] = useState([]);
  const [modalClaimData, setModalClaimData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [totalTime, setTotalTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [formData, setFormData] = useState({
    cryptoCoin: "",
    captcha: "",
  });

  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const { user } = useDashboardContext();
  const loyalty = user.bonus.find((bonus) => bonus.name === "loyalty");

  const baseReward = modalClaimData.rewardSatoshi;
  const loyaltyBonus = loyalty.value;
  const referralBonus = modalClaimData.referralBonus;
  const mysteryBonus = modalClaimData.mysteryBonus;
  const taskBonus = modalClaimData.taskBonus;

  const loyaltyValue = (baseReward * loyaltyBonus) / 100;
  const referralValue = (baseReward * referralBonus) / 100;
  const mysteryValue = (baseReward * mysteryBonus) / 100;
  const taskValue = (baseReward * taskBonus) / 100;

  const totalReward =
    baseReward + loyaltyValue + referralValue + mysteryValue + taskValue;
  const roundedTotalReward = Math.floor(totalReward);

  const handleClose = () => {
    setShowModal(false);
    setModalClaimData({});
  };

  const { refetch: coinList } = useQuery(
    "coinList",
    async () => {
      const { data } = await customFetch.get("/coins/get-list");
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

  const { refetch: historyTable } = useQuery(
    "claim-history",
    async () => {
      const { data } = await customFetch.get("/claim/claims-history");
      return data;
    },
    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }
        setClaimHistory(dataDecrypt.list);
      },

      onError: (error) => {
        toast.error(error.response.data.msg);
      },
      cacheTime: 1000 * 60 * 60,
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const handleInputChange_claim = (e) => {
    const { name, value, type } = e.target;
    if (e.target.type === "select-one") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const selectedValue = selectedOption.value;

      if (name === "cryptoCoin") {
        setFormData({
          ...formData,
          cryptoCoin: selectedValue,
        });
      }
      if (name === "captcha") {
        setFormData({
          ...formData,
          captcha: selectedValue,
        });
      }
    }
  };

  const handleTimerSetup = () => {
    const claimUnlockedAt = localStorage.getItem("claimUnlockedAt");
  
    if (claimUnlockedAt) {
      // Calculate the remaining seconds until claimUnlockedAt
      const targetTime = day(claimUnlockedAt);
      const now = day();
      let remainingSeconds = Math.max(0, targetTime.diff(now, "second"));
      
      setTotalTime({ days: 0, hours: 0, minutes: 0, seconds: remainingSeconds });
  
      // Function to convert remaining seconds to days, hours, minutes, seconds
      const calculateTimeRemaining = (seconds) => {
        const days = Math.floor(seconds / (24 * 3600));
        seconds -= days * 24 * 3600;
        const hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
  
        return { days, hours, minutes, seconds };
      };
  
      // Set initial time
      setRemainingTime(calculateTimeRemaining(remainingSeconds));
  
      // Set an interval to update every second
      const intervalId = setInterval(() => {
        remainingSeconds = Math.max(0, remainingSeconds - 1); // Decrement remaining time
       
        
        if (remainingSeconds <= 0) {
          clearInterval(intervalId); // Clear interval when reaching zero
          localStorage.removeItem("claimUnlockedAt");
          setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); // Reset state
          return;
        }
        
        setRemainingTime(calculateTimeRemaining(remainingSeconds)); // Update time state
      }, 1000);
  
      // Return the interval ID for cleanup
      return intervalId;
    }
    return null; // No interval to clear
  };

  useEffect(() => {
    const intervalId = handleTimerSetup();

    // Clear the interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const handleSubmit_claim = async (e) => {
    if (!recaptchaToken)
      return toast.error("Please verify captcha", { autoClose: 1000 });
    if (!formData.cryptoCoin)
      return toast.error("Please select crypto coin", { autoClose: 1000 });

    try {
      setLoading(true);
      const { data } = await customFetch.post(`/claim/manual-faucet`, {
        ...formData,
        recaptchaToken,
      });
      const dataDecrypt = decrypt(data);
      if (dataDecrypt?.error) {
        decryptExit();
        return navigate("/");
      }
      
      if(dataDecrypt.msg === "locked") {
        localStorage.setItem("claimUnlockedAt", dataDecrypt.claimUnlockedAt);
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        const intervalId = handleTimerSetup();
        return toast.error("Please wait... ", { autoClose: 1000 });
      }
      setModalClaimData(dataDecrypt.data);
      toast.success("Claimed successfully", {
        autoClose: 1000,
      });

      localStorage.setItem("claimUnlockedAt", dataDecrypt.data.claimUnlockedAt);

      setShowModal(true);
      setLoading(false);
      setFormData({ cryptoCoin: "", captcha: "" });
      coinList(); // refetch coinlist
      historyTable(); // refetch claim history
      const intervalId = handleTimerSetup();

      // Clear the interval on component unmount
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    } catch (error) {
      toast.error(error.response.data.msg, {
        autoClose: 1000,
      });
    }
  };

  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "Manual Faucet", href: "/dashboard/manual-faucet" },
  ];

  return (
    <Wrapper>
      <div>
        <BreadCrumb title="Manual Faucet" breadcrumbs={breadcrumbs} />

        <div className="bg-white p-4 mt-4 rounded-lg">
          <div className="flex flex-col md:flex-row md:space-x-8 md:justify-center">
            <div
              className="w-full md:w-1/4 bg-gray-200 p-4 rounded-lg mb-8 md:mb-0 mt-8 md:mr-8"
              style={{ width: "300px", height: "600px" }}
            >
              Left Ad Space 300×600
            </div>
            <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md mt-8 custom-border">
              <form>
                <h2 className="text-xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                    Manual Faucet
                  </span>
                </h2>
                <hr className="my-4 border-t border-gray-300" />
                <div
                  className="mb-4 flex items-center border rounded-md"
                  style={{ backgroundColor: "rgba(8, 88, 247, 0.06)" }}
                >
                  <span className="p-3 text-blue-500">
                    <FaDollarSign />
                  </span>
                  <select
                    id="cryptCoin"
                    name="cryptoCoin"
                    className="w-full p-3 border-0 rounded-md bg-transparent"
                    onChange={(e) => handleInputChange_claim(e)}
                    value={formData.cryptoCoin}
                  >
                    <option value="" disabled selected>
                      Select Cryptocurrency
                    </option>
                    {cryptocoins.map(
                      (coin, index) =>
                        coin.status === "Active" && (
                          <option key={index} value={coin.cryptoNameFull}>
                            {coin.cryptoNameFull} ({coin.cryptoNameShort})
                          </option>
                        )
                    )}
                  </select>
                </div>
                <div
                  className="mb-4 flex items-center border rounded-md"
                  style={{ backgroundColor: "rgba(8, 88, 247, 0.06)" }}
                >
                  <span className="p-3 text-blue-500">
                    <IoMdCheckmarkCircle />
                  </span>
                  <select
                    id="captcha"
                    name="captcha"
                    className="w-full p-3 border-0 rounded-md bg-transparent"
                    onChange={(e) => handleInputChange_claim(e)}
                    value={formData.captcha}
                  >
                    <option value="" disabled selected>
                      Select Captcha
                    </option>
                    <option value="recaptcha">reCAPTCHA</option>
                    {/* <option value="hcaptcha">hCAPTCHA</option> */}
                    {/* <option value="solvemedia">SolveMedia</option> */}
                  </select>
                </div>
                <div className="mb-4 flex justify-center">
                  {formData.captcha === "recaptcha" ? (
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
                      {remainingTime?.seconds === 0 && remainingTime?.days === 0 && remainingTime?.hours === 0 && remainingTime?.minutes === 0 ? (
                        <>
                          <button
                            type="button"
                            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-md flex items-center space-x-2 hover:from-blue-600 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gradient-to-r disabled:from-blue-300 disabled:to-blue-400"
                            onClick={handleSubmit_claim}
                            disabled={loading}
                          >
                            <FaCheckCircle />
                            <span>Claim</span>
                          </button>
                        </>
                      ) : (
                        <Timer time={remainingTime} totalTime={totalTime} />
                      )}
                    </div>
                
              </form>
            </div>
            <div
              className="w-full md:w-1/4 bg-gray-200 p-4 rounded-lg mt-8"
              style={{ width: "300px", height: "600px" }}
            >
              Right Ad Space 300×600
            </div>
          </div>
          <ManualFaucetTable tableData={claimHistory} />

          <div className="flex justify-center mt-8">
            <div
              className="bg-gray-200 p-4 rounded-lg"
              style={{ width: "728px", height: "90px" }}
            >
              Bottom Ad Space 728×90
            </div>
          </div>
        </div>
      </div>
      <ModalBox
        showModal={showModal}
        handleClose={handleClose}
        // handleConfirm={handleConfirm}
        handleOk={handleClose}
        title="Claim Successfully"
        buttonText="Okay"
        message={
          <>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
              <div className="mb-4 flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <FaCoins className="text-yellow-500 text-2xl mr-2" />
                  <p className="text-gray-700">Base Reward:</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xl font-bold text-gray-600 bg-gray-200 rounded w-16 h-8 flex items-center justify-center">
                    {baseReward}
                  </p>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FaGift className="text-green-500 text-2xl mr-2" />
                  <p className="text-gray-700">Loyalty Bonus: ( % )</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xl font-semibold text-gray-700 bg-gray-200 rounded w-16 h-8 flex items-center justify-center">
                    {loyaltyBonus}
                  </p>
                  {/* <p className="ml-2 text-gray-600">({loyaltyBonus.value})</p> */}
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FaQuestionCircle className="text-blue-500 text-2xl mr-2" />
                  <p className="text-gray-700">Referral Bonus: ( % )</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xl font-semibold text-gray-700 bg-gray-200 rounded w-16 h-8 flex items-center justify-center">
                    {referralBonus}
                  </p>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FaQuestionCircle className="text-blue-500 text-2xl mr-2" />
                  <p className="text-gray-700">Mystery Bonus: ( % )</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xl font-semibold text-gray-700 bg-gray-200 rounded w-16 h-8 flex items-center justify-center">
                    {mysteryBonus}
                  </p>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FaTasks className="text-purple-500 text-2xl mr-2" />
                  <p className="text-gray-700">Task Bonus: ( % )</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xl font-semibold text-gray-700 bg-gray-200 rounded w-16 h-8 flex items-center justify-center">
                    {taskBonus}
                  </p>
                  {/* <p className="ml-2 text-gray-600">({taskValue})</p> */}
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4 mt-4">
                <div className="flex items-center">
                  <FaEquals className="text-red-500 text-2xl mr-2" />
                  <p className="text-gray-700">Total Reward:</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xl font-bold text-gray-700 bg-gray-200 rounded w-16 h-8 flex items-center justify-center">
                    {roundedTotalReward}
                  </p>
                  {/* <p className="ml-2 text-gray-600">({totalReward})</p> */}
                </div>
              </div>
            </div>
          </>
        }
        type="single"
        size="sm"
      />
    </Wrapper>
  );
};

export default ManualFaucet;
