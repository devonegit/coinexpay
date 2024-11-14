import {
  BreadCrumb,
  ReferandEarnCard,
  DashboardCard,
  ModalBox,
} from "../../../components";
import { FaDollarSign, FaGift } from "react-icons/fa";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";
import { useQuery } from "react-query";
import { decrypt, decryptExit } from "../../../utils/decryption";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useState } from "react";
import { useDashboardContext } from "../../../components/layout/DashboardLayout";

const Dashboard = () => {
  const { user } = useDashboardContext();

  const loyaltyBonus = user.bonus.find((bonus) => bonus.name === "loyalty");
  const [showModal, setShowModal] = useState(true);

  const handleOK = () => {
    setShowModal(false);
  };

  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "Dashboard", href: "/dashboard" },
  ];


  if(user.role === "admin"){
    return (
      <></>
    )
  }
  if(user.role === "user"){

    return (
      <>
        <BreadCrumb title="Dashboard" breadcrumbs={breadcrumbs} />
        <div className="flex flex-wrap justify-between mt-4">
          <div className="flex-grow p-2">
            <DashboardCard
              balance={
                user.coins.length === 0
                  ? "0.00000000"
                  : user.coins.find((c) => c.cryptoNameFull === "LITECOIN") ===
                    undefined
                  ? "0.00000000"
                  : user.coins.find((c) => c.cryptoNameFull === "LITECOIN")
                      .balance
              }
              text={"Litecoin"}
              icon={<FaDollarSign />}
              iconBgColor={"#28a745"} // Green
              startColor={"rgba(40, 167, 69, 0.75)"}
              endColor={"rgba(33, 136, 56, 0.4)"}
            />
          </div>
          <div className="flex-grow p-2">
            <DashboardCard
              balance={
                user.coins.length === 0
                  ? "0.00000000"
                  : user.coins.find((c) => c.cryptoNameFull === "BITCOIN") ===
                    undefined
                  ? "0.00000000"
                  : user.coins.find((c) => c.cryptoNameFull === "BITCOIN").balance
              }
              text={"Bitcoin"}
              icon={<FaDollarSign />}
              iconBgColor={"#6c757d"} // Gray
              startColor={"rgba(108, 117, 125, 0.75)"}
              endColor={"rgba(90, 98, 104, 0.4)"}
            />
          </div>
          <div className="flex-grow p-2">
            <DashboardCard
              balance={(0.0).toFixed(8)}
              text={"Ethereum"}
              icon={<FaDollarSign />}
              iconBgColor={"#007bff"} // Blue
              startColor={"rgba(0, 123, 255, 0.75)"}
              endColor={"rgba(0, 86, 179, 0.4)"}
            />
          </div>
          <div className="flex-grow p-2">
            <DashboardCard
              balance={(0.0).toFixed(8)}
              text={"Ripple"}
              icon={<FaDollarSign />}
              iconBgColor={"#ffc107"} // Yellow
              startColor={"rgba(255, 193, 7, 0.75)"}
              endColor={"rgba(224, 168, 0, 0.4)"}
            />
          </div>
          <div className="flex-grow p-2">
            <DashboardCard
              balance={(0.0).toFixed(8)}
              text={"Cardano"}
              icon={<FaDollarSign />}
              iconBgColor={"#17a2b8"} // Teal
              startColor={"rgba(23, 162, 184, 0.75)"}
              endColor={"rgba(17, 122, 139, 0.4)"}
            />
          </div>
        </div>
        <ModalBox
          showModal={showModal}
          handleClose={handleOK}
          handleOK={handleOK}
          title="Reward"
          buttonText="Got it"
          message={
            <>
              <div className="relative bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 bg-gradient-to-r from-gray-100 to-gray-300">
                <div className="relative">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 uppercase">
                    Loyalty Bonus
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Daily users get 1% bonus, up to a maximum of 100%. If a user
                    does not log in for a day, the bonus resets to 1%.
                  </p>
                  {(loyaltyBonus.bonusHistory[0].type === "Increase" || loyaltyBonus.bonusHistory[0].type === "FirstLogin") && (
                    <div className="text-green-600 mt-4 font-semibold">
                      Hurray! You get 1% bonus. Your updated bonus is now {loyaltyBonus.value}%.
                    </div>
                  )}
                  {loyaltyBonus.bonusHistory[0].type === "Reset" && (
                    <div className="text-red-600 mt-4 font-semibold">
                      Oh no! Bonus has been reset. Your updated bonus is now {loyaltyBonus.value}%.
                    </div>
                  )}
                  <div className="mt-4">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                      onClick={handleOK}
                    >
                      Got it
                    </button>
                  </div>
                </div>
                <div className="relative bg-gray-50 p-1  rounded-full">
                  <div className="bg-gray-200 p-4 rounded-full">
                    <FaGift className="text-5xl text-gray-700 " />
                  </div>
                </div>
              </div>
            </>
          }
          type="single"
          size="lg2xl"
          bottom="false"
        />
      </>
    );
  }

};

export default Dashboard;
