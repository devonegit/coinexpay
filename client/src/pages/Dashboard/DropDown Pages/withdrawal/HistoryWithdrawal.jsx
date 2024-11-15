import React, { useState } from "react";
import { BreadCrumb, ComingSoon } from "../../../../components";
import { FaPlus, FaCheck, FaTimes, FaHourglassHalf } from "react-icons/fa";
import styled from "styled-components";
import { faker } from '@faker-js/faker'; // For generating random data
import { useQuery } from "react-query";
import customFetch from "../../../../utils/customFetch";
import { decrypt, decryptExit } from "../../../../utils/decryption";
import { toast } from "react-toastify";
import day from "dayjs";
import { useNavigate } from "react-router-dom";


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
    case "Completed":
      return "status-badge-approved";
    case "Rejected":
      return "status-badge-rejected";
    case "Pending":
      return "status-badge-pending";
    default:
      return "";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Completed":
      return <FaCheck className="text-green-600 mr-1" />;
    case "Rejected":
      return <FaTimes className="text-red-600 mr-1" />;
    case "Pending":
      return <FaHourglassHalf className="text-yellow-600 mr-1" />;
    default:
      return null;
  }
};



const HistoryWithdrawal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const rowsPerPage = 5; // Fixed number of rows per page
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const navigate = useNavigate();

  // Sort data by date in descending order
  const sortedData = [...tableData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
      pages.push(1, 2, 3, '...');
    } else if (currentPage >= totalPages - 1) {
      pages.push('...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
    }
  }






  // Using useQuery to fetch withdrawals
  const { data, isLoading, isError } = useQuery(
    ['withdrawals', currentPage, rowsPerPage], 
    async () => {
      const { data } = await customFetch.get(`/withdrawal/user/list`);
      return data;
    },
   
    {
      onSuccess: (data) => {
        
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }

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
    <>
      <BreadCrumb
        title="Withdrawals"
        breadcrumbs={[
          { label: "Home", href: "/dashboard" },
          { label: "Withdrawals", href: "/dashboard/withdrawals" },
        ]}
      />
      <div className="bg-white p-4 mt-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Withdrawal History
          </span>
        </h2>
        <hr className="my-4 border-t border-gray-300" />
        <p className="mb-4 text-gray-700">
          View your withdrawal history here. For any issues, use our live chat
          or create a support ticket.
        </p>
        <div className="flex justify-between mb-4 items-center">
          <div>
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
              onClick={() => navigate("/dashboard/withdraw/create")}
            >
              <FaPlus className="mr-2" />
              Create Withdrawal
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm border-t border-b border-gray-200">
            <thead>
              <tr>
                <th className="border-t border-b border-gray-200 p-2 bg-gray-100">
                  ID
                </th>
                <th className="border-t border-b border-gray-200 p-2 bg-gray-100 text-left">
                  Name
                </th>
                <th className="border-t border-b border-gray-200 p-2 bg-gray-100">
                  Amount
                </th>
                <th className="border-t border-b border-gray-200 p-2 bg-gray-100">
                  Fees
                </th>
                <th className="border-t border-b border-gray-200 p-2 bg-gray-100">
                  Gateway
                </th>
                <th className="border-t border-b border-gray-200 p-2 bg-gray-100">
                  Status
                </th>
                <th className="border-t border-b border-gray-200 p-2 bg-gray-100">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index}>
                  <td className="border-t border-b border-gray-200 p-2 text-center">
                    {row.wid}
                  </td>
                  <td className="border-t border-b border-gray-200 p-2 text-left">
                    {row.coin}
                  </td>
                  <td className="border-t border-b border-gray-200 p-2 text-center">
                    {row.withdrawAmount.balance}
                  </td>
                  <td className="border-t border-b border-gray-200 p-2 text-center">
                    {row.withdrawalFee.balance}
                  </td>
                  <td className="border-t border-b border-gray-200 p-2 text-center">
                    {row.paymentGateway}
                  </td>
                  <td className="border-t border-b border-gray-200 p-2 text-center">
                    <StatusBadge className={getStatusBadgeClass(row.status)}>
                      {getStatusIcon(row.status)} {row.status}
                    </StatusBadge>
                  </td>
                  <td className="border-t border-b border-gray-200 p-2 text-center">
                    {day(row.createdAt).format("DD-MMM-YYYY h:mm:ss")}
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
    </>
  );
};

export default HistoryWithdrawal;
