import React from "react";
import { MdCheck, MdClose } from "react-icons/md"; // Import icons from react-icons

const ModalComponent = ({
  showModal,
  handleClose,
  handleConfirm,
  title,
  message,
  form,
  type,
  handleOk,
  size,
  loading,
  bottom,
  buttonText,
}) => {
  const getSizeClass = (size) => {
    switch (size) {
      case "lg":
        return "w-full max-w-xl";

      case "lg2xl":
        return "w-full max-w-2xl";

      case "lg3xl":
        return "w-full max-w-3xl";

      case "lg4xl":
        return "w-full max-w-4xl";
      
      case "lg5xl":
          return "w-full max-w-5xl";

      case "md":
        return "w-full max-w-md";

      case "sm":
        return "w-full max-w-sm";

      default:
        return "w-full max-w-md"; // default to md size
    }
  };
  // Tailwind classes for modal
  const modalClasses = `fixed inset-0 flex items-start justify-center p-4 ${
    showModal ? "block" : "hidden"
  }`;
  const overlayClasses = `fixed inset-0 bg-gray-900 opacity-50 ${
    showModal ? "block" : "hidden"
  }`;
  const modalContentClasses = `bg-white rounded-lg shadow-lg p-6 ${getSizeClass(
    size
  )} mt-1 0`;

  return (
    <>
      {/* Overlay */}
      <div className={overlayClasses} onClick={handleClose}></div>

      {/* Modal */}
      <div className={modalClasses} onClick={handleClose}>
        <div
          className={modalContentClasses}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-xl font-semibold">{title}</h3>{" "}
            {/* Increased title font size */}
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>
          <div className="my-4">
            {form}
            {message && (
              <div>
                <div className="mt-2">{message}</div>
                <hr className="my-6 border-gray-200" /> {/* Divider */}
              </div>
            )}
          </div>
          {bottom !== "false" && <div className="flex justify-end space-x-4">
            {type === "single" ? (
              <button
                onClick={handleOk}
                className="bg-gradient-to-r from-gray-600 to-gray-600 text-white py-2 px-4 rounded flex items-center space-x-2 hover:from-gray-500 hover:to-gray-700"
              >
                <span>{buttonText ? buttonText : "Okay"}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-red-400 to-red-600 text-white py-2 px-4 rounded flex items-center space-x-2 hover:from-red-500 hover:to-red-700"
                >
                  <MdClose className="w-5 h-5" />
                  <span>Close</span>
                </button>
                <button
                  onClick={handleConfirm}
                  className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded flex items-center space-x-2 hover:from-blue-500 hover:to-blue-700 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  <MdCheck className="w-5 h-5" />
                  <span>{buttonText ? buttonText : "Yes"}</span>
                </button>
              </>
            )}
          </div>}
          
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
