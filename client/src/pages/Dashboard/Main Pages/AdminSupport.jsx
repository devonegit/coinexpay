import React, { useEffect, useRef, useState } from "react";
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
day.extend(relativeTime);
import {
  FaEllipsisH,
  FaEllipsisV,
  FaSearch,
  FaUser,
  FaFolderOpen,
  FaFolder,
  FaTimes,
  FaTrashAlt,
  FaMinus,
  FaCircle,
  FaCheck,
  FaUndo,
} from "react-icons/fa";
import { toast } from "react-toastify";
import io from "socket.io-client";
import {
  connectSocket,
  disconnectSocket,
  subscribeAdminTyping,
  subscribeSendMessages,
  subscribeToTicketData,
  subscribeUpdateTickets,
  subscribeWatchMessages,
} from "./sockets/AdminSupport/SocketUtility";
import { nanoid } from "nanoid";
import { BreadCrumb } from "../../../components";
import styled from "styled-components";

const Wrapper = styled.div``;

const AdminSupport = () => {
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [ticketFilter, setTicketFilter] = useState("Open");
  const [allTicketData, setAllTicketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChatbox, setShowChatbox] = useState(true);
  const [isTyping, setIsTyping] = useState(false); // Track typing
  const typingTimeoutRef = useRef(null);

  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "Support", href: "/dashboard/refer-earn" },
  ];

  const handleAdminTyping = (e) => {
    if (!isTyping) {
      setIsTyping(true);
      subscribeAdminTyping({
        typing: true,
        ticketId: activeTicket.ticketId,
      });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing notification after 1 second
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      subscribeAdminTyping({
        typing: false,
        ticketId: activeTicket.ticketId,
      });
    }, 1000);
  };

  // Ref to track the chat container
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const socket = connectSocket();

    // Subscribe to ticket data updates from the server
    subscribeToTicketData((data) => {
      setAllTicketData(data.allTickets);
      setTicketData(data);
    });

    // Clean up when component unmounts
    return () => {
      disconnectSocket();
    };
  }, []);

  // Scroll to the bottom of the chat when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserClick = (index) => {
    setShowChatbox(true);
    setActiveTicketIndex(index);
    subscribeWatchMessages(activeTicket.ticketId, (response) => {
      if (response.error) {
        toast.error(response.error, { autoClose: 1000 });
      } else {
        console.log(response);
        setMessages(response.message);
      }
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = {
        messageID: nanoid(64),
        sender: "admin",
        ticketId: activeTicket.ticketId,
        text: newMessage,
        timestamp: day().format("YYYY-MMM-DD HH:mm:ss"),
      };
      subscribeSendMessages(messageData);

      // // Emit the message to the server
      // socket.emit("send-message", messageData);
      setMessages([...messages, { sender: "admin", text: newMessage }]);
      setNewMessage("");
    }
  };

  // Function to close the ticket
  const handleUpdateTicket = (action, ticketId) => {
    //closing tickets
    if (action === "Closed" || action === "Open" || action === "Delete") {
      subscribeUpdateTickets(ticketId, action, (response) => {
        if (response.error) {
          toast.error(response.error, { autoClose: 1000 });
        } else {
          setShowChatbox(false);
          setActiveTicketIndex(null);
          toast.success(response.message, { autoClose: 1000 });
        }
      });
    }
  };

  const truncateMessage = (message) => {
    const words = message.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : message;
  };

  const filteredTickets = allTicketData?.filter((ticket) => {
    return ticket.status === ticketFilter;
  });

  const activeTicket = filteredTickets[activeTicketIndex];

  return (
    <Wrapper>
      {/* <BreadCrumb title="Admin Support" breadcrumbs={breadcrumbs} /> */}
      {/* <div className="bg-white p-4 mt-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Admin Support: Live Chat
          </span>
        </h2>
        <hr className="my-4 border-t border-gray-300" />
        <p className="mb-4 text-gray-700">
          Need help with a technical issue? Use our live chat or create a
          support ticket for quick assistance.
        </p>
      </div> */}

      <div className="flex space-x-1 h-[75vh] mt-4">
        {/* List area */}

        <div className="w-1/4 bg-white rounded-lg shadow-md p-4 h-full overflow-hidden">
          {/* Search box */}
          <h2 className="text-xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Admin Support: Live Chat
          </span>
        </h2>
          <h2 className="text-2xl font-bold mb-6"></h2>
          <div className="flex items-center mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search username"
                className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 w-full"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button className="p-2 ml-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200">
              <FaEllipsisH />
            </button>
          </div>

          {/* Ticket filter */}
          <div className="flex justify-between items-center mb-2">
            <button
              className={`flex items-center space-x-2 p-1 rounded-lg text-sm ${
                ticketFilter === "Open"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
              onClick={() => setTicketFilter("Open")}
            >
              <FaFolderOpen className="w-4 h-4" />
              <span>Open Tickets</span>
            </button>
            <button
              className={`flex items-center space-x-2 p-1 rounded-lg text-sm ${
                ticketFilter === "Closed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
              onClick={() => setTicketFilter("Closed")}
            >
              <FaFolder className="w-4 h-4" />
              <span>Closed Tickets</span>
            </button>
          </div>
          {/* Ruler */}
          <div className="border-b border-gray-300 mb-2"></div>

          {/* User list */}
          <ul className="max-h-[60vh] overflow-y-auto">
            {filteredTickets
              .filter((ticket) => ticket.conversation.length > 0)
              .map((ticket, index) => (
                <li
                  key={index}
                  className={`flex items-center p-2 rounded-lg ${
                    activeTicketIndex === index ? "bg-blue-100" : ""
                  } mb-2 cursor-pointer`}
                  onClick={() => handleUserClick(index)}
                >
                  <div className="relative flex-shrink-0 bg-gray-200 p-2 rounded-full">
                    <FaUser className="text-gray-500 w-4 h-4" />
                    <span
                      className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
                        ticket.onlineStatus === "offline"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                  </div>
                  <div className="flex-grow ml-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">
                        {ticket.createdByName}
                      </span>
                      <span className="text-gray-500 ml-2 text-xs">
                        {day(
                          ticket?.conversation[ticket?.conversation.length - 1]
                            ?.timestamp,
                          "YYYY-MMM-DD HH:mm:ss"
                        ).fromNow()}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs truncate ">
                      {truncateMessage(
                        ticket?.conversation[ticket?.conversation.length - 1]
                          .text
                      )}
                    </div>
                  </div>

                  <button className="ml-2 p-2 text-gray-500 hover:text-gray-700">
                    <FaEllipsisV />
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {showChatbox && (
          <>
            {/* Chat area */}
            <div className="flex flex-col w-3/4 bg-white rounded-lg shadow-md h-full">
              {/* Header */}
              {activeTicket && activeTicket.conversation.length > 0 && (
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gray-200 p-2 rounded-full">
                      <FaUser className="text-gray-500 w-4 h-4" />
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-700 text-base">
                        {activeTicket.createdByName}
                      </div>
                      <div
                        className={`text-sm font-semibold flex items-center ${
                          activeTicket.onlineStatus === "offline"
                            ? "text-red-500" // Red text for offline
                            : "text-green-500" // Green text for active
                        }`}
                      >
                        {activeTicket.onlineStatus === "offline" ? (
                          <>
                            {/* Red dot for offline */}
                            <FaCircle className="text-red-500 mr-1" size={8} />
                            offline
                          </>
                        ) : (
                          <>
                            {/* Green tick for active */}
                            <FaCheck
                              className="text-green-500 mr-1"
                              size={10}
                            />
                            active now
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {activeTicket.status === "Open" ? (
                      <button
                        className="p-1.5 text-gray-500 hover:text-blue-500 bg-gray-100 rounded-full mr-3 text-sm"
                        onClick={() =>
                          handleUpdateTicket("Closed", activeTicket.ticketId)
                        }
                      >
                        <FaTimes />
                      </button>
                    ) : (
                      <button
                        className="p-1.5 text-gray-500 hover:text-blue-500 bg-gray-100 rounded-full mr-3 text-sm"
                        onClick={() =>
                          handleUpdateTicket("Open", activeTicket.ticketId)
                        }
                      >
                        <FaUndo />
                      </button>
                    )}
                    <button
                      className="p-1.5 text-gray-500 hover:text-blue-500 bg-gray-100 rounded-full mr-3 text-sm"
                      onClick={() =>
                        handleUpdateTicket("Delete", activeTicket.ticketId)
                      }
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      className="p-1.5 text-gray-500 hover:text-blue-700 bg-gray-100 rounded-full text-sm"
                      onClick={() => {
                        setActiveTicketIndex(null);
                        setShowChatbox(false);
                      }}
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
              )}
              <div
                ref={chatContainerRef}
                className="flex-grow p-4 overflow-y-auto"
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "admin" ? "justify-end" : "justify-start"
                    } mb-2`}
                  >
                    <div
                      className={`${
                        msg.sender === "admin"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      } p-2 rounded-lg max-w-xs`}
                    >
                      <span>{msg.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              {activeTicket && activeTicket.conversation.length > 0 && (
                <form
                  className="flex items-center p-4 border-t"
                  onSubmit={handleSendMessage}
                >
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      handleAdminTyping(e);
                    }}
                    className="flex-grow p-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 "
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-lg "
                  >
                    Send
                  </button>
                </form>
              )}
              <div className="border-t border-gray-300 mt-2"></div>{" "}
              {/* Light gray ruler */}
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default AdminSupport;
