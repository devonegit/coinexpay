import React, { useState } from "react";
import avatar from "../../../assets/images/users/avatar-6.jpg";
import { useDashboardContext } from "../../../components/layout/DashboardLayout";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import styled from "styled-components";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";

const Wrapper = styled.div`
  max-width: 650px; /* Set maximum width for the profile box */
  margin: 0 auto; /* Center the profile box */

  .search-box {
    background-color: rgba(8, 88, 247, 0.04);
    box-shadow: none;
    transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
  }

  .search-box:focus-within {
    box-shadow: 0 0 10px rgba(61, 131, 247, 0.5);
    border-color: rgb(61, 131, 247);
  }

  .password-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    flex-wrap: nowrap; /* Ensure items do not wrap */
    gap: 10px; /* Add some space between inputs */
  }

  .password-container input {
    flex: 1; /* Grow to fill available space */
    min-width: 250px; /* Minimum width for smaller screens */
  }

  @media (max-width: 910px) {
    /* Mobile styles */
    .password-container {
      flex-direction: column; /* Stack on small screens */
    }
  }
`;

const ResetPassword = () => {
  const { user } = useDashboardContext();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePasswords = (passwords) => {
    const { newPassword, confirmPassword } = passwords;

    if (newPassword.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[a-z]/.test(newPassword)) {
      return "Password must contain at least one lowercase character.";
    }
    if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      return "Password must contain at least one number or symbol.";
    }
    if (newPassword !== confirmPassword) {
      return "New password and confirm password do not match.";
    }
    return null; // No errors
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);

    const errorMessage = validatePasswords(formData);
    if (errorMessage) {
      toast.error(errorMessage, { autoClose: 2000 });
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await customFetch.post(
        `/users/reset-password`,
        formData
      );
      toast.success("Password changed successfully!", { autoClose: 2000 });
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response.data.msg, { autoClose: 1000 });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Reset Password
          </span>
        </h2>

        <hr className="my-4 border-t border-gray-300" />
        <p className="text-gray-600 text-sm">
          On this page, you can easily reset your password. If you need any assistance, feel free to use our live chat or create a support ticket for quick help.
        </p>

        <div className="mb-4 mt-8">
          <div>
            <label
              className="block text-gray-500 text-sm font-bold mb-2"
              htmlFor="current-password"
            >
              Current Password
            </label>
            <div className="relative flex items-center bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg search-box border">
              <input
                className="px-2 py-2 text-sm flex-grow text-gray-700 dark:text-gray-300 bg-transparent rounded-l-lg focus:outline-none"
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
              <button
                className="px-2 py-1 bg-transparent text-gray-500 rounded-r-lg hover:text-gray-600 dark:hover:text-white"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showCurrentPassword ? (
                  <FaEyeSlash className="search-icon" />
                ) : (
                  <FaEye className="search-icon" />
                )}
              </button>
            </div>
          </div>
          <div className="password-container">
            <div>
              <label
                className="block text-gray-500 text-sm font-bold mb-2"
                htmlFor="new-password"
              >
                New Password
              </label>
              <div className="relative flex items-center bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg search-box border">
                <input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  className="px-2 py-2 text-sm flex-grow text-gray-700 dark:text-gray-300 bg-transparent rounded-l-lg focus:outline-none"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
                <button
                  className="px-2 py-1 bg-transparent text-gray-500 rounded-r-lg hover:text-gray-600 dark:hover:text-white"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="search-icon" />
                  ) : (
                    <FaEye className="search-icon" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label
                className="block text-gray-500 text-sm font-bold mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <div className="relative flex items-center bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg search-box border">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="px-2 py-2 text-sm flex-grow text-gray-700 dark:text-gray-300 bg-transparent rounded-l-lg focus:outline-none"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  className="px-2 py-1 bg-transparent text-gray-500 rounded-r-lg hover:text-gray-600 dark:hover:text-white"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="search-icon" />
                  ) : (
                    <FaEye className="search-icon" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-sm font-bold mb-2">
            Password Requirements:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            <li>Minimum 8 characters long - the more, the better.</li>
            <li>At least one lowercase character.</li>
            <li>At least one number, symbol, or whitespace character.</li>
          </ul>
        </div>
        
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-5 rounded-md flex items-center space-x-2 hover:from-blue-600 hover:to-blue-800"
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <FaLock className="mr-2" /> Change Password
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ResetPassword;
