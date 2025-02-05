import React, { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import { GlobalController } from "../Global";

const ReportForm = () => {
  const { addReport, setAddReport } = useContext(GlobalController);
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Generating ${reportType} report from ${startDate} to ${endDate}`);
    // You can call your report generation API or logic here
    setAddReport(false); // Close the form modal after submission
  };

  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddReport(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form Title */}
        <h2 className="text-xl font-bold text-center mb-4">Generate Report</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium mb-2">
              Select Report Type
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">Select Report</option>
              <option value="event-wise-booking">Event-wise Booking</option>
              <option value="movie-wise-booking">Movie-wise Booking</option>
              <option value="event-revenue">Event Revenue</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          >
            Generate Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
