import {
    UnauthenticatedError,
    UnauthorizedError,
  } from "../errors/customErrors.js";
  import Sessions from "../models/Sessions.js";
  import { verifyJWT } from "../utils/token.js";
  
  export const socketAuth = (io) => {
    io.use(async (socket, next) => {
      // Extract the cookie from the handshake headers
      const cookies = socket.handshake.headers.cookie;
      const ticketId = socket.handshake.query.ticketId;
      let formattedCookies;
  
      if (cookies) {
        // Function to parse cookies into an object
        const parseCookies = (cookieString) => {
          return cookieString
            .split(";")
            .map((cookie) => cookie.trim())
            .reduce((acc, cookie) => {
              const [name, value] = cookie.split("=");
              acc[name] = decodeURIComponent(value);
              return acc;
            }, {});
        };
  
        formattedCookies = parseCookies(cookies);
      }
  
      // Extract the token from cookies
      const token = formattedCookies ? formattedCookies["token"] : null;
  
  
      if (token === null) {
        return next(
          new UnauthenticatedError("Authentication invalid! Kindly login again")
        );
      }
  
      try {
        // Validate the token using your authentication middleware
        const { userId, role, session } = verifyJWT(token);
        
        // Check session status
        const sessionCheck = await Sessions.findOne({ sessionId: session });
        if (!sessionCheck || sessionCheck.status === "expired") {
          return next(new UnauthenticatedError("Session expired! Kindly login again"));
        }
  
        // Attach user information to socket
        socket.user = { userId, role, session, ticketId };
        next(); // Proceed to next middleware or connection handler
  
      } catch (err) {
        console.error(err);
        next(new UnauthenticatedError("Invalid token! Kindly login again"));
      }
    });
  };



  export const supportsocketAuth = (io) => {
    io.use(async (socket, next) => {
      // Extract the cookie from the handshake headers
      const cookies = socket.handshake.headers.cookie;
      const ticketId = socket.handshake.query.ticketId;
      const room = socket.handshake.query.room;
      let formattedCookies;
  
      if (cookies) {
        // Function to parse cookies into an object
        const parseCookies = (cookieString) => {
          return cookieString
            .split(";")
            .map((cookie) => cookie.trim())
            .reduce((acc, cookie) => {
              const [name, value] = cookie.split("=");
              acc[name] = decodeURIComponent(value);
              return acc;
            }, {});
        };
  
        formattedCookies = parseCookies(cookies);
      }
  
      // Extract the token from cookies
      const token = formattedCookies ? formattedCookies["token"] : null;
  
  
      if (token === null) {
        return next(
          new UnauthenticatedError("Authentication invalid! Kindly login again")
        );
      }
  
      try {
        // Validate the token using your authentication middleware
        const { userId, role, session } = verifyJWT(token);
        
        // Check session status
        const sessionCheck = await Sessions.findOne({ sessionId: session });
        if (!sessionCheck || sessionCheck.status === "expired") {
          return next(new UnauthenticatedError("Session expired! Kindly login again"));
        }
  
        // Attach user information to socket
        socket.user = { userId, role, session,ticketId, room };
        next(); // Proceed to next middleware or connection handler
  
      } catch (err) {
        console.error(err);
        next(new UnauthenticatedError("Invalid token! Kindly login again"));
      }
    });
  };


  export const timersocketAuth = (io) => {
    io.use(async (socket, next) => {
      // Extract the cookie from the handshake headers
      const cookies = socket.handshake.headers.cookie;
      const claimId = Number(socket.handshake.query.claimID);
      const coin = socket.handshake.query.coin;
      const room = socket.handshake.query.room;
      let formattedCookies;
  
      if (cookies) {
        // Function to parse cookies into an object
        const parseCookies = (cookieString) => {
          return cookieString
            .split(";")
            .map((cookie) => cookie.trim())
            .reduce((acc, cookie) => {
              const [name, value] = cookie.split("=");
              acc[name] = decodeURIComponent(value);
              return acc;
            }, {});
        };
  
        formattedCookies = parseCookies(cookies);
      }
  
      // Extract the token from cookies
      const token = formattedCookies ? formattedCookies["token"] : null;
  
  
      if (token === null) {
        return next(
          new UnauthenticatedError("Authentication invalid! Kindly login again")
        );
      }
  
      try {
        // Validate the token using your authentication middleware
        const { userId, role, session } = verifyJWT(token);
        
        // Check session status
        const sessionCheck = await Sessions.findOne({ sessionId: session });
        if (!sessionCheck || sessionCheck.status === "expired") {
          return next(new UnauthenticatedError("Session expired! Kindly login again"));
        }
  
        // Attach user information to socket
        socket.user = { userId, role, session,claimId,coin, room };
        next(); // Proceed to next middleware or connection handler
  
      } catch (err) {
        console.error(err);
        next(new UnauthenticatedError("Invalid token! Kindly login again"));
      }
    });
  };
  
  