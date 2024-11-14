import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

import SupportTicket from "../models/SupportTicket.js";
import { encrypt } from "../utils/encryption.js";

export const createTicket = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (user.role !== "user") {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }

    const ticketCounts = await SupportTicket.find().countDocuments();
    req.body.createdBy = req.user.userId;
    req.body.ticketId = Number(100000 + ticketCounts);
    req.body.createdByName = user.username;

    const ticket = await SupportTicket.create(req.body);
    res.status(StatusCodes.OK).json({ msg: "updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const getTicketList_User = async (req, res) => {
  try {
    const taskList = await SupportTicket.find({
      createdBy: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res
      .status(StatusCodes.OK)
      .json(encrypt({ msg: "successfully modified", list: taskList }));
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

let connectedUsers = []; // Stores connected user info
let connectedUsersNew = new Set(); // Stores connected user info

export const socketController = async (socket, io) => {
  console.log("New client connected:", socket.user);
  const fetchTickets = async () => {
    try {
      // Fetch open and closed tickets concurrently
      const [openTickets, closeTickets] = await Promise.all([
        SupportTicket.find({ status: "Open" }),
        SupportTicket.find({ status: "Closed" }),
      ]);

      // Function to enhance ticket with online status
      const enhanceTicket = (ticket) => ({
        ...ticket.toObject(),
        onlineStatus: connectedUsersNew.has(Number(ticket.ticketId))
          ? "online"
          : "offline",
      });

      const enhancedOpenTickets = openTickets.map(enhanceTicket);
      const enhancedCloseTickets = closeTickets.map(enhanceTicket);

      // Send ticket data to admin if the user is an admin
      // Find the admin socket
      const adminSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.user?.role === "admin"
      );
      if (adminSocket) {
        adminSocket.emit("ticketData", {
          openTickets: enhancedOpenTickets,
          closeTickets: enhancedCloseTickets,
          allTickets: [...enhancedOpenTickets, ...enhancedCloseTickets],
        });
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      socket.emit("ticketData", { error: "Failed to fetch tickets" });
    }
  };

  const fetchTicketMessageData = async (ticketId) => {
    const adminSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.user?.role === "admin"
    );

    const userSocket = Array.from(io.sockets.sockets.values()).find(
      (s) =>
        Number(s.user?.ticketId) === Number(ticketId) && s.user?.role === "user"
    );

    try {
      //update conversation array of messages in supportTicket
      const ticket = await SupportTicket.findOne({ ticketId: ticketId });
      // Find the admin socket
      if (adminSocket) {
        if (!ticket) {
          adminSocket.emit("send-watch-messages", {
            error: "Ticket not found",
          });
          return;
        }
        adminSocket.emit("send-watch-messages", {
          message: ticket.conversation,
        });
      }

      // Find the user socket
      if (userSocket) {
        if (!ticket) {
          userSocket.emit("receive-message", {
            error: "Ticket not found",
          });
          return;
        }
        userSocket.emit("receive-message", {
          message: ticket.conversation,
        });
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      adminSocket.emit("send-watch-messages", {
        error: "Failed to fetch ticket",
      });
      userSocket.emit("receive-message", {
        error: "Failed to fetch ticket",
      });
    }
  };

  // Function to update the ticket data for the single admin
  const updateAdminTicketData = async () => {
    // Find the admin socket
    const adminSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.user?.role === "admin"
    );
    if (adminSocket) {
      await fetchTickets(); // Fetch updated tickets and emit to the admin
    }
  };

  // Function to update the ticket data for the single admin
  const updateAdminTicket_MessageData = async (ticketId) => {
    // Find the admin socket
    const adminSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.user?.role === "admin"
    );
    if (adminSocket) {
      await fetchTicketMessageData(ticketId); // Fetch updated tickets and emit to the admin
    }
  };

  // amin request for ticketData
  socket.on("get-ticket-data", async () => {
    if (socket.user?.role === "admin") {
      await fetchTickets();
    }
  });

  //admin typing notification
  socket.on("admin-typing", (data) => {
    if (socket.user?.role === "admin") {
      const userSocket = Array.from(io.sockets.sockets.values()).find(
        (s) =>
          Number(s.user?.ticketId) === Number(data.ticketId) &&
          s.user?.role === "user"
      );
      // Find the user socket
      if (userSocket) {
        userSocket.emit("send-admin-typing", {
          message: data,
        });
      }
    }
  });

  // admin close the tickets
  socket.on("update-ticket-admin", async (data) => {
    if (socket.user?.role === "admin") {
      try {
        if (data.action === "Open" || data.action === "Closed") {
          const ticket = await SupportTicket.findOneAndUpdate(
            { ticketId: data.ticketId },
            { status: data.action },
            { new: true }
          );

          if (!ticket) {
            socket.emit("update-ticket-admin_response", {
              error: "Ticket not found",
            });
            return;
          }
          socket.emit("update-ticket-admin_response", {
            message: `Ticket ${data.action} successfully`,
          });

          // If the ticket is closed, disconnect the associated user
          if (data.action === "Closed") {
            const userSocket = Array.from(io.sockets.sockets.values()).find(
              (socket) => {
                return (
                  Number(socket.user?.ticketId) === Number(ticket.ticketId)
                );
              }
            );

            if (userSocket) {
              // Notify the user

              userSocket.emit("ticket_closed", {
                message: "Your ticket has been closed by an admin.",
                status: "Closed",
              });
              // Disconnect the user
              userSocket.disconnect();
            }
          }

          await updateAdminTicketData();
        }

        if (data.action === "Delete") {
          const ticket = await SupportTicket.findOneAndDelete({
            ticketId: data.ticketId,
          });

          if (!ticket) {
            socket.emit("update-ticket-admin_response", {
              error: "Ticket not found",
            });
            return;
          }
          socket.emit("update-ticket-admin_response", {
            message: "Ticket deleted successfully",
          });
          await updateAdminTicketData();
        }
      } catch (error) {
        console.error("Error updating ticket:", error);
        socket.emit("update-ticket-admin_response", {
          error: "Failed to fetch tickets",
        });
      }
    }
  });

  // admin close the tickets
  socket.on("get-watch-messages", async (ticketId) => {
    if (socket.user?.role === "admin" || socket.user?.role === "user") {
      try {
        await updateAdminTicket_MessageData(ticketId);
        await updateAdminTicketData();
      } catch (error) {
        console.error("Error updating ticket:", error);
        socket.emit("send-watch-messages", {
          error: "Failed to fetch tickets",
        });
      }
    }
  });

  socket.on("send-message", async (data) => {
    if (socket.user?.role === "admin" || socket.user?.role === "user") {
      try {
        //update conversation array of messages in supportTicket
        const ticket = await SupportTicket.findOneAndUpdate(
          { ticketId: data.ticketId },
          { $push: { conversation: data } },
          { new: true }
        );
        if (!ticket) {
          socket.emit("receive-message", {
            error: "Ticket not found",
          });
          return;
        }

        socket.emit("receive-message", {
          message: ticket.conversation,
        });

        await updateAdminTicket_MessageData(data.ticketId);
        await updateAdminTicketData();
      } catch (error) {
        console.error("Error updating ticket:", error);
        socket.emit("receive-message", {
          error: "Failed to fetch tickets",
        });
      }
    }
  });

  if (socket.user.role === "user") {
    connectedUsersNew.add(Number(socket.user.ticketId));
    const ticket = await SupportTicket.findOne({
      ticketId: socket.user.ticketId,
    });
    socket.emit("receive-message", {
      message: ticket.conversation,
    });

    // After the user connects, update admin with the latest ticket data
    await updateAdminTicketData();
  }

  socket.on("disconnect", async () => {
    console.log("Client disconnected");

    if (socket.user.role === "user") {
      connectedUsersNew.delete(Number(socket.user.ticketId));

      // After the user disconnects, update admin with the latest ticket data
      await updateAdminTicketData();
    }
  });
};
