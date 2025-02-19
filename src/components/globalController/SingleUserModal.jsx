import React from "react";

const SingleUserModal = ({ theatre, onClose }) => {
  if (!theatre || !theatre.theatre) return null;

  const { theatreName, role, theatreEmail, theatreLocation, theatreCinema, ownerFirstName, ownerLastName } = theatre.theatre;
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">{theatreName}</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Role: {role}</p>
        
        <div className="space-y-4">
          <div>
            <p className="font-medium">Email:</p>
            <p className="text-gray-700">{theatreEmail}</p>
          </div>
          <div>
            <p className="font-medium">Owner:</p>
            <p className="text-gray-700">{theatreCinema?.ownerFirstName} {theatreCinema?.ownerLastName}</p>
          </div>
          <div>
            <p className="font-medium">Cinema Name:</p>
            <p className="text-gray-700">{theatreCinema?.cinemaName}</p>
          </div>
          {theatreLocation && (
            <div>
              <p className="font-medium">Location:</p>
              <div className="text-gray-700">
                <p>State: {theatreLocation.state}</p>
                {theatreLocation.location?.map((loc, index) => (
                  <div key={index} className="ml-4">
                    <p>City: {loc.cities[0]?.city}</p>
                    <p>Street: {loc.cities[0]?.street}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-red-700 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleUserModal;
