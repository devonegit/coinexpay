import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { FiLogIn } from "react-icons/fi"; // Import the login icon

import logo from "../../assets/images/logo.jpg";

const MailConfirmation = () => {
  const { token } = useParams();
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await customFetch.post(
          `/auth/register/auth/verify/${token}`
        );
        console.log(data);
      } catch (error) {
        console.error("Error verifying email:", error?.response?.data?.error);
      }
    };

    fetchData();
  }, [token]);

  // Function to handle navigation to the login page
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <a href="/" className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-28 h-auto" />
        </a>
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Email Successfully Verified
        </h2>
        <p className="text-gray-600 text-center mt-4">
          Your email has been successfully verified. You can now log in to your account.
        </p>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoginClick}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg flex items-center space-x-2 hover:from-blue-600 hover:to-blue-800"
          >
            <FiLogIn size={20} /> {/* React icon with size */}
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailConfirmation;
