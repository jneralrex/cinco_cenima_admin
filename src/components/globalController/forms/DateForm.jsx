import React, { useContext, useState } from "react";
import { GlobalController } from "../Global";
import { MdCancel } from "react-icons/md";

const DateForm = () => {
  const { addDate, setAddDate } = useContext(GlobalController);

  const [newDate, setNewDate] = useState({
    Date: "",
    availability: ""
  });

  const [newDateError, setNewDateError] = useState({
    Date: "",
    availability: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDate((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const formValidate = () => {
    const newError = {};

    if (!newDate.Date) {
      newError.Date = "Date is required";
    }
    if (!newDate.availability) {
      newError.availability = "Availability is required";
    }

    setNewDateError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValidate()) {
      try {
        const resp = await Api.post("airingDate/all-dates", newDate);
        if (resp.status === 201) {
          alert("Date created successfully");
          console.log(resp.data.dates);
        } else if (resp.status === 403) {
          alert("Date already exists");
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
          onClick={() => setAddDate("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form */}
        <h2 className="text-xl font-bold text-center mb-4">Add Date</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="eventDate"
            name="Date"
            value={newDate.Date}
            onChange={handleChange}
            placeholder="Enter Date"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {newDateError.Date && (
            <p className="text-red-500 text-sm">{newDateError.Date}</p>
          )}

          <input
            type="text"
            id="availability"
            name="availability"
            value={newDate.availability}
            onChange={handleChange}
            placeholder="Enter Availability"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {newDateError.availability && (
            <p className="text-red-500 text-sm">{newDateError.availability}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Date
          </button>
        </form>
      </div>
    </div>
  );
};

export default DateForm;
