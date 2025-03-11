import AddTheatreAdmin from "../components/globalController/triggers/AddTheatreAdmin";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, viewSelectedUser } from "../redux/slices/usersSlice";
import EditUser from "../components/globalController/forms/EditUser";
import { encryptId } from "../utils/Crypto";
import SingleUserModal from "../components/globalController/SingleUserModal";
import { deleteTheatre, getAllTheatreAdmin, viewSelectedTheatre } from "../redux/slices/TheatreAdminSlice";
import ConfirmOtp from "../components/globalController/triggers/ConfirmOtp";

const TheatreAdminManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, theatres, currentPage, totalPages } = useSelector(
    (state) => state.theatre
  );

  const loggedAdmin = useSelector((state) => state.cinema.cinema.cinema._id);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewUserDetails, setViewUserDetails] = useState(null);

  useEffect(() => {
    dispatch(getAllTheatreAdmin({ page: currentPage, limit: 10, loggedAdmin }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(getAllTheatreAdmin({ page, limit: 10 }));
    }
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      const encryptedId = encryptId(userId);
      dispatch(
        deleteTheatre({ userId: encryptedId})
      )
        .unwrap()
        .then(() => {
          dispatch(getAllTheatreAdmin({ page: currentPage, limit: 10, loggedAdmin }));
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
        });
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleViewUser = (userId) => {
    const encryptedId = encryptId(userId);
    dispatch(viewSelectedTheatre(encryptedId))
      .unwrap()
      .then((userDetails) => {
        setViewUserDetails(userDetails);
        setIsViewModalOpen(true);
      })
      .catch((err) => {
        console.error("Error viewing user:", err);
      });
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleAction = (action, theatre) => {
    switch (action) {
      case "edit":
        handleEditUser(theatre);
        break;
      case "delete":
        handleDeleteUser(theatre._id);
        break;
      case "view":
        handleViewUser(theatre._id);
        break;
      default:
        break;
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewUserDetails(null);
  };
  return (
    <div className="max-h-screen w-full  pt-2 pb-20 lg:pb-20">
      <div className="flex flex-row items-center justify-between w-[90%] m-auto">
        <AddTheatreAdmin /> <ConfirmOtp />
        <div className="text-center text-xl font-bold mb-4">
          Admin Management
        </div>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) :theatres > 0 ? (
        <>
        <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
  <thead className="bg-gray-200">
    <tr>
      <th className="p-2 border">Theatre Name</th>
      <th className="p-2 border">Theatre Location</th>
      <th className="p-2 border">Theatre City</th>
      <th className="p-2 border">Theatre Street</th>
      <th className="p-2 border">Actions</th> 
    </tr>
  </thead>
  <tbody>
    {theatres.map((theatre) => (
      <tr key={theatre._id} className="hover:bg-gray-100">
        <td className="p-2 border">{theatre.theatreName || "N/A"}</td>
        <td className="p-2 border">
          {theatre.theatreLocation?.location?.[0]?.state || "N/A"}
        </td>
        <td className="p-2 border">
          {theatre.theatreLocation?.location?.[0]?.cities?.[0]?.city || "N/A"}
        </td>
        <td className="p-2 border">
          {theatre.theatreLocation?.location?.[0]?.cities?.[0]?.street || "N/A"}
        </td>
        <td className="p-2 border">
          <select
            className="border p-1"
            onChange={(e) => {
              const action = e.target.value;
              if (!action) return;
              handleAction(action, theatre);
              e.target.value = "";
            }}
          >
            <option value="">Select Action</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
            <option value="view">View</option>
          </select>
        </td>
      </tr>
    ))}
  </tbody>
</table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-gray-300 text-white rounded-md"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-300 text-white rounded-md"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Edit User Modal */}
          <EditUser
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            user={selectedUser}
          />

          {/* View Selected User Modal */}
          {isViewModalOpen && viewUserDetails && (
            <SingleUserModal theatre={viewUserDetails} onClose={closeViewModal} />
          )}
        </>
      ) : (
        <p className="text-center">No theatre available.</p>
      )}
    </div>
  );
};

export default TheatreAdminManagement;
