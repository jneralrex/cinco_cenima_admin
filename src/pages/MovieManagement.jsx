import React, { useState } from 'react'
import AddMovie from '../components/globalController/triggers/AddMovie'

const mockUsers = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  phone: `123-456-789${index % 10}`,
}));

const MovieManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(mockUsers.length / rowsPerPage);
  const displayedUsers = mockUsers.slice(
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
    <div className="max-h-screen w-full  pt-2 pb-20 lg:pb-20">
      <div className="flex flex-row items-center justify-between w-[90%] m-auto">
      <AddMovie/>
      <div className="text-center text-xl font-bold mb-4">
          Movie Management
        </div>
      </div>
      <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border">
                <select className="border p-1">
                <option value="">action</option>
                  <option value="">Edit</option>
                  <option value="">Delete</option>
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
   )
}

export default MovieManagement