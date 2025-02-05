import React, { useContext, useState } from "react";
import { GlobalController } from "../Global";
import { MdCancel } from "react-icons/md";

const TimeForm = () => {
  const { addTime, setAddTime } = useContext(GlobalController);

  const [newTime, setNewTime] = useState({
    Time: "",
    availability: ""
  });

  const [newTimeError, setNewTimeError] = useState({
    Time: "",
    availability: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTime((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const formValidate = () => {
    const newError = {};

    if (!newTime.Time) {
      newError.Time = "Time is required";
    }
    if (!newTime.availability) {
      newError.availability = "Availability is required";
    }

    setNewTimeError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValidate()) {
      try {
        const resp = await Api.post("airingtime/all-times", newTime);
        if (resp.status === 201) {
          alert("Time created successfully");
          console.log(resp.data.times);
        } else if (resp.status === 403) {
          alert("Time already exists");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("Validation error occurred");
    }
  };

  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddTime("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form */}
        <h2 className="text-xl font-bold text-center mb-4">Add Time</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="eventTime"
            name="Time"
            value={newTime.Time}
            onChange={handleChange}
            placeholder="Enter Time"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {newTimeError.Time && (
            <p className="text-red-500 text-sm">{newTimeError.Time}</p>
          )}

          <input
            type="text"
            id="availability"
            name="availability"
            value={newTime.availability}
            onChange={handleChange}
            placeholder="Enter Availability"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {newTimeError.availability && (
            <p className="text-red-500 text-sm">{newTimeError.availability}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Time
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimeForm;
