import React, { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import { GlobalController } from "../Global";

const TicketForm = () => {
  const { addTicket, setAddTicket } = useContext(GlobalController);

  const [formData, setFormData] = useState({
    eventName: "",
    ticketType: "",
    price: "",
    quantity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add logic for submitting the form
    onClose();
  };

  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddTicket("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form Title */}
        <h2 className="text-xl font-bold text-center mb-4">Add Ticket</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="ticketType"
            placeholder="Ticket Type (e.g., VIP, Regular)"
            value={formData.ticketType}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
