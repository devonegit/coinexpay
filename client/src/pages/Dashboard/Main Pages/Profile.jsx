import React, { useEffect, useState } from "react";
import avatar from "../../../assets/images/users/avatar-6.jpg";
import { useDashboardContext } from "../../../components/layout/DashboardLayout";
import { FaEdit, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import customFetch from "../../../utils/customFetch";
import { decrypt, decryptExit } from "../../../utils/decryption";

const Wrapper = styled.div`
  max-width: 600px; /* Set maximum width for the profile box */
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

  .email-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 10px; /* Add some space between inputs */
  }

  .email-container input {
    flex: 1; /* Grow to fill available space */
    min-width: 250px; /* Minimum width for smaller screens */
  }

  @media (max-width: 910px) {
    /* Mobile styles */
    .email-container {
      flex-direction: column; /* Stack on small screens */
    }
  }
`;

const Profile = () => {
const [formData, setFormData] = useState({
    username: "",
    newEmail: "",
  });
  const [email, setEmail] = useState(null);
  const [showEmailText, setShowEmailText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const {} = useQuery(
    "get-email",
    async () => {
      const { data } = await customFetch.get("/users/get-email");
      return data;
    },
    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }
        setEmail(dataDecrypt.email);
      },
      onError: (error) => {
        toast.error(error.response.data.msg);
      },
      cacheTime: 1000 * 60 * 60,
    }
  );

  const validateEmails = (emails) => {
    const { newEmail, username } = emails;

    // Check that at least one value is provided
  if (!newEmail && !username) {
    return "Please enter at least one value (email or username)";
  }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (newEmail && !emailPattern.test(newEmail)) {
      return "Please enter a valid email address";
    }

    return null; // No errors
  };

  const handleSubmit = async (e) => {
    setIsLoading(true); // Set loading state
    const emailError = validateEmails(formData);
    if (emailError) {
      toast.error(emailError, { autoClose: 2000 });
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await customFetch.post(
        `/users/update-profile`,
        formData
      );
      
      // Reset form data
      setFormData({
        username: "",
        newEmail: "",
      });
      setIsLoading(false);
      setShowEmailText(true);
    } catch (error) {
      toast.error(error.response.data.msg, { autoClose: 1000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Update Profile Details
          </span>
        </h2>
        <hr className="my-4 border-t border-gray-300" />
        <p className="text-gray-600 text-sm ">
          On this page, you can easily change your profile details. If you need
          any assistance, feel free to use our live chat or create a support
          ticket for quick help.
        </p>
        <div className="mb-4 mt-8">
          <div>
            <label
              className="block text-gray-500 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative flex items-center bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg search-box border">
              <input
                className="px-2 py-2 text-sm flex-grow text-gray-700 dark:text-gray-300 bg-transparent rounded-l-lg focus:outline-none"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="email-container">
            {" "}
            {/* Email fields container */}
            <div>
              <label
                className="block text-gray-500 text-sm font-bold mb-2"
                htmlFor="old-email-address"
              >
                Old Email Address
              </label>
              <div className="relative flex items-center bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg search-box border">
                <input
                  id="old-email-address"
                  type="email"
                  className="px-2 py-2 text-sm flex-grow text-gray-700 dark:text-gray-300 bg-transparent rounded-l-lg focus:outline-none disabled:bg-gray-200"
                  name="oldEmail"
                  value={email}
                  disabled
                />
              </div>
            </div>
            <div>
              <label
                className="block text-gray-500 text-sm font-bold mb-2"
                htmlFor="new-email-address"
              >
                New Email Address
              </label>
              <div className="relative flex items-center bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg search-box border">
                <input
                  id="new-email-address"
                  type="email"
                  className="px-2 py-2 text-sm flex-grow text-gray-700 dark:text-gray-300 bg-transparent rounded-l-lg focus:outline-none"
                  name="newEmail"
                  value={formData.newEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {showEmailText && (
  <p className="text-green-600 text-md mt-2 text-center bg-green-100 p-2 rounded">
    An email has been sent to your address. Please confirm your email.
  </p>
)}

          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-5 rounded-md flex items-center space-x-2 hover:from-blue-600 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <FaLock className="mr-2" /> Change Details
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
