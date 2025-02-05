import React, { useEffect, useState } from "react";
import AddScreen from "../components/globalController/triggers/AddScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteScreen,
  getAllScreen,
  viewSingleScreen,
} from "../redux/slices/ScreenSlice";
import EditScreen from "../components/globalController/forms/EditScreen";
import { encryptId } from "../utils/Crypto";
import SingleScreen from "../components/globalController/SingleScreen";

const ScreenManagement = () => {
  const dispatch = useDispatch();
  const { loading, screens, error } = useSelector((state) => state.screens);
  const loggedAdmin = useSelector(
    (state) => state.theatre?.theatre?.theatre?._id
  );
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewScreenDetails, setViewScreenDetails] = useState(null);

  useEffect(() => {
    dispatch(getAllScreen(loggedAdmin));
  }, [dispatch]);

  const handleEditScreen = (screen) => {
    setSelectedScreen(screen);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedScreen(null);
  };

  const handleDeleteScreen = (screenId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this screen?"
    );
    if (confirmDelete) {
      const encryptedId = encryptId(screenId);

      dispatch(deleteScreen({ screenId: encryptedId }))
        .unwrap()
        .then(() => {
          dispatch(getAllScreen());
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleViewScreen = (screenId) => {
    const encryptedId = encryptId(screenId);
    dispatch(viewSingleScreen({ screenId: encryptedId }))
      .unwrap()
      .then((screenDetails) => {
        setViewScreenDetails(screenDetails);
        setIsViewModalOpen(true);
      })
      .catch((err) => {
        console.error("Error viewing user:", err);
      });
  };

  const handleAction = (action, screen) => {
    switch (action) {
      case "edit":
        handleEditScreen(screen);
        break;
      case "delete":
        handleDeleteScreen(screen._id);
        break;
      case "view":
        handleViewScreen(screen._id);
        break;
      default:
        break;
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewScreenDetails(null);
  };
  return (
    <div className="max-h-screen w-full pt-2 pb-20 lg:pb-20">
      <div className="flex flex-row items-center justify-between w-[90%] m-auto">
        <AddScreen />
        <div className="text-center text-xl font-bold mb-4">
          Screen Management
        </div>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : screens.length > 0 ? (
        <>
          <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Capacity</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {screens.map((screen) => (
                <tr key={screen._id} className="hover:bg-gray-100">
                  <td className="p-2 border">{screen.screenName}</td>
                  <td className="p-2 border">{screen.screenCapacity}</td>
                  <td className="p-2 border">{screen.screenType}</td>
                  <td className="p-2 border">
                    <select
                      className="border p-1"
                      onChange={(e) => {
                        const action = e.target.value;
                        if (!action) return;
                        handleAction(action, screen);
                        e.target.value = "";
                      }}
                    >
                      <option value="">Action</option>
                      <option value="edit">Edit</option>
                      <option value="delete">Delete</option>
                      <option value="view">View</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-center">No screens available.</p>
      )}
      <EditScreen
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        screen={selectedScreen}
      />
      {isViewModalOpen && viewScreenDetails && (
        <SingleScreen screen={viewScreenDetails} onClose={closeViewModal} />
      )}
    </div>
  );
};

export default ScreenManagement;
