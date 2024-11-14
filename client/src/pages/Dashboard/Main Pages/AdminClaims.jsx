import React, { useState } from "react";
import { BreadCrumb, ComingSoon, ModalBox } from "../../../components";
import {
  FaPlus,
  FaCheck,
  FaTimes,
  FaHourglassHalf,
  FaEye,
  FaShoppingCart,
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaArrowUp,
  FaEdit,
  FaCoins,
  FaGift,
  FaQuestionCircle,
  FaTasks,
  FaEquals,
} from "react-icons/fa";
import styled from "styled-components";
import { faker } from "@faker-js/faker"; // For generating random data
import { useQuery } from "react-query";
import customFetch from "../../../utils/customFetch";
import { decrypt, decryptExit } from "../../../utils/decryption";
import { toast } from "react-toastify";
import day from "dayjs";
import { useNavigate } from "react-router-dom";
// import Bitcoin from "../../../assets/images/crypto-icons/btc.svg"

const Wrapper = styled.div`
  .table {
    font-size: 0.875rem; /* Reduced font size for the entire table */
    width: 100%;
    border-collapse: collapse;
  }

  .table th,
  .table td {
    padding: 0.5em 1em; /* Adjusted padding */
    border: 1px solid #e5e7eb; /* Tailwind border-gray-200 */
  }

  .table th {
    background-color: #f3f4f6; /* Tailwind bg-gray-100 */
  }

  .table th.coin-name {
    text-align: left; /* Left align header */
  }

  .table td.coin-name {
    text-align: left; /* Left align content */
  }

  .table th.date,
  .table th.status,
  .table th.actions,
  .table th.reward {
    text-align: center;
  }

  .table td.center {
    text-align: center;
  }

  .status-icon {
    transition: color 0.3s, transform 0.3s;
    cursor: pointer;
  }

  .status-icon:hover {
    color: #2563eb; /* Tailwind text-blue-600 */
    transform: scale(1.1);
  }

 .action-icon {
  background-color: #f3f4f6; /* Light background for icons */
  border-radius: 0.375rem;
  padding: 0.25em; /* Reduced padding */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s;
  width: 1.5rem; /* Reduced size of the icon container */
  height: 1.5rem; /* Reduced size of the icon container */
  margin: auto; /* Center the icon */
}

  .action-icon:hover {
    background-color: #e5e7eb; /* Slightly darker background on hover */
  }
`;

// Minimal styled component for status badges
const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25em 0.75em;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;

  &.status-badge-approved {
    background-color: #d1fae5;
    color: #065f46;
  }

  &.status-badge-approved:hover {
    background-color: #a7f3d0;
    color: #047857;
  }

  &.status-badge-rejected {
    background-color: #fef2f2;
    color: #b91c1c;
  }

  &.status-badge-rejected:hover {
    background-color: #fee2e2;
    color: #991b1b;
  }

  &.status-badge-pending {
    background-color: #fff3cd;
    color: #856404;
  }

  &.status-badge-pending:hover {
    background-color: #ffeeba;
    color: #6c757d;
  }
`;

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Approved":
      return "status-badge-approved";
    case "Rejected":
      return "status-badge-rejected";
    case "Pending":
      return "status-badge-pending";
    case "Success":
      return "status-badge-approved";
    default:
      return "";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Approved":
      return <FaCheck className="text-green-600 mr-1" />;
    case "Rejected":
      return <FaTimes className="text-red-600 mr-1" />;
    case "Pending":
      return <FaHourglassHalf className="text-yellow-600 mr-1" />;
    case "Success":
      return <FaCheck className="text-green-600 mr-1" />;
    default:
      return null;
  }
};

const AdminClaims = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickedButton, setClickedButton] = useState();
  const [claimData, setClaimData] = useState();
  const [tableData, setTableData] = useState([]);
  const rowsPerPage = 5; // Fixed number of rows per page
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
    setClickedButton();
    setClaimData();
    setLoading(false);
  };
  const handleConfirm = async () => {
    console.log("handleconfirm");
  };

  // Sort data by date in descending order
  const sortedData = [...tableData].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, sortedData.length);
  const currentRows = sortedData.slice(startIndex, endIndex);

  // Pagination button range calculation
  const visiblePages = 3;
  const pages = [];
  if (totalPages <= visiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 2) {
      pages.push(1, 2, 3, "...");
    } else if (currentPage >= totalPages - 1) {
      pages.push("...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
    }
  }

  // Using useQuery to fetch withdrawals
  const { data, isLoading, isError } = useQuery(
    ["withdrawals", currentPage, rowsPerPage],
    async () => {
      const { data } = await customFetch.get(`/claim/admin/claims-list`);
      return data;
    },

    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }
        console.log(dataDecrypt);

        setTableData(dataDecrypt.data);
      },

      onError: (error) => {
        toast.error(error.response.data.msg);
      },
      cacheTime: 1000 * 60 * 60,
      enabled: true,
      refetchOnWindowFocus: false,
    } // Keep previous data while fetching new data for smooth transitions
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Wrapper>
      <BreadCrumb
        title="Claims"
        breadcrumbs={[
          { label: "Home", href: "/dashboard" },
          { label: "Claims", href: "/dashboard/claims" },
        ]}
      />
      <div className="bg-white p-4 mt-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Claims History
          </span>
        </h2>
        <hr className="my-4 border-t border-gray-300" />
        <p className="mb-4 text-gray-700">
          View your users claims history. For any issues, use our live chat or
          create a support ticket.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm border-t border-b border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 p-2 bg-gray-100">ID</th>
                <th className="border border-gray-200 p-2 bg-gray-100 text-left">
                  Name
                </th>
                <th className="border border-gray-200 p-2 bg-gray-100">
                  Reward
                </th>
                <th className="border border-gray-200 p-2 bg-gray-100">User</th>
                <th className="border border-gray-200 p-2 bg-gray-100">Type</th>
                <th className="borderborder-gray-200 p-2 bg-gray-100">
                  Status
                </th>
                <th className="border border-gray-200 p-2 bg-gray-100">Date</th>
                <th className="border border-gray-200 p-2 bg-gray-100 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id}>
                  <td className="border border-gray-200 p-2 text-center">
                    {row.claimID}
                  </td>
                  <td className="border border-gray-200 p-2 text-left">
                    {/* {row.coin} {<img src={Bitcoin} alt="bitcoin" className="w-5 h-5 inline"/>} */}
                    {row.coin}
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    {row.reward}
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    {
                      <a
                        href={`/dashboard/admin/user-dashboard/${row.claimBy}`}
                        target="_blank"
                        className="text-blue-500 hover:text-blue-700 underline text-sm font-semibold"
                      >
                        {row.claimByName}
                      </a>
                    }
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    {row.type}
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    <StatusBadge className={getStatusBadgeClass(row.status)}>
                      {getStatusIcon(row.status)} {row.status}
                    </StatusBadge>
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    {day(row.createdAt).format("DD-MMM-YYYY h:mm:ss")}
                  </td>
                  <td className="border border-gray-200 p-2 ">
                    <div className="action-icon text-gray-500 mr-2">
                      <FaEye
                        size={16}
                        onClick={() => {
                          setShowModal(true);
                          setClickedButton('view-claim')
                          setClaimData(row.claimData)
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {tableData.length > 0 && (
          <>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-8">
              {/* Showing entries */}
              <p className="text-gray-700">
                Showing {startIndex + 1} to {endIndex} entries per page
              </p>

              {/* Pagination controls */}
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "bg-gray-300 disabled:cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                {pages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (page !== "...") handlePageChange(page);
                    }}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={page === "..."}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 disabled:cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          </>
        )}

        <div className="flex justify-center mt-8">
          <div
            className="bg-gray-200 p-4 rounded-lg"
            style={{ width: "728px", height: "90px" }}
          >
            Top Ad Space 728×90
          </div>
        </div>
      </div>
      <ModalBox
        showModal={showModal}
        handleClose={handleClose}
        handleOk={handleClose}
        handleConfirm={handleConfirm}
        title={clickedButton === "view-claim" ? "Claim Successful" : null}
        buttonText={clickedButton === "view-claim" ? "Okay" : "Confirm"}
        type={clickedButton === "view-claim" ? "single" : ""}
        message={
          clickedButton === "view-claim" ? (
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
          ) : null
        }
      />
 </Wrapper>
  );
};

export default AdminClaims;
