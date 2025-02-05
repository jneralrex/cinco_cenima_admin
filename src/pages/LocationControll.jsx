import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddLocation from "../components/globalController/triggers/AddLocation";
import {
  deleteCity,
  deleteState,
  getAllLocation,
  viewState,
} from "../redux/slices/locationSlice";
import EditState from "../components/globalController/forms/EditState";
import EditCity from "../components/globalController/forms/EditCity";
import SingleLocationModal from "../components/globalController/SingleLocationModal";

const LocationControll = () => {
  const dispatch = useDispatch();
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditCityModalOpen, setIsEditCityModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewLocationDetails, setViewLocationDetails] = useState(null);
  const  loggedAdmin = useSelector((state) => state.cinema.cinema.cinema._id);

  const {
    loading,
    error,
    locations = [],
    currentPage,
    totalPages,
    singleLocation,
  } = useSelector((state) => state.locations);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllLocation({ page, loggedAdmin }));
  }, [dispatch, page]);

  const openEditModal = (location) => {
    setSelectedLoc(location);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedLoc(null);
    dispatch(getAllLocation({ page }));
  };

  const openEditCityModal = (city, loc) => {
    setSelectedLoc({
      state: loc.state,
      city: city.city,
    });
    setIsEditCityModalOpen(true);
  };

  const closeEditCityModal = () => {
    setIsEditCityModalOpen(false);
    setSelectedLoc(null);
    dispatch(getAllLocation({ page }));
  };

  const handleDeleteState = (selectedState) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this state?"
    );
    if (confirmDelete) {
      if (!selectedState) {
        console.error("State is undefined. Cannot delete.");
        return;
      }
      dispatch(deleteState(selectedState))
        .unwrap()
        .then(() => {
          console.log("State deleted successfully.");
          dispatch(getAllLocation({ page }));
        })
        .catch((err) => {
          console.error("Error deleting state:", err);
        });
    }
  };

  const handleDeleteCity = (selectedState, selectedCity) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this state?"
    );
    if (confirmDelete) {
      if (!selectedState && !selectedCity) {
        console.error("City is undefined. Cannot delete.");
        return;
      }
      dispatch(deleteCity({ selectedState, selectedCity }))
        .unwrap()
        .then(() => {
          console.log("City deleted successfully.");
          dispatch(getAllLocation({ page }));
        })
        .catch((err) => {
          console.error("Error deleting state:", err);
        });
    }
  };

  const handleViewState = (selectedState) => {
    dispatch(viewState(selectedState))
      .unwrap()
      .then((selectedLocation) => {
        setViewLocationDetails(selectedLocation);
        setIsViewModalOpen(true);
      })
      .catch((err) => {
        console.error("Error viewing state:", err);
      });
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewLocationDetails(null);
  };

  return (
    <div className="max-h-screen w-full pt-2 pb-20 lg:pb-20">
      <div className="flex flex-row items-center justify-between w-[90%] m-auto">
        <AddLocation />
        <div className="text-center text-xl font-bold mb-4">
          Location Management
        </div>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : locations.length > 0 ? (
        <>
          <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">State</th>
                <th className="p-2 border">City</th>
                <th className="p-2 border">Street</th>
                <th className="p-2 border">State actions</th>
                <th className="p-2 border">City actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((locationItem) =>
                locationItem.location.map((loc) =>
                  loc.cities.map((city) => (
                    <tr key={city._id} className="hover:bg-gray-100">
                      <td className="p-2 border">{loc.state}</td>
                      <td className="p-2 border">{city.city}</td>
                      <td className="p-2 border">{city.street}</td>
                      <td className="p-2 border">
                        <select
                          className="border p-1"
                          onChange={(e) => {
                            if (e.target.value === "edit") {
                              openEditModal(loc);
                            }
                            if (e.target.value === "delete") {
                              handleDeleteState(loc.state);
                            }
                            if (e.target.value === "view") {
                              handleViewState(loc.state);
                            }
                          }}
                        >
                          <option value="">Action</option>
                          <option value="edit">Edit</option>
                          <option value="delete">Delete</option>
                          <option value="view">View</option>
                        </select>
                      </td>

                      <td className="p-2 border">
                        <select
                          className="border p-1"
                          onChange={(e) => {
                            if (e.target.value === "edit") {
                              openEditCityModal(city, loc);
                            }
                            if (e.target.value === "delete") {
                              handleDeleteCity(loc.state, city.city);
                            }
                          }}
                        >
                          <option value="">Action</option>
                          <option value="edit">Edit</option>
                          <option value="delete">Delete</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="mx-4">
              Page {page} of {totalPages || 1}
            </span>
            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">No users available.</p>
      )}
      {/* EditState modal */}
      {isEditModalOpen && (
        <EditState
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          location={selectedLoc}
        />
      )}
      {isEditCityModalOpen && (
        <EditCity
          isOpen={isEditCityModalOpen}
          onClose={closeEditCityModal}
          location={selectedLoc}
        />
      )}
      {isViewModalOpen && viewLocationDetails && (
        <SingleLocationModal
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
          locationDetails={viewLocationDetails}
        />
      )}
    </div>
  );
};

export default LocationControll;
