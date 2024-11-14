import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import logo from "../../assets/images/logo.jpg";
import customFetch from "../../utils/customFetch";
import styled from "styled-components";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

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

const Login = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await customFetch.post("/auth/login", formData);
      navigate("/dashboard");
      toast.success("Logged in successfully", { autoClose: 2000 });
    } catch (error) {
      toast.error(error?.response?.data?.msg || "An error occurred", { autoClose: 2000 });
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
                <FaLock />
              </div>
              <div className="seo-text text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-red-500 text-transparent bg-clip-text mb-2">Login</h2>
                <p className="text-gray-500 text-sm">Login into your account</p>
              </div>
              <div className="border-t border-gray-300 my-4" />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <div className="input-box flex items-center">
                <div className="input-icon-wrapper">
                  <FaUser className="input-icon text-lg" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  required
                  className="h-10 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4 relative password-wrapper">
              <div className="input-box flex items-center">
                <div className="input-icon-wrapper">
                  <FaLock className="input-icon text-lg" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                  required
                  className="password-input h-12 focus:outline-none"
                />
                <span className="password-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="mb-4 flex justify-center">
              <button
                type="submit"
                className={`py-3 px-4 rounded-lg text-white font-semibold flex items-center ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'}`}
                disabled={isLoading}
              >
                <FaSignInAlt className="mr-2" />
                {isLoading ? "Submitting..." : "Login"}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-700">
                Don’t have an account yet?{" "}
                <a href="/register" className="text-blue-500 hover:underline">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
