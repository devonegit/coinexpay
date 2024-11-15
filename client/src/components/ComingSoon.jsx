import React from 'react'
import { FaTools } from 'react-icons/fa';
import { AiOutlineClockCircle, AiOutlineNotification } from 'react-icons/ai';

const ComingSoon = ({ title, time }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="flex flex-col items-center justify-center p-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg max-w-lg text-center transform -translate-y-12">
        <FaTools className="text-6xl text-gray-800 mb-4 transition duration-300" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{title}</h1>
        <p className="text-xl text-gray-800 mb-8 font-sans">
          <AiOutlineClockCircle className="inline-block mr-2 text-gray-700" />
          We're working hard to bring this feature to you {time}!
        </p>
        <button type="button" className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 px-8 rounded-md flex items-center space-x-2 hover:from-gray-800 hover:to-black">
          <AiOutlineNotification className="text-xl" />
          <span>Notify Me</span>
        </button>
      </div>
    </div>
  )
}

export default ComingSoon;
