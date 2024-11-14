import React from "react";

const FormAddCoin = ({ handleInputChange }) => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="cryptoNameFull"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Cryptocoin Name (Full):
          </label>
          <input
            type="text"
            id="cryptoNameFull"
            name="cryptoNameFull"
            placeholder="Enter full name"
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 sm:text-sm transition duration-300 ease-in-out"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label
            htmlFor="cryptoNameShort"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Cryptocoin Name (Short):
          </label>
          <input
            type="text"
            id="cryptoNameShort"
            name="cryptoNameShort"
            placeholder="Enter short name"
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 sm:text-sm transition duration-300 ease-in-out"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
    </form>
  );
};

export default FormAddCoin;
