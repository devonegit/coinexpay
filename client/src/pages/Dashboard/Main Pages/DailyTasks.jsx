import React from "react";
import { BreadCrumb, ModalBox, ReferandEarnCard } from "../../../components";
import { FaCheckCircle, FaGift, FaEye } from "react-icons/fa"; // Progress, reward, and eye icons
import styled from "styled-components";
import { decrypt, decryptExit } from "../../../utils/decryption";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useState } from "react";
import { useDashboardContext } from "../../../components/layout/DashboardLayout";
import customFetch from "../../../utils/customFetch";
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
  .table-container {
    overflow-x: auto; /* Enable horizontal scrolling */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 16px; /* Smaller font size */
    text-align: left;
    border-left: none;
    border-right: none;
  }

  th,
  td {
    padding: 12px 15px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: rgba(37, 99, 135, 0.75);
    color: #fff; /* White text color */
    backdrop-filter: blur(10px); /* Add a blur effect to the background */
    text-align: center; /* Center table headings */
  }

  th.description {
    text-align: left; /* Left align the description heading */
  }

  td.task {
    text-align: center; /* Center align the task cell content */
  }

  td.action {
    text-align: center; /* Center align the action button cells */
  }

  tr:nth-of-type(even) {
    background-color: #fff; /* Remove gray background on even rows */
  }

  .text-center {
    text-align: center;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .serial {
    width: 10%;
  }

  .progress {
    width: 5%;
    text-align: center;
  }

  .progress td {
    padding: 12px 5px;
  }

  .progress svg {
    margin: 0 auto; /* Center the icon */
  }

  .action {
    width: 15%;
    text-align: center;
  }

  @media (max-width: 1090px) {
    .action button span {
      display: none; /* Hide text on small screens */
    }

    .action button svg {
      display: inline; /* Show icon on small screens */
    }
  }

  @media (min-width: 1090px) {
    .action button svg {
      display: none; /* Hide icon on large screens */
    }

    .action button span {
      display: inline; /* Show text on large screens */
    }
  }

  @media (max-width: 768px) {
    table {
      font-size: 14px; /* Adjust font size for smaller screens */
    }

    th,
    td {
      padding: 10px 12px; /* Adjust padding for smaller screens */
    }
  }
`;

const DailyTasks = () => {
  const [claimHistory, setClaimHistory] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [bonusData, setbonusData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const latestClaimDate = bonusData.bonusHistory?.[0]?.date;
  const navigate = useNavigate();

  const claimButtonDisabled =
    bonusData.bonusHistory && bonusData.bonusHistory.length > 0
      ? day(latestClaimDate).startOf("day").valueOf() >=
          day().startOf("day").valueOf() &&
        day(latestClaimDate).startOf("day").valueOf() <=
          day().endOf("day").valueOf()
      : false;

  const handleOK = () => {
    setShowModal(false);
  };

  const {} = useQuery(
    "task-list",
    async () => {
      const { data } = await customFetch.get("/tasks/get-list-user");
      return data;
    },
    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }
        setTaskList(dataDecrypt.list);
      },

      onError: (error) => {
        toast.error(error.response.data.msg);
      },
      cacheTime: 1000 * 60 * 60,
    }
  );

  const { refetch: getBonusRefetch } = useQuery(
    "get-bonus",
    async () => {
      const { data } = await customFetch.get("/users/get-bonus/task");
      return data;
    },
    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }
        setbonusData(dataDecrypt.bonusData);
      },

      onError: (error) => {
        toast.error(error.response.data.msg);
      },
      cacheTime: 1000 * 60 * 60,
    }
  );

  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "Daily Tasks", href: "/dashboard/daily-tasks" },
  ];

  const handleClaimBonus = async () => {
    try {
      const { data } = await customFetch.post(`/users/bonus-update/task`);
      await getBonusRefetch();
      setShowModal(true);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  // Check if all tasks are completed
  const allTasksCompleted = taskList.every((task) => {
    const [current, total] = task.task.split("/").map(Number); // Convert both parts to numbers
    return current >= total; // Compare the numbers
  });

  return (
    <Wrapper>
      <div>
        <BreadCrumb title="Daily Tasks" breadcrumbs={breadcrumbs} />
        <ReferandEarnCard
          heading={"Daily Task Bonus"}
          description={
            "Boost your earnings with our Daily Task Bonus! Complete all daily tasks to earn a 1% bonus, increasing up to 100%. Maximize your rewards by finishing tasks each day and watch your earnings grow!"
          }
          percentage={bonusData?.value}
        />

        <div className="w-full md:w-3/2 bg-white p-8 rounded-lg shadow-md mt-8 mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Daily Tasks
            </span>
          </h2>
          <hr className="my-4 border-t border-gray-300" />
          {/* Light gray horizontal rule */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="text-center serial">Serial</th>
                  <th className="description">Description</th>
                  <th className="text-center">Task</th>
                  <th className="text-center progress">Progress</th>
                  <th className="text-center action">Action</th>
                  {/* New column for action button */}
                </tr>
              </thead>
              <tbody>
                {taskList.map((task) => (
                  <tr key={task.id}>
                    <td className="text-center serial" data-label="Serial">
                      {task.serial}
                    </td>
                    <td data-label="Description">{task.description}</td>
                    <td className="task" data-label="Task">
                      {task.task}
                    </td>
                    <td className="text-center progress" data-label="Progress">
                      {(() => {
                        // Extract the current and total progress once
                        const [current, total] = task.task
                          .split("/")
                          .map(Number);

                        // Check if the task is completed
                        return current >= total ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaCheckCircle className="text-gray-500" />
                        );
                      })()}
                    </td>
                    <td className="text-center action" data-label="Action">
                      <button
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 hover:from-blue-500 hover:to-blue-700"
                        onClick={() => (window.location.href = task.link)}
                      >
                        <FaEye /> <span>Go To Page</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {taskList.length === 0 && <p>No tasks available.</p>}
          {taskList.length !== 0 && (
            <div className="button-container">
              <button
                className={`py-3 px-8 rounded-md flex items-center space-x-2 
    ${
      allTasksCompleted && !claimButtonDisabled
        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 cursor-pointer"
        : "bg-gray-200 text-gray-700 cursor-not-allowed pointer-events-none"
    }`}
                disabled={!allTasksCompleted || claimButtonDisabled}
                onClick={handleClaimBonus}
              >
                <FaGift />{" "}
                <span>
                  {claimButtonDisabled
                    ? "Claimed Successfully"
                    : "Claim 1% Daily Bonus"}
                </span>
              </button>
            </div>
          )}

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
        handleClose={handleOK}
        handleOK={handleOK}
        title="Reward"
        buttonText="Got it"
        message={
          <>
            <div className="relative bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 bg-gradient-to-r from-gray-100 to-gray-300">
              <div className="relative">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 uppercase">
                  Task Bonus
                </h2>
                <p className="text-gray-600 mt-2">
                  Daily users get 1% bonus, up to a maximum of 100%. If a user
                  does claim task bonus for 10 day, the bonus resets to 1%.
                </p>
                {bonusData.bonusHistory &&
                  bonusData.bonusHistory.length > 0 &&
                  (bonusData.bonusHistory[0].type === "Increase" ||
                    bonusData.bonusHistory[0].type === "FirstLogin") && (
                    <div className="text-green-600 mt-4 font-semibold">
                      Hurray! You get 1% bonus. Your updated bonus is now{" "}
                      {bonusData.value}%.
                    </div>
                  )}

                {bonusData.bonusHistory &&
                  bonusData.bonusHistory.length > 0 &&
                  bonusData.bonusHistory[0].type === "Reset" && (
                    <div className="text-red-600 mt-4 font-semibold">
                      Oh no! Bonus has been reset. Your updated bonus is now{" "}
                      {bonusData.value}%.
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
    </Wrapper>
  );
};

export default DailyTasks;
