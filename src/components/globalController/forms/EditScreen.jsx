import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { editScreen, getAllScreen } from "../../../redux/slices/ScreenSlice";
import { encryptId } from "../../../utils/Crypto";

const EditScreen = ({ isOpen, onClose, screen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    screenName: "",
    screenCapacity: "",
    screenType: "",
  });
  const loggedAdmin = useSelector(
    (state) => state.theatre?.theatre?.theatre?._id
  );
  useEffect(() => {
    if (screen) {
      setFormData({
        screenName: screen.screenName,
        screenCapacity: screen.screenCapacity,
        screenType: screen.screenType,
      });
    }
  }, [screen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.screenName ||
      !formData.screenCapacity ||
      !formData.screenType
    ) {
      alert("Username and Email are required!");
      return;
    }
    dispatch(
      editScreen({ screenId: encryptId(screen._id), screenData: formData, loggedAdmin })
    )
      .unwrap()
      .then(() => {
        setFormData({
            screenName: "",
            screenCapacity:"",
            screenType: "",
          });
        onClose();
        dispatch(getAllScreen())
      })
      .catch((err) => {
        console.error("Error editing screen:", err);
      });
  };

  if (!isOpen) return null;
  return (
    <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <h2>Edit Screen</h2>
        <div className="flex flex-row">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          >
            <MdCancel size={24} />
          </button>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="screenName"
            name="screenName"
            placeholder="Screen name"
            onChange={handleChange}
            value={formData.screenName}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="screenCapacity"
            name="screenCapacity"
            placeholder="screen capacity"
            onChange={handleChange}
            value={formData.screenCapacity}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="screenType"
            name="screenType"
            placeholder="Screen type"
            onChange={handleChange}
            value={formData.screenType}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditScreen;
