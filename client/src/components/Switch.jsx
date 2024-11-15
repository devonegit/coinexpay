import React, { useState } from 'react'

const Switch = ({toggleSwitch,isOn, text, switchText, disabled}) => {

  return (
    <div className="flex items-center">
        <div className={`relative inline-block w-24 h-8 ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`} onClick={(e) => {
         if (!disabled) {
          toggleSwitch(e, switchText);
        }
          
        }}>
            <input type="checkbox" className="opacity-0 w-0 h-0" checked={isOn} readOnly />
            <div className={`absolute inset-0 ${isOn ? 'bg-blue-100' : 'bg-red-100'} rounded-xl transition-colors duration-300 shadow-lg ${disabled ? 'pointer-events-none' : ''}`}></div>
            <div className={`absolute ${isOn ? 'translate-x-12' : '-translate-x-2'} top-0 bottom-0 w-14 h-8 ${isOn ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gradient-to-r from-red-500 to-red-700'} rounded-xl shadow-sm flex items-center justify-center text-white font-medium text-sm transition-transform duration-300 backdrop-blur-sm`}>
                {isOn ? text[0] : text[1]}
            </div>
        </div>
    </div>
);
}

export default Switch