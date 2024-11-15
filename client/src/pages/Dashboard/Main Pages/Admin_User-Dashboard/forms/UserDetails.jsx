import React from "react";

const UserDetails = ({ handleInputChange, name, description, lable, type }) => {
  return (
    <form className="space-y-6">
    <div className="w-full mt-6">
      <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            {lable}:
          </label>
          <input
            type={type}
            id={name}
            name={name}
            placeholder={description}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 sm:text-sm transition duration-300 ease-in-out"
            onChange={(e) => handleInputChange(e)}
          />
      </div>
    </form>
  );
};

export default UserDetails;
