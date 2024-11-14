import React, { useState } from "react";
import {
  FaPlus,
  FaCheck,
  FaTimes,
  FaHourglassHalf,
  FaRegEnvelope,
} from "react-icons/fa";
import styled from "styled-components";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25em 0.75em;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
  }

  .status-badge-open {
    background-color: #d1fae5;
    color: #065f46;
  }

  .status-badge-open:hover {
    background-color: #a7f3d0;
    color: #047857;
  }

  .status-badge-closed {
    background-color: #fef2f2;
    color: #b91c1c;
  }

  .status-badge-closed:hover {
    background-color: #fee2e2;
    color: #991b1b;
  }

  .table {
    font-size: 0.875rem;
    width: 100%;
    border-collapse: collapse;
  }

  .table th,
  .table td {
    padding: 0.5em 1em;
    border: 1px solid #e5e7eb;
  }

  .table th {
    background-color: #f3f4f6;
  }

  .table td.left {
    text-align: left;
  }

  .table td.center {
    text-align: center;
  }

  .table th.left {
    text-align: left;
  }
  .table th.center {
    text-align: center;
  }

  .status-icon {
    display: inline-flex;
    align-items: center; /* Center vertically */
    justify-content: center; /* Center horizontally */
    transition: color 0.3s, transform 0.3s;
    cursor: pointer;
  }

  .status-icon:hover {
    color: #2563eb;
    transform: scale(1.1);
  }
`;

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Open":
      return "status-badge status-badge-open";
    case "Closed":
      return "status-badge status-badge-closed";
    default:
      return "status-badge"; // Default badge class
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Open":
      return <FaCheck className="status-icon mr-1" />;
    case "Closed":
      return <FaTimes className="status-icon mr-1" />;
    default:
      return null;
  }
};
const TicketHistoryTable = ({ tableData, handleChatClick, setRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Fixed number of rows per page
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  // Sort data by date in descending order
  const sortedData = [...tableData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
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
  return (
    <Wrapper>
      <div className="overflow-x-auto">
        <table className="table bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th className="ticket-type left">Ticket Type</th>
              <th className="ticket-message left">Ticket Message</th>
              <th className="ticket-time">Ticket Time</th>
              <th className="status">Status</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={row.ticketId}>
                <td className="center">{row.ticketId}</td>
                <td className="left">{row.type}</td>
                <td className="left">{row.description}</td>
                <td className="center">
                  {day(row.createdAt).format("DD-MMM-YYYY h:mm:ss")}
                </td>
                <td className="center">
                  <span className={getStatusBadgeClass(row.status)}>
                    {getStatusIcon(row.status)} {row.status}
                  </span>
                </td>

                
                <td className="center">
                  {row.status !== "Closed" &&  (
                    <FaRegEnvelope
                      onClick={() => {
                        // console.log(row)
                        // setRow(row);
                        handleChatClick(row);
                        setRow(row);
                      }}
                      className="status-icon text-blue-500 hover:text-blue-600"
                    />
                    
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                ? "bg-gray-300 cursor-not-allowed"
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
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    </Wrapper>
  );
};

export default TicketHistoryTable;
