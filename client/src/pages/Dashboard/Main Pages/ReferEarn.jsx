import React, { useState } from "react";
import styled from "styled-components";
import { FaCopy } from "react-icons/fa";
import day from "dayjs";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";
import { decrypt, decryptExit } from "../../../utils/decryption";
import { BreadCrumb, ReferandEarnCard } from "../../../components";
import { useDashboardContext } from "../../../components/layout/DashboardLayout";

const Wrapper = styled.div`
  .custom-scrollbar {
    max-height: 200px;
    overflow-y: auto;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #3b82f6;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    gap: 0.5rem;
  }



  .pagination button.active {
    background-color: #3b82f6;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 25px;
    height: 25px;
    border-radius: 4px;
  }

  .pagination .disabled {
    pointer-events: none;
    background-color: #e5e7eb;
    color: #9ca3af;
  }

  .card-container {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .card {
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .filter-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .filter-buttons button {
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .filter-buttons button:hover {
    background-color: #2563eb;
  }

  .filter-buttons button.active {
    background-color: #2563eb;
  }

  .card-heading {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
  }

  .fixed-header {
    position: sticky;
    top: 0;
    background-color: #f9fafb;
    z-index: 1;
    border-bottom: 2px solid #e5e7eb;
  }
`;

const ReferEarn = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [referredUsers, setReferredUsers] = useState([]);
  const [filter, setFilter] = useState("active"); // Filter state (active or inactive)

  const itemsPerPage = 5;
  const { user } = useDashboardContext();
  const referralLink = `http://localhost:5173/register?refer=${user.userID}`;

  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "Refer & Earn", href: "/dashboard/refer-earn" },
  ];

  const { refetch: getReferredUsersRefetch } = useQuery(
    "get-referred-user-list",
    async () => {
      const { data } = await customFetch.get("/users/get-referred-user-list");
      return data;
    },
    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }
        setReferredUsers(dataDecrypt.list);
      },
      onError: (error) => {
        toast.error(error.response.data.msg);
      },
      cacheTime: 1000 * 60 * 60,
    }
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;

  // Filter users based on active or inactive status
  const filteredUsers = referredUsers.filter((user) =>
    filter === "active" ? user.isActive : !user.isActive
  );

// Filter active users once
const activeUsers = referredUsers.filter((user) => user.isActive === true);

// Calculate the percentage
const activeUserCount = activeUsers.length <= 100 ? activeUsers.length : 100;




  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous and next pagination
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Wrapper>
      <BreadCrumb title="Refer & Earn" breadcrumbs={breadcrumbs} />
      <ReferandEarnCard
        heading={"Referral Bonus"}
        description={
          "Boost your daily claims in the Earning section with our Referral Bonus! For every new user you refer, your bonus increases by 1% for every active user, up to a maximum of 100%. Invite friends, earn more!"
        }
        //send only active user count
        percentage={activeUserCount}
      />
      <div className="bg-white p-6 rounded-lg mt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Refer & Earn
          </h1>
        </div>
        <hr className="border-gray-300 my-4" />

        <div className="flex gap-8">
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                Earn rewards by referring friends to our platform. Share your
                unique referral link and get bonuses for each successful signup.
              </p>
            </div>
            <div className="flex flex-col items-start mb-4">
              <span className="text-lg font-semibold mb-2">
                Your Referral Link:
              </span>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="border border-gray-300 rounded-md px-3 py-2 flex-grow"
                />
                <button
                  className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-800 transition-colors"
                  onClick={handleCopyLink}
                >
                  <FaCopy /> Copy Link
                </button>
              </div>
              {linkCopied && (
                <span className="text-green-500 mt-2">Link copied!</span>
              )}
            </div>
            <div className="border-l border-gray-300"></div>
          </div>

          <div className="flex-1">
            <div className="filter-buttons">
              <button
                className={filter === "active" ? "active" : ""}
                onClick={() => setFilter("active")}
              >
                Active Users (
                {referredUsers.filter((user) => user.isActive).length})
              </button>
              <button
                className={filter === "inactive" ? "active" : ""}
                onClick={() => setFilter("inactive")}
              >
                Inactive Users (
                {referredUsers.filter((user) => !user.isActive).length})
              </button>
            </div>

            <div className="custom-scrollbar">
              <table className="w-full border-collapse">
                <thead className="fixed-header">
                  <tr className="bg-gray-200">
                    <th className="p-3 border">S.No</th>
                    <th className="p-3 border text-left">Email</th>
                    <th className="p-3 border">Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user._id} className="border-b">
                      <td className="p-2 text-center">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="p-2 text-left">{user.username}</td>
                      <td className="p-2 text-center">
                        {day(user.lastLogin).format("DD-MMM-YYYY")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (


            <div className="pagination">
              <button
                onClick={handlePrevPage}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              {Array.from(
                { length: Math.ceil(filteredUsers.length / itemsPerPage) },
                (_, i) => (
                  <button
                    key={i + 1}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                onClick={handleNextPage}
                className={`px-3 py-1 rounded ${
                  currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
                    ? "bg-gray-300 disabled:cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={
                  currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ReferEarn;
