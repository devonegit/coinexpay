import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { MdDashboard, MdLock, MdPeople, MdMessage, MdExpandMore } from 'react-icons/md';
import styled from 'styled-components';
import { useDashboardContext } from '../DashboardLayout';
import Links from './Links'

// Styled Components
const Wrapper = styled.div`
  .dropdown-menu {
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    background-color: white;
    border-radius: 0.375rem;
    padding-left: 2rem;
  }

  .dropdown-open .dropdown-menu {
    max-height: 10rem;
    opacity: 1;
  }

  .dropdown-menu a {
    padding-left: 1.5rem;
    position: relative;
    font-size: 0.75rem;
  }

  .dropdown-menu a.active::before {
    content: '•';
    color: red;
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    animation: glowing 1.5s infinite;
  }

  @keyframes glowing {
    0% { text-shadow: 0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red; }
    50% { text-shadow: 0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px red; }
    100% { text-shadow: 0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red; }
  }

  .dropdown-menu a.active {
    color: #2563eb;
  }

  .dropdown-menu a:hover {
    background-color: #f3f4f6;
  }

  .active {
    background-color: white;
  }

  .active .material-icons,
  .active span,
  .active svg {
    color: #2563eb;
  }

  .dropdown-toggle .expand-icon {
    transition: transform 0.3s ease-in-out;
    transform: rotate(-90deg);
    margin-left: auto;
  }

  .dropdown-open .dropdown-toggle .expand-icon {
    transform: rotate(0);
  }

  nav a {
    font-weight: 500;
    color: #666c75;
    font-size: 0.80rem;
    display: flex;
    align-items: center;
  }

  nav a span {
    margin-left: 1rem;
    transition: color 0.3s ease;
  }

  nav a .material-icons,
  nav a svg {
    transition: color 0.3s ease;
  }

  nav a.active span,
  nav a.active .material-icons,
  nav a.active svg {
    color: #2563eb;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #2563eb;
  }

  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db #e5e7eb;
  }

  .custom-scrollbar:hover {
    scrollbar-color: #2563eb #e5e7eb;
  }

  .custom-scrollbar::-webkit-scrollbar-button {
    display: none;
  }

  .logout-button:hover {
    background-color: #2563eb;
  }

  @media (max-width: 640px) {
    .dropdown-menu {
      padding-left: 1.5rem;
    }
  }
`;

// Sidebar Component
const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [activeLink, setActiveLink] = useState('');
  const { user, logoutUser } = useDashboardContext();

  const userRole = user?.role || 'user'; // Assuming user object has a role property

  const handleDropdownToggle = (menu) => {
    setDropdownOpen((prev) => (prev === menu ? null : menu));
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Wrapper>
      <div className="flex h-full">
        <div className="bg-white w-64 p-6 flex flex-col justify-between custom-scrollbar overflow-y-auto">
          <div>
            <div className="flex items-center space-x-3">
              {/* <img src="logo.png" alt="Logo" className="h-10 w-10" />
              <span className="text-xl font-semibold">Coder Hotash</span> */}
            </div>
            <nav className="mt-2 space-y-2">
              {Links.map((link, index) => 
                link.roles.includes(userRole) ? (
                  link.dropdown ? (
                    <div key={index} className={`dropdown ${dropdownOpen === link.text ? 'dropdown-open' : ''}`}>
                      <a
                        href={link.path}
                        className={`flex items-center p-2 rounded-lg hover:bg-gray-200 dropdown-toggle`}
                        onClick={() => handleDropdownToggle(link.text)}
                      >
                        {link.icon}
                        <span>{link.text}</span>
                        <MdExpandMore className="expand-icon" />
                      </a>
                      <div className="dropdown-menu">
                        {link.subLinks.map((subLink, subIndex) => 
                          subLink.roles.includes(userRole) ? (
                            <a
                              key={subIndex}
                              href={subLink.path}
                              className={`block px-4 py-2 hover:bg-gray-200 ${activeLink === subLink.text ? 'active' : ''}`}
                              onClick={() => handleLinkClick(subLink.text)}
                            >
                              {subLink.text}
                            </a>
                          ) : null
                        )}
                      </div>
                    </div>
                  ) : (
                    <a
                      key={index}
                      href={link.path}
                      className={`flex items-center p-2 rounded-lg hover:bg-gray-200 ${activeLink === link.text ? 'active' : ''}`}
                      onClick={() => handleLinkClick(link.text)}
                    >
                      {link.icon}
                      <span>{link.text}</span>
                    </a>
                  )
                ) : null
              )}
              <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg logout-button" onClick={logoutUser}>Logout</button>
            </nav>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Sidebar;
