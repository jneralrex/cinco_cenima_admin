import React, { useContext, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { GlobalController } from '../Global';

const NewsForm = () => {
  const { addNews, setAddNews } = useContext(GlobalController);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('News Data:', formData);
    // Logic to handle news submission (e.g., API call)
    setAddNews(false); // Close the form modal after submission
  };

  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddNews(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form Title */}
        <h2 className="text-xl font-bold text-center mb-4">Add News</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="News Title"
            value={formData.title}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="content"
            placeholder="News Content"
            value={formData.content}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit News
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
