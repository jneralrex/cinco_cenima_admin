import React from "react";

const SingleScreen = ({ screen, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {screen?.viewSelectedScreen.screenName || "Screen Details"}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            <strong>Capacity:</strong> {screen?.viewSelectedScreen.screenCapacity || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Type:</strong> {screen?.viewSelectedScreen.screenType || "N/A"}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleScreen;
