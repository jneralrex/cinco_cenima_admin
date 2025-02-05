import React, { useContext, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editCity } from "../../../redux/slices/locationSlice";

const EditCity = ({ isOpen, onClose, location }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.locations);

  const [formData, setFormData] = useState({
    state: location?.state || "",
    city: location?.city || "",
    newCity: "",
    newStreet: "",
  });
  

  useEffect(() => {
    if (location) {
      console.log("Location data:", location);
      setFormData({
        state: location.state || "",
        city: location.city || "",
        newCity: "",
        newStreet: "",
      });
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { state, city, newCity, newStreet } = formData;
  
    if (!state || !city || !newCity || !newStreet) {
      console.error("Missing fields:", { state, city, newCity, newStreet });
      alert("Please fill in all fields");
      return;
    }
  
    dispatch(editCity(formData))
      .unwrap()
      .then(() => {
        setFormData({ state: "", city: "", newCity: "", newStreet: "" });
        onClose();
      })
      .catch((err) => console.error(err));
  };
  

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50"
    >
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <button
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <MdCancel size={24} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Add Location</h2>
        {loading ? (
          <p className="text-center">Submitting...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : null}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            className={`border ${
              formData.state ? "border-gray-300" : "border-red-500"
            } p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
           <input
            type="text"
            name="city"
            placeholder="city"
            value={formData.city}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
            <input
            type="text"
            name="newCity"
            placeholder="newCity"
            value={formData.newCity}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           <input
            type="text"
            name="newStreet"
            placeholder="newStreet"
            value={formData.newStreet}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white py-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {loading ? "Submitting..." : "Submit Location"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCity;
