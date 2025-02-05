import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activateAds,
  deActivateAds,
  deleteAds,
  getAllAds,
  viewSingleAds,
} from "../redux/slices/AdsSlice";
import AddAds from "../components/globalController/triggers/AddAds";
import EditAds from "../components/globalController/forms/EditAds";
import SingleAds from "../components/globalController/SingleAds";
import { encryptId } from "../utils/Crypto";
import Snackbar from "../components/globalController/triggers/Snackbar";

const Ads = () => {
  const { loading, ads, error } = useSelector((state) => state.ads);
  const [selectedAds, setSelectedAds] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewAdsDetails, setViewAdsDetails] = useState(null);

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
    dispatch(getAllAds());
  }, [dispatch]);

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

  const handleEditAds = (ad) => {
    showSnackbar(
      "Are you sure you want to edit this ad?",
      "warning",
      true,
      () => {
    setSelectedAds(ad);
    setIsEditModalOpen(true);
  },
  () => {
    showSnackbar("Edit canceled.", "info");
  });
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAds(null);
  };

  const handleDeleteAds = (adsId) => {
    showSnackbar(
      "Are you sure you want to delete this ad?",
      "warning",
      true,
      () => {
        const encryptedId = encryptId(adsId);
        dispatch(deleteAds({ adsId: encryptedId }))
          .unwrap()
          .then(() => {
            dispatch(getAllAds());
            showSnackbar("Ad deleted successfully!", "success");
          })
          .catch((error) => {
            console.error(error);
            showSnackbar("Failed to delete ad.", "error");
          });
      },
      () => {
        showSnackbar("Deletion canceled.", "info");
      }
    );
  };

  const handleActivate = (adsId) => {
    showSnackbar(
      "Are you sure you want to activate this ad?",
      "warning",
      true,
      () => {
    const encryptedId = encryptId(adsId);
    dispatch(activateAds({ adsId: encryptedId }))
      .unwrap()
      .then(() => {
        dispatch(getAllAds());
        showSnackbar("Ad activated successfully!", "success");
      })
      .catch((error) => {
        console.error(error);
        showSnackbar("Failed to activate ad.", "error");
      });
    },
    () => {
      showSnackbar("Deletion canceled.", "info");
    }
  );
  };

  const handleDeActivate = (adsId) => {
    showSnackbar(
      "Are you sure you want to deactivate this ad?",
      "warning",
      true,
      () => {
    const encryptedId = encryptId(adsId);
    dispatch(deActivateAds({ adsId: encryptedId }))
      .unwrap()
      .then(() => {
        dispatch(getAllAds());
        showSnackbar("Ad deactivated successfully!", "success");
      })
      .catch((error) => {
        console.error(error);
        showSnackbar("Failed to deactivate ad.", "error");
      });
    },
    () => {
      showSnackbar("Deletion canceled.", "info");
    }
  );
  };

  const handleViewAds = (adsId) => {
    const encryptedId = encryptId(adsId);
    dispatch(viewSingleAds({ adsId: encryptedId }))
      .unwrap()
      .then((adsDetails) => {
        setViewAdsDetails(adsDetails);
        setIsViewModalOpen(true);
      })
      .catch((err) => {
        console.error("Error viewing ad:", err);
        showSnackbar("Failed to fetch ad details.", "error");
      });
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewAdsDetails(null);
  };

  const handleAction = (action, ad) => {
    switch (action) {
      case "edit":
        handleEditAds(ad);
        break;
      case "delete":
        handleDeleteAds(ad._id);
        break;
      case "view":
        handleViewAds(ad._id);
        break;
      case "activate":
        handleActivate(ad._id);
        break;
      case "deactivate":
        handleDeActivate(ad._id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-h-screen w-full pt-2 pb-20 lg:pb-20">
      {/* Add Ads and Title */}
      <div className="flex flex-row items-center justify-between w-[90%] m-auto">
        <AddAds />
        <div className="text-center text-xl font-bold mb-4">
          Theatre Management
        </div>
      </div>

      {/* Display Ads Table */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : ads.length > 0 ? (
        <>
          <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Duration</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad._id} className="hover:bg-gray-100">
                  <td className="p-2 border">{ad.adsTitle}</td>
                  <td className="p-2 border">{ad.durationDays}</td>
                  <td className="p-2 border">
                    {ad.active ? "Active" : "Inactive"}
                  </td>
                  <td className="p-2 border">
                    <select
                      className="border p-1"
                      onChange={(e) => {
                        const action = e.target.value;
                        if (!action) return;
                        handleAction(action, ad);
                        e.target.value = "";
                      }}
                    >
                      <option value="">Action</option>
                      <option value="edit">Edit</option>
                      <option value="delete">Delete</option>
                      <option value="view">View</option>
                      <option value={ad.active ? "deactivate" : "activate"}>
                        {ad.active ? "Deactivate" : "Activate"}
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-center">No Ads available.</p>
      )}

      {/* Modals */}
      <EditAds isOpen={isEditModalOpen} onClose={closeEditModal} ad={selectedAds} />
      {isViewModalOpen && viewAdsDetails && (
        <SingleAds ad={viewAdsDetails} onClose={closeViewModal} />
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

export default Ads;
