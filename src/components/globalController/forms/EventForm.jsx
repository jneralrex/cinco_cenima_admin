import React, { useContext, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { GlobalController } from "../Global";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, getEvents } from "../../../redux/slices/eventSlice";
import { getAllLocation } from "../../../redux/slices/locationSlice";

const EventForm = () => {
  const { addEvent, setAddEvent } = useContext(GlobalController);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.events);
  const  loggedAdmin = useSelector((state) => state.theatre?.theatre?.theatre?._id);

  

  const [formData, setFormData] = useState({
    eventName: "",
    eventHost: "",
    eventPrice: "",
    flyerImage: null,
    eventDate: "",
    eventTime: "",
    currency: "",
  });

useEffect(() => {
  if (addEvent) {
    dispatch(getAllLocation());
  }
}, [dispatch, addEvent]);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    dispatch(createEvent({payload, loggedAdmin}))
      .unwrap()
      .then(() => {
        setFormData({
          eventName: "",
          eventHost: "",
          eventPrice: "",
          flyerImage: null,
          eventDate: "",
          eventTime: "",
          currency: "",
        });
        setAddEvent("")
         dispatch(getEvents())
      })
      .catch((err) => {
        console.error(err);
      })
  };

  console.log(formData)

  return (
    <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddEvent(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form */}
        <h2 className="text-xl font-bold text-center mb-4">Add New Event</h2>
        {loading ? (
          <p className="text-center">Submitting...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : null}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleInput}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="eventHost"
            placeholder="Host name"
            value={formData.eventHost}
            onChange={handleInput}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="eventPrice"
            placeholder="10000"
            value={formData.eventPrice}
            onChange={handleInput}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="currency"
            placeholder="Currency (e.g. $, ₦)"
            value={formData.currency}
            onChange={handleInput}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInput}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="eventTime"
            placeholder="Time (e.g., 12:00 PM)"
            value={formData.eventTime}
            onChange={handleInput}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="flyerImage"
            onChange={handleInput}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
