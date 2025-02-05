import React from "react";

const SingleUserModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md">
        <div className="flex items-center mb-6">
          <img
            src={user.user?.profilePhoto}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.user?.username}</h2>
            <p className="text-sm text-gray-500">{user.user?.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="font-medium">Email:</p>
            <p>{user.user?.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            <p>{user.user?.phoneNumber}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-red-700 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleUserModal;
