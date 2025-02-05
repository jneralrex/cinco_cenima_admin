import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, deleteUser, viewSelectedUser } from "../redux/slices/usersSlice";
import EditUser from "../components/globalController/forms/EditUser";
import SingleUserModal from "../components/globalController/SingleUserModal";
import Snackbar from "../components/globalController/triggers/Snackbar";
import { encryptId } from "../utils/Crypto";

const UserManagement = () => {
  const { loading, error, users, currentPage, totalPages } = useSelector(
    (state) => state.users
  );
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewUserDetails, setViewUserDetails] = useState(null);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    type: "",
    isConfirmation: false,
    onConfirm: null,
    onCancel: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const showSnackbar = (message, type = "info", isConfirmation = false, onConfirm = null, onCancel = null) => {
    setSnackbar({
      isOpen: true,
      message,
      type,
      isConfirmation,
      onConfirm,
      onCancel,
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(getAllUser({ page, limit: 10 }));
    }
  };

  const handleDeleteUser = (userId) => {
    showSnackbar(
      "Are you sure you want to delete this user?",
      "warning",
      true,
      () => {
        const encryptedId = encryptId(userId);
        dispatch(deleteUser({ userId: encryptedId, page: currentPage, limit: 10 }))
          .unwrap()
          .then(() => {
            dispatch(getAllUser({ page: currentPage, limit: 10 }));
            showSnackbar("User deleted successfully!", "success");
          })
          .catch((err) => {
            console.error("Error deleting user:", err);
            showSnackbar("Failed to delete user.", "error");
          });
      },
      () => {
        showSnackbar("Deletion canceled.", "info");
      }
    );
  };

  const handleEditUser = (user) => {
    showSnackbar(
      "Are you sure you want to edit this user?",
      "warning",
      true,
      () => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  },
  () => {
    showSnackbar("Edit canceled.", "info");
  })
  };

  const handleViewUser = (userId) => {
    const encryptedId = encryptId(userId);
    dispatch(viewSelectedUser(encryptedId))
      .unwrap()
      .then((userDetails) => {
        setViewUserDetails(userDetails);
        setIsViewModalOpen(true);
      })
      .catch((err) => {
        console.error("Error viewing user:", err);
        showSnackbar("Failed to fetch user details.", "error");
      });
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewUserDetails(null);
  };

  const handleAction = (action, user) => {
    switch (action) {
      case "edit":
        handleEditUser(user);
        break;
      case "delete":
        handleDeleteUser(user._id);
        break;
      case "view":
        handleViewUser(user._id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-h-screen w-full pt-2 pb-20 lg:pb-20">
      {/* Add User and Title */}
      <div className="flex flex-row items-center justify-between w-[90%] m-auto">
        <div className="text-center text-xl font-bold mb-4">User Management</div>
      </div>

      {/* Display Users Table */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : users.length > 0 ? (
        <>
          <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="p-2 border">{user.username || "N/A"}</td>
                  <td className="p-2 border">{user.email || "N/A"}</td>
                  <td className="p-2 border">{user.phoneNumber || "N/A"}</td>
                  <td className="p-2 border">{user.role || "N/A"}</td>
                  <td className="p-2 border">
                    <select
                      className="border p-1"
                      onChange={(e) => {
                        const action = e.target.value;
                        if (!action) return;
                        handleAction(action, user);
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
        </>
      ) : (
        <p className="text-center">No users available.</p>
      )}

      {/* Modals */}
      <EditUser isOpen={isEditModalOpen} onClose={closeEditModal} user={selectedUser} />
      {isViewModalOpen && viewUserDetails && (
        <SingleUserModal user={viewUserDetails} onClose={closeViewModal} />
      )}

      {/* Snackbar for Confirmation */}
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isOpen={snackbar.isOpen}
        onClose={() => setSnackbar((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={snackbar.onConfirm}
        onCancel={snackbar.onCancel}
        isConfirmation={snackbar.isConfirmation}
      />
    </div>
  );
};

export default UserManagement;
