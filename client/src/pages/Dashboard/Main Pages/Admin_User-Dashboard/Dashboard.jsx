import React from "react";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaArrowUp,
  FaEye,
  FaPlus,
  FaEdit,
  FaCoins,
  FaGift,
  FaQuestionCircle,
  FaTasks,
  FaEquals,
} from "react-icons/fa";
import styled from "styled-components";
import ClaimsTable from "./tables/ClaimsTable";
import WithdrawalsTable from "./tables/WithdrawalsTable";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import customFetch from "../../../../utils/customFetch";
import { decrypt, decryptExit } from "../../../../utils/decryption";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

// Import your coin images
import bitcoinImg from "../../../../assets/images/crypto-icons/btc.svg";
import litecoimImg from "../../../../assets/images/crypto-icons/ltc.svg";
import { ModalBox, Switch } from "../../../../components";
import TicketTable from "./tables/TicketTable";
import ActivityTable from "./tables/ActivityTable";
import UserDetails from "./forms/UserDetails";
import BonusTable from "./tables/BonusTable";
import IpTable from "./tables/IpTable";


const coinImages = {
  BITCOIN: bitcoinImg,
  LITECOIN: litecoimImg,
};

const Wrapper = styled.div`
  /* Chat Box styles */

  .chatbox {
    position: fixed;
    right: 0;
    bottom: 10;
    width: 350px; /* Adjust width for better layout */
    max-height: 600px; /* Set max height */
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
    z-index: 1000;
  }

  .chatbox-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f3f4f6;
    border-bottom: 1px solid #e5e7eb;
  }

  .chatbox-messages {
    padding: 10px;
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .chat-message {
    margin: 5px 0;
    padding: 10px;
    border-radius: 10px;
    max-width: 55%;
    position: relative;
  }

  .message-admin {
    background-color: #f3f4f6; /* Light gray for admin */
    align-self: flex-start;
  }

  .message-user {
    background-color: #3b82f6; /* Blue for user */
    color: white;
    align-self: flex-end;
  }

  .timestamp {
    font-size: 0.7rem;
    color: #9ca3af;
    position: absolute;
    bottom: -15px; /* Adjust position */
    right: 10px;
  }

  .chatbox-input {
    display: flex;
    border-top: 1px solid #e5e7eb;
  }

  .chatbox-input input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 0 0 0 8px;
    outline: none;
  }

  .chatbox-input button {
    padding: 10px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0 0 8px 0;
    cursor: pointer;
  }

  .chatbox-input button:hover {
    background-color: #2563eb;
  }

  //admin typing indicator
  .typing-indicator {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
`;

const Dashboard = () => {
  const [userData, setUserData] = useState({
    data: {
      claims: [],
      withdrawals: [],
      tickets: [],
      coins: [],
      activity: [],
      username: "",
    },
  });
  const { userId } = useParams();
  const [isUserActive, setIsUserActive] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [formData_UpdateUser, setFormData_UpdateUser] = useState({});
  const [bonusAll, setBonusAll] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [claimData, setClaimData] = useState();
  const [clickedButton, setClickedButton] = useState();
  

  const handleClose = () => {
    setShowModal(false);
    setMessageData([]);
    setClickedButton();
    setLoading(false);
    setFormData_UpdateUser({});
    setClaimData();
  };
  const handleConfirm = async () => {
    if (
      clickedButton === "reset-password" ||
      clickedButton === "change-email" ||
      clickedButton === "change-username"
    ) {
      try {
        setLoading(true);
        await customFetch.post(
          `/users/admin/update-profile-password/${userId}`,
          formData_UpdateUser
        );
        toast.success("User updated successfully", {
          autoClose: 1000,
        });

        setLoading(false);
        handleClose();
      } catch (error) {
        toast.error(error.response.data.msg, {
          autoClose: 1000,
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData_UpdateUser({
      ...formData_UpdateUser,
      [name]: value,
    });
  };

  //get coins list and balance
  const { refetch: userDataRefetch, isLoading } = useQuery(
    "coinList",
    async () => {
      const { data } = await customFetch.get(
        `/users/admin/get-user-data/${userId}`
      );
      return data;
    },
    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }
        console.log(dataDecrypt.data);
        setUserData(dataDecrypt);
        setIsUserActive(dataDecrypt.data.status === "active" ? true : false);
        setIsUserLogin(dataDecrypt.data.isLoggedIn);
        setBonusAll(dataDecrypt.data.combinedBonus);
      },

      onError: (error) => {
        toast.error(error.response.data.msg);
      },
      cacheTime: 1000 * 60 * 60,
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  // handleupdateuserdata
  const handleUpdateUserData = async (type, requestData) => {
    try {
      if (
        type === "user-active-inactive-switch" ||
        type === "user-login-logout-switch"
      ) {
        const { data } = await customFetch.post(
          `/users/admin/update-user-data/${userId}`,
          requestData
        );
        toast.success("User Status Updated", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error.response.data.msg, {
        autoClose: 1000,
      });
    }
  };
  const toggleSwitch = async (e, type) => {
    if (type === "user-active-inactive-switch") {
      setIsUserActive(!isUserActive);
      handleUpdateUserData(type, {
        type,
        status: isUserActive ? "inactive" : "active",
      });
    }
    if (type === "user-login-logout-switch") {
      setIsUserLogin(!isUserLogin);
      handleUpdateUserData(type, {
        type,
        status: isUserLogin ? "inactive" : "active",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      {/* cards */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">User Dashboard</h1>
          <button className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-600">
            <FaCalendarAlt className="mr-2" />
            Pick a date
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-transparent to-white rounded-full opacity-50"></div>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-purple-100 p-6 rounded-lg shadow-md relative overflow-hidden">
              <div className="absolute -top-6  -right-7 w-28 h-28 bg-purple-200 rounded-full opacity-50"></div>
              <div className="absolute -top-3 -right-4 w-20 h-20 bg-purple-300 rounded-full opacity-50"></div>

              <div className="flex items-center mb-4">
                <FaShoppingCart className="text-purple-500 text-2xl" />
              </div>
              <div className="text-gray-600">Total Deposit</div>
              <div className="text-2xl font-bold text-gray-800">
                42,750.98
                {/* <FaArrowUp className="text-sm text-blue-500" /> */}
              </div>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg shadow-md relative overflow-hidden">
              <div className="absolute -top-6  -right-7 w-28 h-28 bg-orange-200 rounded-full opacity-50"></div>
              <div className="absolute -top-3 -right-4 w-20 h-20 bg-orange-300 rounded-full opacity-50"></div>
              <div className="flex items-center mb-4">
                <FaBoxOpen className="text-orange-500 text-2xl" />
              </div>
              <div className="text-gray-600">Total Withdrawals</div>
              <div className="text-2xl font-bold text-gray-800">
                536,23,3
                {/* <FaArrowUp className="text-sm text-orange-500" /> */}
              </div>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-md relative overflow-hidden">
              <div className="absolute -top-6  -right-7 w-28 h-28 bg-green-200 rounded-full opacity-50"></div>

              <div className="absolute -top-3 -right-4 w-20 h-20 bg-green-300 rounded-full opacity-50"></div>
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-green-500 text-2xl" />
              </div>
              <div className="text-gray-600">Completed Orders</div>
              <div className="text-2xl font-bold text-gray-800">
                234,1
                {/* <FaArrowUp className="text-sm text-green-500" /> */}
              </div>
            </div>
            <div className="bg-red-100 p-6 rounded-lg shadow-md relative overflow-hidden">
              <div className="absolute -top-6  -right-7 w-28 h-28 bg-red-200 rounded-full opacity-50"></div>
              <div className="absolute -top-3 -right-4 w-20 h-20 bg-red-300 rounded-full opacity-50"></div>
              <div className="flex items-center mb-4">
                <FaTimesCircle className="text-red-500 text-2xl" />
              </div>
              <div className="text-gray-600">Pending Orders</div>
              <div className="text-2xl font-bold text-gray-800">
                332,34
                {/* <FaArrowUp className="text-sm text-red-500" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Switch and Buttons */}
      <div className="lg:flex lg:justify-start lg:items-center mt-6 space-x-4">
        {/* Switches */}
        <div className="flex justify-left space-x-8 p-6 rounded-xl w-80">
          {/* Active User Status */}
          <div className="flex flex-col items-start">
            <Switch
              handleUpdateUserData={handleUpdateUserData}
              toggleSwitch={toggleSwitch}
              isOn={isUserActive}
              text={["Active", "Inactive"]}
              switchText="user-active-inactive-switch"
            />
          </div>

          {/* Login Status */}
          <div className="flex flex-col items-start">
            <Switch
              handleUpdateUserData={handleUpdateUserData}
              toggleSwitch={toggleSwitch}
              isOn={isUserLogin}
              text={["Login", "Logout"]}
              switchText="user-login-logout-switch"
              disabled={isUserLogin ? false : true}
            />
          </div>
        </div>

        {/* buttons */}
        <div className="flex justify-left space-x-4 rounded-xl sm:mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center bg-gradient-to-r from-blue-500 to-blue-700"
            onClick={() => {
              setClickedButton("reset-password");
              setShowModal(true);
            }}
          >
            <FaEdit className="mr-2" />
            Reset Password
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center bg-gradient-to-r from-blue-500 to-blue-700"
            onClick={() => {
              setClickedButton("change-email");
              setShowModal(true);
            }}
          >
            <FaEdit className="mr-2" />
            Change Email
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center bg-gradient-to-r from-blue-500 to-blue-700"
            onClick={() => {
              setClickedButton("change-username");
              setShowModal(true);
            }}
          >
            <FaEdit className="mr-2" />
            Change Username
          </button>
          <div className="font-semibold text-black py-2 px-4 rounded hover:bg-blue-600 bg-gradient-to-r from-blue-100 to-blue-300 w-80">
            <p>Name: {userData?.data?.username}</p>
          </div>
        </div>

      </div>

      {/* balance and ip address */}
      <div className="mt-10 flex space-x-4">
        {/* balance */}
        
          <div className="bg-white p-6 rounded-lg w-80 h-[435px] overflow-y-auto">
            {/* Set fixed height to 200px */}
            <div className="flex justify-between items-center mb-4  ">
              <h2 className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text text-xl font-bold">
                User available balance
              </h2>
            </div>
            <hr className="my-4 border-t border-gray-200" />
            <ul>
              {userData?.data?.coins.map((coin, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-4"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-md mr-3 flex items-center justify-center`}
                    >
                      <img
                        src={coinImages[coin.cryptoNameFull]}
                        alt={coin.cryptoNameFull}
                        className="w-6 h-6 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{coin.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium mr-2">{coin.balance}</p>
                    <i className="fas fa-eye text-gray-400"></i>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        
              
        <div className="flex-grow bg-white rounded-lg">
          <IpTable tableData={userData?.data?.ipHistory} />
        </div>

      </div>

      {/* tables */}

      <div className="mt-6">
        <div>
          <BonusTable tableData={bonusAll} />
        </div>

      </div>

      <div className="mt-6 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-8 lg:space-y-0 ">
        <div>
          <ClaimsTable tableData={userData?.data?.claims}  setShowModal={setShowModal}
            setClickedButton={setClickedButton} setClaimData={setClaimData} />
        </div>

        <div>
          <WithdrawalsTable tableData={userData?.data?.withdrawals} />
        </div>
      </div>

      {/* tables-tickets and activity */}
      <div className="mt-6 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-8 lg:space-y-0 ">
        <div>
          <TicketTable
            tableData={userData?.data?.tickets}
            setMessageData={setMessageData}
            setShowModal={setShowModal}
            setClickedButton={setClickedButton}
          />
          <ModalBox
            showModal={showModal}
            handleClose={handleClose}
            handleOk={handleClose}
            handleConfirm={handleConfirm}
            title={
              clickedButton === "view-message"
                ? "Chat History"
                : clickedButton === "reset-password"
                ? "Reset Password"
                : clickedButton === "change-email"
                ? "Change Email"
                : clickedButton === "change-username"
                ? "Change Username"
                :clickedButton === "view-claim"
                ? "Claim Successful"
                : null
            }
            buttonText={clickedButton === "view-message" ? "Okay" :clickedButton === "view-claim" ? "Okay" : "Confirm"}
            type={clickedButton === "view-message" ? "single" :clickedButton === "view-claim" ? "single" : ""}
            message={
              clickedButton === "view-message" ? (
                <>
                  <div>
                    <div className="chatbox-messages">
                      {messageData.map((message, index) => (
                        <div
                          key={index}
                          className={`chat-message ${
                            message.sender === "user"
                              ? "message-user"
                              : "message-admin"
                          }`}
                        >
                          {message.text}{" "}
                          <p
                            className={`${
                              message.sender === "user"
                                ? "text-gray-100 text-xs mt-1"
                                : "text-gray-600 text-xs mt-1"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) :clickedButton === "view-claim" ? (
                <>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
                  <div className="mb-4 flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <FaCoins className="text-yellow-500 text-2xl mr-2" />
                      <p className="text-gray-700">Base Reward:</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-xl font-bold text-gray-600 bg-gray-200 rounded w-16 h-8 flex items-center justify-center">
                        {claimData.baseReward}
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
                        {claimData.loyaltyBonus}
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
                        {claimData.referralBonus}
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
                        {claimData.mysteryBonus}
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
                      {claimData.taskBonus}
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
                        {claimData.roundedTotalReward}
                      </p>
                      {/* <p className="ml-2 text-gray-600">({totalReward})</p> */}
                    </div>
                  </div>
                </div>
              </>
              ) : clickedButton === "reset-password" ? (
                <>
                  <UserDetails
                    handleInputChange={handleInputChange}
                    name="password"
                    description="Enter new password"
                    lable="New Password"
                    type="password"
                  />
                </>
              ) : clickedButton === "change-email" ? (
                <>
                  <UserDetails
                    handleInputChange={handleInputChange}
                    name="email"
                    description="Enter new email address"
                    lable="New email address"
                    type="text"
                  />
                </>
              ) : clickedButton === "change-username" ? (
                <>
                  <UserDetails
                    handleInputChange={handleInputChange}
                    name="username"
                    description="Enter new username"
                    lable="New username"
                    type="text"
                  />
                </>
              ) : null
            }
          />
        </div>

        <div>
          <ActivityTable tableData={userData?.data?.activity} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
