import React, { useState, useEffect, useRef } from "react";

import {
  BreadCrumb,
  ReferandEarnCard,
  ModalBox,
  TicketHistoryTable,
} from "../../../components";
import { FaPlus, FaRegEnvelope, FaCheck, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { FaUser, FaUserTie } from "react-icons/fa"; // Adjust based on your icon preference
import io from "socket.io-client";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";
import { decrypt, decryptExit } from "../../../utils/decryption";
import { useNavigate } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { nanoid } from "nanoid";
import { BeatLoader } from "react-spinners";

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

const Support = () => {
  const [isChatboxOpen, setChatboxOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [clickedButton, setClickedButton] = useState();
  const [row, setRow] = useState({});
  const [formDataCreateTicket, setFormDataCreateTicket] = useState({});
  const [loading, setLoading] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [isAdminTyping, setIsAdminTyping] = useState(false);

  // Ref to track the chat container
  const chatContainerRef = useRef(null);

  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "Support", href: "/dashboard/refer-earn" },
  ];

  const { refetch: getTicketListRefetch } = useQuery(
    "get-ticketList-user",
    async () => {
      const { data } = await customFetch.get("/support/get-list-user");
      return data;
    },
    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }
        setTicketList(dataDecrypt.list);
      },

      onError: (error) => {
        toast.error(error.response.data.msg);
      },
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }

      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClose = () => {
    setShowModal(false);
    setFormDataCreateTicket({});
    setRow({});
  };

  const handleConfirm = async () => {
    if (clickedButton === "create-ticket") {
      try {
        setLoading(true);
        if (!formDataCreateTicket.type) {
          toast.error("Please select ticket type", {
            autoClose: 1000,
          });
          return;
        }
        
        if (!formDataCreateTicket.description) {
          toast.error("Please enter description", {
            autoClose: 1000,
          });
          return;
        }
        await customFetch.post(`/support/create-ticket`, formDataCreateTicket);
        toast.success("Ticket Created successfully", {
          autoClose: 1000,
        });

        setLoading(false);
        handleClose();
        setShowModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast.error(error.response.data.msg, {
          autoClose: 1000,
        });
      }
    }
  };

  const handleInputChange_createTicket = (e) => {
    const { name, value, type } = e.target;

    if (e.target.type === "select-one") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const selectedValue = selectedOption.value;

      if (name === "type") {
        setFormDataCreateTicket({
          ...formDataCreateTicket,
          type: selectedValue,
        });
      }
    }

    setFormDataCreateTicket({
      ...formDataCreateTicket,
      [name]: value,
    });
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      const newMessage = {
        messageID: nanoid(64),
        sender: "user",
        ticketId: row?.ticketId,
        text: userMessage,
        timestamp: day().format("YYYY-MMM-DD HH:mm:ss"),
      };

      // Emit the message to the server
      socket.emit("send-message", newMessage);

      // Add the message to local state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setUserMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleChatClick = (row) => {
    //close all previous socket connections
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    // If opening the chatbox, establish the socket connection
    const newSocket = io("http://localhost:5100/support", {
      withCredentials: true,
      query: {
        ticketId: Number(row?.ticketId),
        room:'support'
      },
    });

    // Listen for incoming messages from server
    newSocket.on("receive-message", (message) => {
      setMessages(message.message);
    });

    // Listen for admin typing
    newSocket.on("send-admin-typing", (message) => {
      setIsAdminTyping(message.message.typing);
    });

    // Connected Closed By Admin
    newSocket.on("ticket_closed", (data) => {
      if (data.status === "Closed") {
        setSocket(null);
        setChatboxOpen(false);
        toast.error("Ticket Closed By Admin", {
          autoClose: 1000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });

    // Handle socket connection errors
    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error: ", err);
      toast.error("Unable to connect to chat server.");
    });

    setSocket(newSocket);
    setChatboxOpen(true);
  };

  // Add a separate function to handle chat box close

  const handleChatClose = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    setChatboxOpen(false);
  };

  return (
    <Wrapper>
      <BreadCrumb title="Support" breadcrumbs={breadcrumbs} />
      <div className="bg-white p-4 mt-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Contact Support: Live Chat
          </span>
        </h2>
        <hr className="my-4 border-t border-gray-300" />
        <p className="mb-4 text-gray-700">
          Need help with a technical issue? Use our live chat or create a
          support ticket for quick assistance.
        </p>
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center bg-gradient-to-r from-blue-500 to-blue-700"
            onClick={() => {
              setShowModal(true);
              setClickedButton("create-ticket");
            }}
          >
            <FaPlus className="mr-2" />
            Create Ticket
          </button>
        </div>

        {ticketList.length !== 0 && (
          <TicketHistoryTable
            tableData={ticketList}
            handleChatClick={handleChatClick}
            setRow={setRow}
          />
        )}

        <div
          className={`chatbox ${
            isChatboxOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="chatbox-header">
            <div className="text-lg font-bold">Live Chat</div>
            <button
              onClick={handleChatClose}
              className="text-xl text-gray-600 hover:text-gray-800"
            >
              <IoMdClose />
            </button>
          </div>
          <div className="chatbox-messages" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.sender === "user" ? "message-user" : "message-admin"
                }`}
              >
                {message.text}
                {/* <div className="timestamp">{message.timestamp}</div> */}
              </div>
            ))}

            {/* Conditionally render the typing progress bar when isAdminTyping is true */}
            {isAdminTyping === true && (
              <div className="typing-indicator">
                <BeatLoader />
              </div>
            )}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>

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
        handleConfirm={handleConfirm}
        handleOk={handleClose}
        title={
          clickedButton === "create-ticket" ? "Create Support Ticket" : null
        }
        buttonText="Confirm"
        message={
          clickedButton === "create-ticket" ? (
            <>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-3"
                    >
                      Ticket Type:
                    </label>
                    <select
                      id="status"
                      name="type"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 sm:text-sm transition duration-300 ease-in-out"
                      onChange={(e) => handleInputChange_createTicket(e)}
                    >
                      <option value="">Select</option>
                      <option
                        value="General"
                        title="Use this for general inquiries or feedback."
                      >
                        General
                      </option>
                      <option
                        value="Technical Issue"
                        title="Select for any technical problems or issues with the platform."
                      >
                        Technical Issue
                      </option>
                      <option
                        value="Withdrawal"
                        title="Choose for requests related to withdrawing funds from your account."
                      >
                        Withdrawal
                      </option>
                      <option
                        value="Deposit"
                        title="Select for assistance with making deposits into your account."
                      >
                        Deposit
                      </option>
                    </select>
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-3"
                  >
                    Message:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe your query or issue here"
                    className="block w-full h-32 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 sm:text-sm transition duration-300 ease-in-out resize-none"
                    onChange={(e) => handleInputChange_createTicket(e)}
                    title="Please provide a detailed description of your query or issue. Include relevant information to help us assist you."
                  />
                </div>
              </form>
            </>
          ) : null
        }
      />
    </Wrapper>
  );
};

export default Support;
