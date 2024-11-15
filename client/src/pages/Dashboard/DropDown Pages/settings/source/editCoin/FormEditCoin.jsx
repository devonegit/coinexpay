const FormEditCoin = ({ handleInputChange }) => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Status:
          </label>
          <select
            id="status"
            name="status"
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 sm:text-sm transition duration-300 ease-in-out"
            onChange={(e) => handleInputChange(e)}
          >
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="numberValue"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Reward:
          </label>
          <input
            type="number"
            id="numberValue"
            name="numberValue"
            placeholder="Enter value"
            max="9999999999" // Maximum number value with 10 digits
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 sm:text-sm transition duration-300 ease-in-out"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>

      {/* Full-width timer input */}
      <div className="w-full">
      <label
            htmlFor="timer"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Timer:
          </label>
          <input
            type="number"
            id="timer"
            name="timer"
            placeholder="Enter time in minutes"
            max="1440" // Maximum number value with 10 digits
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 sm:text-sm transition duration-300 ease-in-out"
            onChange={(e) => handleInputChange(e)}
          />
      </div>
    </form>
  );
}

export default FormEditCoin;
