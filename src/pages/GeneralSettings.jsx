import React, { useState } from "react";
import { MdDescription } from "react-icons/md";
import { BiMailSend, BiLogOut } from "react-icons/bi";

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "",
    adminEmail: "",
    keywords: "",
    description: "",
    websiteURL: "",
    feedbackService: "",
    cutOffMinutes: 20,
    cmsPages: {
      aboutUs: "",
      termsAndConditions: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleCMSChange = (page, value) => {
    setSettings((prev) => ({
      ...prev,
      cmsPages: { ...prev.cmsPages, [page]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Settings:", settings);
    // Logic to save settings to the backend
  };

  return (
    <div className="p-6  m-h-screen overflow-auto">
      <div className="bg-white shadow-md rounded-lg max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">General Settings</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Site Name */}
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium mb-2">
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Admin Email */}
          <div>
            <label htmlFor="adminEmail" className="block text-sm font-medium mb-2">
              <BiMailSend className="inline-block mr-2" /> Admin Email
            </label>
            <input
              type="email"
              id="adminEmail"
              name="adminEmail"
              value={settings.adminEmail}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Keywords */}
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium mb-2">
              Keywords
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={settings.keywords}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              <MdDescription className="inline-block mr-2" /> Description
            </label>
            <textarea
              id="description"
              name="description"
              value={settings.description}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Website URL */}
          <div>
            <label htmlFor="websiteURL" className="block text-sm font-medium mb-2">
              Website URL
            </label>
            <input
              type="url"
              id="websiteURL"
              name="websiteURL"
              value={settings.websiteURL}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Feedback Service */}
          <div>
            <label htmlFor="feedbackService" className="block text-sm font-medium mb-2">
              Feedback Service
            </label>
            <input
              type="text"
              id="feedbackService"
              name="feedbackService"
              value={settings.feedbackService}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cut-off Minutes */}
          <div>
            <label htmlFor="cutOffMinutes" className="block text-sm font-medium mb-2">
              Cut-off Minutes
            </label>
            <input
              type="number"
              id="cutOffMinutes"
              name="cutOffMinutes"
              value={settings.cutOffMinutes}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* CMS Pages */}
          <div>
            <label className="block text-sm font-medium mb-2">CMS Pages</label>
            <div className="space-y-4">
              <div>
                <label htmlFor="aboutUs" className="block text-sm font-medium mb-2">
                  About Us
                </label>
                <textarea
                  id="aboutUs"
                  value={settings.cmsPages.aboutUs}
                  onChange={(e) => handleCMSChange("aboutUs", e.target.value)}
                  className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="termsAndConditions" className="block text-sm font-medium mb-2">
                  Terms and Conditions
                </label>
                <textarea
                  id="termsAndConditions"
                  value={settings.cmsPages.termsAndConditions}
                  onChange={(e) => handleCMSChange("termsAndConditions", e.target.value)}
                  className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralSettings;
