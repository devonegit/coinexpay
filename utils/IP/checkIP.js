import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Address4, Address6 } from "ip-address";
import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import {fetchLocation} from "./getAddress.js";


// Define __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to check if an IP address matches a range from a file
const checkRevProxyIp = async (file, remoteAddr) => {
  const filePath = path.join(__dirname, file);

  // Ensure the file exists before proceeding
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return false; // Return false if the file doesn't exist
  }

  const ipRanges = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean); // Removes empty lines

  return ipRanges.some((range) => {
    try {
      console.log(`Checking range: ${range} against IP: ${remoteAddr}`);

      if (remoteAddr.includes(":")) {
        // IPv6 handling
        if (Address6.isValid(range) && Address6.isValid(remoteAddr)) {
          const address = new Address6(remoteAddr);
          const cidr = new Address6(range);
          return address.isInSubnet(cidr);
        } else {
          console.error(
            `Invalid IPv6 address or range: ${remoteAddr} or ${range}`
          );
          return false;
        }
      } else {
        // IPv4 handling
        if (Address4.isValid(range) && Address4.isValid(remoteAddr)) {
          const address = new Address4(remoteAddr);
          const cidr = new Address4(range);
          return address.isInSubnet(cidr);
        } else {
          console.error(
            `Invalid IPv4 address or range: ${remoteAddr} or ${range}`
          );
          return false;
        }
      }
    } catch (error) {
      console.error(
        `Error parsing IP range: ${range} or IP: ${remoteAddr}`,
        error
      );
      return false;
    }
  });
};

// Main function to get client IP, accounting for reverse proxies
const getIP = async (req, reverseProxyEnabled = false) => {
  let ip = process.env.NODE_ENV === "production" ? req.ip : process.env.IP; // Default IP address from Express’s IP handling

  // Handle localhost (IPv6 or IPv4 loopback)
  if (ip === "::1" || ip === "127.0.0.1") {
    console.log("Request is from localhost:", ip);
    ip = req.headers["x-forwarded-for"]?.split(",")[0] || ip; // Taking the first forwarded IP
  }

  // Check if reverse proxy handling is enabled
  if (reverseProxyEnabled) {
    const remoteAddr =
      process.env.NODE_ENV === "production"
        ? req.connection.remoteAddress
        : process.env.IP || process.env.NODE_ENV === "production"
        ? req.ip
        : process.env.IP;

    // Ensure that the IP is not loopback and only check ranges for valid IPs
    if (remoteAddr !== "::1" && remoteAddr !== "127.0.0.1") {
      // Try to extract the real IP from the appropriate headers
      if (req.headers["x-forwarded-for"]) {
        // The first IP in X-Forwarded-For is the real client IP
        ip = req.headers["x-forwarded-for"].split(",")[0].trim();
      } else if (req.headers["x-real-ip"]) {
        // Fallback to X-Real-IP if no X-Forwarded-For header is found
        ip = req.headers["x-real-ip"];
      }

      // Check if the IP matches Cloudflare or Incapsula ranges
      if (checkRevProxyIp("/ips/cloudflare.txt", remoteAddr)) {
        ip = req.headers["cf-connecting-ip"] || remoteAddr;
      } else if (checkRevProxyIp("/ips/incapsula.txt", remoteAddr)) {
        ip = req.headers["incap-client-ip"] || remoteAddr;
      }
    } else {
      console.log("Skipping reverse proxy IP check for localhost");
    }
  }

  return ip;
};

const detectRevProxyProvider = async (req) => {
  let remoteAddr =
    process.env.NODE_ENV === "production"
      ? req.connection.remoteAddress
      : process.env.IP || process.env.NODE_ENV === "production"
      ? req.ip
      : process.env.IP;

  // Check for the X-Real-IP header first
  if (req.headers["x-real-ip"]) {
    remoteAddr = req.headers["x-real-ip"];
  }
  // Then check for the X-Forwarded-For header if x-real-ip is not available
  else if (req.headers["x-forwarded-for"]) {
    // X-Forwarded-For may contain multiple IPs (comma-separated), so we get the first one
    remoteAddr = req.headers["x-forwarded-for"].split(",")[0].trim();
  }

  // If the request is from localhost, handle accordingly
  if (remoteAddr === "::1" || remoteAddr === "127.0.0.1") {
    console.log("Request is from localhost:", remoteAddr);
    // When localhost, prefer the x-forwarded-for if available
    remoteAddr = req.headers["x-forwarded-for"]?.split(",")[0] || remoteAddr; // Taking the first forwarded IP
  }

  // Check if the IP matches Cloudflare or Incapsula ranges
  if (checkRevProxyIp("ips/cloudflare.txt", remoteAddr)) {
    return "CloudFlare";
  } else if (checkRevProxyIp("ips/incapsula.txt", remoteAddr)) {
    return "Incapsula";
  }

  return "none"; // If no match, return "none"
};

// Function to check IP using IPHub API
const checkIPHub = async (req) => {
  const ip = await getIP(req);
  console.log(`Checking IP: ${ip}`);
  const url = `http://v2.api.iphub.info/ip/${ip}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-Key": process.env.IPHUB_API_KEY,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0",
      },
      timeout: 10000, // 10 seconds timeout
    });

    const data = response.data;

    if (data && data.block !== undefined) {
      return {
        service: "IPHub",
        status: 200,
        asn: data.asn ? { asn: data.asn, name: data.isp } : null,
        country:
          data.countryCode && data.countryName
            ? { code: data.countryCode, country: data.countryName }
            : null,
        suggestion: data.block === 1 ? "deny" : "allow",
      };
    }
    return {}; // Return empty object if no valid response
  } catch (error) {
    console.error("Error while checking IP:", error);
    return {}; // Return empty object on error
  }
};
const checkIPInfo = async (req) => {
  const ip = await getIP(req);

  console.log(
    `Checking IP: ${
      process.env.NODE_ENV === "production" ? ip : process.env.IP
    }`
  );
  const url = `http://ipinfo.io/${
    process.env.NODE_ENV === "production" ? ip : process.env.IP
  }`;

  try {
    const response = await axios.get(url, {
      params: {
        token: process.env.IPINFO_API_KEY, // Set the IP as a query parameter
      },
      timeout: 10000, // 10 seconds timeout
    });

    const data = response.data;

    if (data) {
    //   const [latitude, longitude] = data.loc.split(",");

    //   // Set a timeout of 10 seconds for fetchLocation
    //   const getLocationPromise = new Promise((resolve, reject) => {
    //     setTimeout(() => reject(new Error("Location fetch timed out")), 5000); // 5 seconds
    //     fetchLocation(latitude, longitude).then(resolve).catch(reject);
    //   });

    //   const locations = await getLocationPromise;
    //   console.log(locations.results);

      return data;
    }
    return {}; // Return empty object if no valid response
  } catch (error) {
    console.error("Error while checking IP:", error);
    return {}; // Return empty object on error
  }
};

export {
  checkRevProxyIp,
  getIP,
  detectRevProxyProvider,
  checkIPHub,
  checkIPInfo,
};
