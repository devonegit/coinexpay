import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import customFetch from "../../utils/customFetch";
import {
  FaEnvelope,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";

import logo from "../../assets/images/logo.jpg";

import styled from "styled-components";
import { use } from "express/lib/router";

// Tailwind classes are used within styled-components
const Wrapper = styled.div`
  .input-box {
    background-color: rgba(8, 88, 247, 0.06); /* Light background */
    border: 1px solid rgba(156, 163, 175, 0.5); /* Light border */
    border-radius: 0.375rem; /* Rounded corners */
    transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
    position: relative; /* Ensure child elements can be absolutely positioned */
  }

  .input-box:focus-within {
    box-shadow: 0 0 10px rgba(61, 131, 247, 0.5); /* Glowing effect */
    border-color: rgb(61, 131, 247); /* Blue border on focus */
  }

  .input-icon {
    margin-right: 1rem; /* Space between icon and input text */
    color: rgba(61, 131, 247, 0.7); /* Icon color */
    position: absolute;
    left: 0.75rem; /* Space from the left edge */
    top: 50%;
    transform: translateY(-50%);
  }

  .input-icon-wrapper {
    position: relative;
    width: 3rem; /* Width to accommodate the icon */
  }

  .input-box input {
    padding-left: 0.5rem; /* Space for the left icon */
    padding-right: 3rem; /* Space for the right icon */
    width: 100%;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: #333;
  }

  .password-wrapper {
    position: relative;
  }

  .password-icon {
    position: absolute;
    right: 1rem; /* Space from the right edge */
    top: 50%;
    transform: translateY(-50%);
    color: rgba(61, 131, 247, 0.7); /* Icon color */
    cursor: pointer;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = createRef();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  
  // Extract referral code from the URL
  const queryParams = new URLSearchParams(location.search);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match", {
        autoClose: 1000,
      });
      setIsLoading(false);
      return;
    }

    try {
      await customFetch.post("/auth/register/verify-recaptcha", {
        method: "POST",
        body: JSON.stringify({
          recaptchaToken: recaptchaToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (queryParams.get("refer") !== null) {
        formData.referHistory = {
          isRefer: true,
          referBy: Number(queryParams.get("refer")),
        };
      } else {
        formData.referHistory = {
          isRefer: false,
          referBy: null,
        };
      }

      await customFetch.post("/auth/register", formData);
      navigate("/login");
      toast.success("Registration successful", {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-200 relative">
          <div className="text-center mb-6">
            <a href="/">
              {/* <img src={logo} alt="coinexpay" className="mx-auto mb-4 w-64" /> */}
            </a>
            <div className="relative">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white text-2xl mb-2 mx-auto">
                <FaKey />
              </div>
              <div className="seo-text text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-red-500 text-transparent bg-clip-text mb-2">
                  Register
                </h2>
                <p className="text-gray-500 text-sm">Create a new account</p>
              </div>
              <div className="border-t border-gray-300 my-4" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4 relative">
              <div className="input-box flex items-center">
                <div className="input-icon-wrapper">
                  <FaUser className="input-icon text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  onChange={handleInputChange}
                  required
                  className="h-10 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <div className="input-box flex items-center">
                <div className="input-icon-wrapper">
                  <FaEnvelope className="input-icon text-lg" />{" "}
                  {/* Updated icon */}
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleInputChange}
                  required
                  className="h-10 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4 relative password-wrapper">
              <div className="input-box flex items-center">
                <div className="input-icon-wrapper">
                  <FaKey className="input-icon text-lg" /> {/* Updated icon */}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleInputChange}
                  required
                  className="password-input h-12 focus:outline-none"
                />
                <span
                  className="password-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="mb-4 relative password-wrapper">
              <div className="input-box flex items-center">
                <div className="input-icon-wrapper">
                  <FaKey className="input-icon text-lg" /> {/* Updated icon */}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="confirmpassword"
                  onChange={handleInputChange}
                  required
                  className="password-input h-12 focus:outline-none"
                />
                <span
                  className="password-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="checkbox" required className="mr-2" />
              <p className="text-gray-600">
                I agree to{" "}
                <a
                  href="/"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                >
                  terms and conditions
                </a>{" "}
                and{" "}
                <a
                  href="/"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                >
                  privacy policy
                </a>
              </p>
            </div>

            <div className="mb-4">
              <ReCAPTCHA
                sitekey="6LfmfqUpAAAAAESMBqkR921Hr-dY-VnRac55bw-H"
                onChange={(token) => {
                  setRecaptchaToken(token);
                }}
              />
            </div>

            <div className="mb-4 flex justify-center">
              <button
                type="submit"
                className={`py-3 px-8 rounded-lg text-white font-semibold flex items-center ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                }`}
                disabled={isLoading}
              >
                <FaSignInAlt className="mr-2" />
                {isLoading ? "Submitting..." : "Create Account"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-700">
                Already a member?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
