import React, { useEffect, useState } from "react";
import AddEvent from "../components/globalController/triggers/AddEvent";
import { deleteEvent, getEvents, vieweEvent } from "../redux/slices/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { encryptId } from "../utils/Crypto";
import SingleEvent from "../components/globalController/SingleEvent";
import EditEvent from "../components/globalController/forms/EditEvent";
import Snackbar from "../components/globalController/triggers/Snackbar";

const EventManagement = () => {
  const { loading, events, error } = useSelector((state) => state.events);
    const  loggedAdmin = useSelector((state) => state.theatre?.theatre?.theatre?._id);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewEventDetails, setViewEventDetails] = useState(null);

  console.log(loggedAdmin)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents(loggedAdmin));
  }, [dispatch]);

  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    type: "",
    isConfirmation: false,
    onConfirm: null,
    onCancel: null,
  });

  const showSnackbar = (
    message,
    type = "info",
    isConfirmation = false,
    onConfirm = null,
    onCancel = null
  ) => {
    setSnackbar({
      isOpen: true,
      message,
      type,
      isConfirmation,
      onConfirm,
      onCancel,
    });
  };

  const handleViewEvent = (eventId) => {
    const encryptedId = encryptId(eventId);
    dispatch(vieweEvent({ eventId: encryptedId }))
      .unwrap()
      .then((eventDetails) => {
        setViewEventDetails(eventDetails);
        setIsViewModalOpen(true);
      })
      .catch((err) => {
        console.error("Error viewing user:", err);
      });
  };

  const handleEditEvent = (event) => {
    showSnackbar(
      "Are you sure you want to edit this event?",
      "warning",
      true,
      () => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
      },
      () => {
        showSnackbar("Edit canceled.", "info");
      }
    );
  };

  const handleDeleteEvent = (eventId) => {
    showSnackbar(
      "Are you sure you want to delete this Event?",
      "warning",
      true,
      () => {
        const encryptedId = encryptId(eventId);
        dispatch(deleteEvent({ eventId: encryptedId }))
          .then(() => {
            dispatch(getEvents());
            showSnackbar("Event deleted successfully!", "success");
          })
          .catch((error) => {
            console.error(error);
            showSnackbar("Failed to delete event.", "error");
          });
      },
      () => {
        showSnackbar("Deletion canceled.", "info");
      }
    );
  };

  const handleAction = (action, event) => {
    switch (action) {
      case "edit":
        handleEditEvent(event);
        break;
      case "delete":
        handleDeleteEvent(event._id);
        break;
      case "view":
        handleViewEvent(event._id);
        break;
      default:
        break;
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewEventDetails(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="max-h-screen w-full  pt-2 pb-20 lg:pb-20">
      <div className="flex flex-row items-center justify-between w-[90%] m-auto">
        <AddEvent />
        <div className="text-center text-xl font-bold mb-4">
          Event Management
        </div>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : events && events.length > 0 ? (
        <>
          <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Event name</th>
                <th className="p-2 border">Host name </th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>

                <th className="p-2 border"></th>
              </tr>
            </thead>
            {events.map((event) => (
              <tr
                key={event._id}
                className="hover:bg-gray-100 text-[12px] md:text-[14px]"
              >
                <td className="p-2 border">{event.eventName}</td>
                <td className="p-2 border">{event.eventHost}</td>
                <td className="p-2 border">
                  {new Date(event.eventDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">{event.eventTime}</td>
                <td className="p-2 border">
                  <select
                    className="border p-1"
                    onChange={(e) => {
                      const action = e.target.value;
                      if (!action) return;
                      handleAction(action, event);
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
          </table>
        </>
      ) : (
        <p className="text-center">No events available.</p>
      )}
      <EditEvent
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        event={selectedEvent}
      />
      {isViewModalOpen && viewEventDetails && (
        <SingleEvent event={viewEventDetails} onClose={closeViewModal} />
      )}

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

export default EventManagement;
