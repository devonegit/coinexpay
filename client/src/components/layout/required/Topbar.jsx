import { useState } from "react";
import { FaBars, FaSearch, FaBell, FaCog, FaUser, FaCoins, FaSignOutAlt, FaKey, FaUserEdit, FaCreditCard } from "react-icons/fa"; // Added necessary icons
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import avatar from "../../../assets/images/users/avatar-6.jpg";
import { useDashboardContext } from "../DashboardLayout";


const Wrapper = styled.div`
  .search-box {
    background-color: rgba(8, 88, 247, 0.06);
    box-shadow: none;
    transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
  }

  .search-box:focus-within {
    box-shadow: 0 0 10px rgba(61, 131, 247, 0.5);
    border-color: rgb(61, 131, 247);
  }

  .search-icon {
    color: #6c757d;
    font-size: 0.85rem;
  }

  .icon-bg {
    background-color: rgba(8, 88, 247, 0.06);
    border-radius: 50%;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }

  .icon-bg:hover {
    color: #0b5ed7;
    background-color: rgba(8, 88, 247, 0.12);
  }

  .icon-size {
    font-size: 0.80rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: #2563eb;
    margin-left: 2rem;
  }

  .sidebar-toggle {
    margin-left: 7rem;
  }

  .icon-group {
    margin-right: 1.5rem;
    position: relative; /* Needed for dropdown positioning */
  }

  .dropdown {
    position: absolute;
    top: 130%;
    right: 0;
    background-color: white;
    border-radius: 0.25rem;
    overflow: hidden;
    z-index: 999;
  }

 
`;

const Topbar = ({ handleSidebarToggle }) => {
  const [theme, setTheme] = useState("dark");
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const {user, logoutUser} = useDashboardContext();
  console.log(user)
  

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const truncateName = (username) => {
    const words = username.split(" ");
    return username[0];
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    // Logic for handling profile click (e.g., navigate to profile page)
    console.log("Profile clicked");
  };

  const handleResetPasswordClick = () => {
    // Logic for handling reset password click
    console.log("Reset password clicked");
  };

  const handleLogoutClick = () => {
    // Logic for handling logout click
    console.log("Logout clicked");
  };

  return (
    <Wrapper>
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 transition-colors duration-300 relative">
        <div className="flex items-center">
          <div className="brand">
            <FaCoins className="icon-size" />
            <span>Coinexpay</span>
          </div>
          <button
            aria-label="Menu"
            className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white icon-bg sidebar-toggle"
            onClick={handleSidebarToggle}
          >
            <FaBars className="icon-size" />
          </button>
          <div className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg ml-4 search-box border border-transparent">
            <input
              className="px-2 py-1 text-sm flex-grow text-gray-700 dark:text-gray-300 bg-transparent rounded-l-lg focus:outline-none"
              type="text"
              placeholder="Search"
            />
            <button className="px-2 py-1 bg-transparent text-gray-500 rounded-r-lg hover:text-gray-00 dark:hover:text-white">
              <FaSearch className="search-icon" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-6 icon-group">
          <button
            onClick={handleThemeChange}
            className="p-2 text-gray-500 icon-bg"
            aria-label="Toggle Theme"
          >
            <IoSunnyOutline className="icon-size" />
          </button>
          <button
            className="p-2 text-gray-500 icon-bg"
            aria-label="Notifications"
          >
            <FaBell className="icon-size" />
          </button>
          <button
            className="p-2 text-gray-500 icon-bg"
            aria-label="Settings"
          >
            <FaCog className="icon-size" />
          </button>
          <div className="relative">
            <button
              className="p-2 text-gray-500 icon-bg"
              aria-label="User Profile"
              onClick={toggleDropdown} // Toggle dropdown on click
            >
              <FaUser className="icon-size" />
            </button>
            {isDropdownOpen && (
                <div className="w-64 p-4 bg-white dropdown shadow-lg border rounded-lg">
                <div className="flex items-center space-x-3">
                  <img src={avatar} alt="Profile" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-bold">{user?.username}</div>
                    <div className="text-sm text-gray-500">#{user?.userID}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="space-y-2">
                    <Link to="./profile" target="_blank" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200">
                      <FaUser className="text-gray-500 hover:text-blue-500" />
                      <span>Profile</span>
                    </Link>
                    <Link to="./reset-password" target="_blank" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200">
                      <FaCreditCard className="text-gray-500 hover:text-blue-500" />
                      <span>Reset Password</span>
                    </Link>
                    <Link to="/support" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200">
                      <FaCog className="text-gray-500 hover:text-blue-500" />
                      <span>Support</span>
                    </Link>
                  
                  </div>
                  <div className="mt-2 border-t pt-2">
                    <button className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200" onClick={logoutUser}>
                      <FaSignOutAlt className="text-gray-500 hover:text-blue-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Topbar;
