import React, { useState, useContext, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { GlobalController } from "../Global";
import { useDispatch, useSelector } from "react-redux";
import { createTheatreAdmin } from "../../../redux/slices/TheatreAdminSlice";
import { getAllLocation } from "../../../redux/slices/locationSlice";
import { Link } from "react-router-dom";

const TheatreAdminForm = () => {
  const { setAddTheatreAdmin } = useContext(GlobalController);
  const dispatch = useDispatch();
  
  const {
    loading,
    error,
    locations = []
  } = useSelector((state) => state.locations);

  const  loggedAdmin = useSelector((state) => state.cinema.cinema.cinema._id);

  useEffect(() => {
    if (loggedAdmin) {
      dispatch(getAllLocation({ loggedAdmin }));
    }
  }, [dispatch, loggedAdmin]);

  const [formData, setFormData] = useState({
    theatreName: "",
    theatreLocation: "",
    theatreEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { theatreName, theatreLocation, theatreEmail, password } = formData;

    if (!theatreName || !theatreLocation || !theatreEmail || !password) {
      alert("All fields are required.");
      return;
    }

    dispatch(createTheatreAdmin({ formData, loggedAdmin }))
      .unwrap()
      .then(() => {
        setFormData({
          theatreName: "",
          theatreLocation: "",
          theatreEmail: "",
          password: "",
        });
        setAddTheatreAdmin(""); // Close modal
        
      })
      .catch((err) => {
        alert(`Error: ${err.message || "Failed to create theatre admin"}`);
      });
  };

  return (
    <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <button
          aria-label="Close"
          onClick={() => setAddTheatreAdmin("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Add Theatre Admin</h2>
          <div className="text-center"> You can log in to <Link to="https://cincocinemawebadmin.onrender.com" className="underline text-blue-500">Theatre Admin dashboard</Link> </div>
          <p className="text-center">If account is created successfully</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="theatreName"
            placeholder="Theatre Name"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.theatreName}
            onChange={handleChange}
          />

          {/* Dropdown for Theatre Location */}
          <select
            id="theatreLocation"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.theatreLocation}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            {locations.map((locationItem) =>
              locationItem.location.map((loc) =>
                loc.cities.map((city) => (
                  <option key={locationItem._id} value={locationItem._id}>
                    {`${loc.state}, ${city.city}, ${city.street}`}
                  </option>
                ))
              )
            )}
          </select>

          <input
            type="email"
            id="theatreEmail"
            placeholder="Theatre Email"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.theatreEmail}
            onChange={handleChange}
          />

          <input
            type="password"
            id="password"
            placeholder="*********"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
          />

          {loading ? (
            <button
              type="button"
              disabled
              className="bg-gray-400 text-white py-2 rounded-md cursor-not-allowed"
            >
              Submitting...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save Admin
            </button>
          )}
        </form>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default TheatreAdminForm;
