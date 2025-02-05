import React, { useState } from "react";

const SeatBlockingManagement = () => {
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockedSeats, setBlockedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBlockedSeatsModal, setShowBlockedSeatsModal] = useState(false);

  const allSeats = Array.from({ length: 50 }, (_, i) => `Seat ${i + 1} (vip)`);

  // Toggle Block/Unblock Modal
  const toggleBlockModal = () => setShowBlockModal(!showBlockModal);

  // Handle Block/Unblock Seats
  const handleBlockSeats = () => {
    setBlockedSeats((prev) => [...new Set([...prev, ...selectedSeats])]);
    setSelectedSeats([]);
    toggleBlockModal();
  };

  // Toggle View Blocked Seats Modal
  const toggleBlockedSeatsModal = () => setShowBlockedSeatsModal(!showBlockedSeatsModal);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seat Management</h1>
      <p className="mb-4">
        Manage seat blocking and unblocking on a show-wise basis. You can also view blocked seats.
      </p>
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
        onClick={toggleBlockModal}
      >
        Block/Unblock Seats
      </button>
      <button
        className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        onClick={toggleBlockedSeatsModal}
      >
        View Blocked Seats
      </button>

      {/* Block/Unblock Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white h-[600px] p-6 rounded-lg shadow-lg w-96 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Block/Unblock Seats</h2>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {allSeats.map((seat) => (
                <button
                  key={seat}
                  className={`px-2 py-1 border rounded ${
                    blockedSeats.includes(seat)
                      ? "bg-red-500 text-white"
                      : selectedSeats.includes(seat)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() =>
                    setSelectedSeats((prev) =>
                      prev.includes(seat)
                        ? prev.filter((s) => s !== seat)
                        : [...prev, seat]
                    )
                  }
                >
                  {seat}
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                onClick={handleBlockSeats}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={toggleBlockModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Blocked Seats Modal */}
      {showBlockedSeatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Blocked Seats</h2>
            {blockedSeats.length > 0 ? (
              <ul className="list-disc pl-5">
                {blockedSeats.map((seat) => (
                  <li key={seat} className="mb-2">
                    {seat}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No blocked seats at the moment.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={toggleBlockedSeatsModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatBlockingManagement;
