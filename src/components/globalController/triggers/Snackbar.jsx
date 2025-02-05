import React, { useEffect } from "react";

const Snackbar = ({
  message,
  type = "info",
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  duration = 5000,
  isConfirmation = false,
}) => {
  useEffect(() => {
    if (isOpen && !isConfirmation) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [isOpen, duration, onClose, isConfirmation]);

  if (!isOpen) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded text-white shadow-lg ${getBackgroundColor()}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span>{message}</span>
        {isConfirmation ? (
          <div className="flex space-x-2 gap-2">
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="text-green-600 hover:text-green-700"
            >
              Yes
            </button>
            <button
              onClick={() => {
                onCancel();
                onClose();
              }}
              className="text-red-600 hover:text-red-700"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Snackbar;
