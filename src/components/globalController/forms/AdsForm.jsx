import React, { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import { GlobalController } from "../Global";
import { useDispatch, useSelector } from "react-redux";
import { createAds, getAllAds } from "../../../redux/slices/AdsSlice";

const AdsForm = () => {
  const { setAddAds } = useContext(GlobalController);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ads);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    adsTitle: "",
    adsBody: "",
    adsLink: "",
    durationDays: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { adsTitle, adsBody, adsLink, durationDays } = formData;

    if (!adsTitle || !adsBody || !adsLink || !durationDays) {
      setIsLoading(false);
      alert("Please fill all fields.");
      return;
    }

    if (isNaN(durationDays) || durationDays <= 0) {
      setIsLoading(false);
      alert("Duration must be a positive number.");
      return;
    }

    try {
      await dispatch(createAds(formData)).unwrap();
      setFormData({
        adsTitle: "",
        adsBody: "",
        adsLink: "",
        durationDays: "",
      });
      setAddAds(false);
      dispatch(getAllAds());
    } catch (error) {
      console.error("Ad Creation Error:", error);
      alert(error.message || "Failed to create the ad. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6" role="dialog" aria-modal="true">
        <button
          aria-label="Close"
          onClick={() => setAddAds(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Create Ad</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="adsTitle"
            aria-label="Ad Title"
            placeholder="Ad Title"
            value={formData.adsTitle}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="adsBody"
            aria-label="Ad Body"
            placeholder="Body text of ad"
            value={formData.adsBody}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="adsLink"
            aria-label="Ad Link"
            placeholder="Ad Link"
            value={formData.adsLink}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="durationDays"
            aria-label="Ad Duration"
            placeholder="Duration (e.g., 30)"
            value={formData.durationDays}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading || isLoading}
            className={`bg-blue-500 text-white py-2 rounded-md ${
              loading || isLoading ? "opacity-50" : "hover:bg-blue-600"
            }`}
          >
            {loading || isLoading ? "Submitting..." : "Submit Ad"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdsForm;
