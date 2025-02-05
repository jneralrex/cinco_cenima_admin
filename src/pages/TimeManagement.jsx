import React, { useState } from 'react';
import AddTime from '../components/globalController/triggers/AddTime';

const Times = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  time: `${String(index % 24).padStart(2, '0')}:00`,
  status: index % 2 === 0 ? 'Available' : 'Reserved',
  description: `Activity ${index + 1}`,
}));

const TimeManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(Times.length / rowsPerPage);
  const displayedTimes = Times.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleAction = (action, timeId) => {
    if (action === 'edit') {
      console.log(`Editing time with id ${timeId}`);
    } else if (action === 'delete') {
      console.log(`Deleting time with id ${timeId}`);
    }
  };

  return (
    <div className="max-h-screen w-full pt-2 pb-20 lg:pb-20">
      <div className="flex flex-row items-center justify-between w-[90%] m-auto">
        <AddTime />
        <div className="text-center text-xl font-bold mb-4">
          Time Management
        </div>
      </div>
      <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {displayedTimes.map((time) => (
            <tr key={time.id} className="hover:bg-gray-100">
              <td className="p-2 border">{time.time}</td>
              <td className="p-2 border">{time.status}</td>
              <td className="p-2 border">{time.description}</td>
              <td className="p-2 border">
                <select
                  className="border p-1"
                  onChange={(e) => handleAction(e.target.value, time.id)}
                >
                  <option value="">Action</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center w-[90%] m-auto mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TimeManagement;




