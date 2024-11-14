import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import Sessions from "../models/Sessions.js";
import { verifyJWT } from "../utils/token.js";

export const authenticateUser = async (req, res, next) => {
 
  const { token } = req.cookies;
  if (!token) {
    return next(new UnauthenticatedError("authentication invalid! Kindly login again"));
  }
  try {
    const { userId, role, session } = verifyJWT(token);
    //check session status
    const sessionCheck = await Sessions.findOne({ sessionId: session });
    if (!sessionCheck || sessionCheck.status === "expired") {
    return next(new UnauthenticatedError("Session expired! Kindly login again"));
    }

req.user = { userId, role, session };                      
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
