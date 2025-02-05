import React, { useState } from 'react';
import AddDate from '../components/globalController/triggers/AddDate';

const Dates = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  date: `2025-01-${String(index + 1).padStart(2, '0')}`,
  status: index % 2 === 0 ? 'Available' : 'Booked',
  event: `Event ${index + 1}`,
}));

const DateManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const totalPages = Math.ceil(Dates.length / rowsPerPage);
    const displayedDates = Dates.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );

    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
      <div className="max-h-screen w-full pt-2 pb-20 lg:pb-20">
        <div className="flex flex-row items-center justify-between w-[90%] m-auto">
          <AddDate />
          <div className="text-center text-xl font-bold mb-4">
            Date Management
          </div>
        </div>
        <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Event</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {displayedDates.map((date) => (
              <tr key={date.id} className="hover:bg-gray-100">
                <td className="p-2 border">{date.date}</td>
                <td className="p-2 border">{date.status}</td>
                <td className="p-2 border">{date.event}</td>
                <td className="p-2 border">
                  <select className="border p-1">
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

export default DateManagement;
