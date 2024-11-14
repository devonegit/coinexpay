import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5100/support", {
      withCredentials: true,
      query: {
        room:'support'
      },
    });

    // Emit request for ticket data on connection
    socket.emit("get-ticket-data");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const subscribeToTicketData = (callback) => {
  if (!socket) return;
  socket.on("ticketData", (ticketData) => {
    callback(ticketData);
  });
};

export const subscribeToUserList = (callback) => {
  if (!socket) return;
  socket.on("update-user-list", (users) => {
    callback(users);
  });
};

export const subscribeUpdateTickets = (ticketId, action, callback) => {
  if (socket) {
    // Emit the close ticket action
    const data = {
      action,
      ticketId,
    };
    socket.emit("update-ticket-admin", data);

    // Listen for the server's response
    socket.once("update-ticket-admin_response", (response) => {
      callback(response); // Call the callback with the response
    });
  }
};

export const subscribeWatchMessages = (ticketId, callback) => {
  if (socket) {
    socket.emit("get-watch-messages", ticketId);

    // Listen for the server's response
    socket.on("send-watch-messages", (response) => {
      callback(response); // Call the callback with the response
    });
  }
};


export const subscribeSendMessages = (messageData, callback) => {
  if (socket) {
    socket.emit("send-message", messageData);

  }
};

export const subscribeAdminTyping = (messageData, callback) => {
  if (socket) {
    socket.emit("admin-typing", messageData);

  }
};

