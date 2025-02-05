import React, { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import { GlobalController } from "../Global";
import { useDispatch, useSelector } from "react-redux";
import { createScreen, getAllScreen } from "../../../redux/slices/ScreenSlice";

const ScreenForm = () => {
  const { addScreen, setAddScreen } = useContext(GlobalController);
  const [createNewScreen, setCreateNewScreen] = useState({
    screenName: "",
    screenCapacity: "",
    screenType: "",
  });
  const dispatch = useDispatch();
  const loggedAdmin = useSelector(
    (state) => state.theatre?.theatre?.theatre?._id
  );
  const handleInput = (e) => {
    setCreateNewScreen({ ...createNewScreen, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createScreen({createNewScreen, loggedAdmin}))
      .unwrap()
      .then(() => {
        setCreateNewScreen({
          screenName: "",
          screenCapacity: "",
          screenType: "",
        });
        setAddScreen("")
       dispatch(getAllScreen())
        
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(createNewScreen)

  return (
    <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddScreen("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form */}
        <h2 className="text-xl font-bold text-center mb-4">Add New Screen</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="screenName"
            name="screenName"
            placeholder="Screen name"
            onChange={handleInput}
            value={createNewScreen.screenName}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
            <input
            type="text"
            id="screenCapacity"
            name="screenCapacity"
            placeholder="screen capacity"
            onChange={handleInput}
            value={createNewScreen.screenCapacity}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="screenType"
            name="screenType"
            placeholder="Screen type"
            onChange={handleInput}
            value={createNewScreen.screenType}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Screen
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScreenForm;
