import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { editAds, getAllAds } from '../../../redux/slices/AdsSlice';
import { encryptId } from '../../../utils/Crypto';
import { MdCancel } from 'react-icons/md';

const EditAds = ({ isOpen, onClose, ad }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        adsTitle: "",
        adsBody: "",
        adsLink: "",
        durationDays: "",
    });
  
    useEffect(() => {
      if (ad) {
        setFormData({
            adsTitle: ad.adsTitle,
            adsBody: ad.adsBody,
            adsLink: ad.adsLink,
            durationDays: ad.durationDays,
        });
      }
    }, [ad]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        !formData.adsTitle ||
        !formData.adsBody ||
        !formData.adsLink ||
        !formData.durationDays
      ) {
        alert("Username and Email are required!");
        return;
      }
      dispatch(
        editAds({ adsId: encryptId(ad._id), adsData: formData })
      )
        .unwrap()
        .then(() => {
          setFormData({
            adsTitle: "",
            adsBody: "",
            adsLink: "",
            durationDays: "",
            });
          onClose();
          dispatch(getAllAds())
        })
        .catch((err) => {
          console.error("Error editing screen:", err);
        });
    };
  
    if (!isOpen) return null;
    return (
      <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
        <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
          <h2>Edit Ads</h2>
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
              id="adsTitle"
              name="adsTitle"
              placeholder="Cinco flash sale"
              onChange={handleChange}
              value={formData.adsTitle}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              id="adsBody"
              name="adsBody"
              placeholder=""
              onChange={handleChange}
              value={formData.adsBody}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              id="adsLink"
              name="adsLink"
              placeholder="https://..."
              onChange={handleChange}
              value={formData.adsLink}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
              <input
              type="text"
              id="durationDays"
              name="durationDays"
              placeholder="1"
              onChange={handleChange}
              value={formData.durationDays}
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
  

export default EditAds