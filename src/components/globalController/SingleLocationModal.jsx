import React from "react";
import { useSelector } from "react-redux";

const SingleLocationModal = ({ isOpen, onClose, locationDetails }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md flex flex-col justify-center">
                <h2 className="text-xl font-bold mb-4">Location Details</h2>
                {locationDetails && locationDetails.location.length > 0 ? (
                    locationDetails.location.map((loc, index) => (
                        <div key={index} className="mb-4">
                            <p><strong>State:</strong> {loc.state}</p>
                            {loc.cities.length > 0 ? (
                                <ul className="list-disc pl-6">
                                    {loc.cities.map((city, cityIndex) => (
                                        <li key={cityIndex}>
                                            <p><strong>City:</strong> {city.city}</p>
                                            <p><strong>Street:</strong> {city.street}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No cities available.</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No details available.</p>
                )}
                <button
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SingleLocationModal;
