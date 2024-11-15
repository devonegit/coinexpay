import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};


export const customCookieParset = (cookieString) => {
  return cookieString
    .split(";")
    .map((cookie) => cookie.trim())
    .reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = decodeURIComponent(value);
      return acc;
    }, {});
};
