import React, { useContext, useState } from "react";
import Api from "../utils/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { GlobalController } from "../components/globalController/Global";
import { MdCancel } from "react-icons/md";

const VerifyOtp = () => {
  const {addVerifyOtp, setVerifyOtp}= useContext(GlobalController);
  const [verifyAdminOtp, setVerifyAdminOtp] = useState({ cinemaEmail: "", otp: "" });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setVerifyAdminOtp({ ...verifyAdminOtp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verifyAdminOtp.cinemaEmail || !verifyAdminOtp.otp) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError(null); 
    try {
      const res = await Api.post(`theatre/verifyotp`, verifyAdminOtp);
      setResponse(res.data.message);
      if (res.data.message === "OTP verified. Registration complete.") {
        navigate("/sign-in");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setVerifyAdminOtp({ ...verifyAdminOtp, otp: "" });
      setVerifyOtp("")
    } finally {
      setLoading(false);
    }
  };

  console.log(first)

  return (
    <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
     <div className="flex flex-row justify-center">
     <div>Verify OTP</div>
        <button
          aria-label="Close"
          onClick={() => setVerifyOtp("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>
     </div>
        <div className="p-3 max-w-lg mx-auto">
          <p className="text-center text-2xl text-gray-500 p-2">New Theatre</p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="cinemaEmail"
                value={verifyAdminOtp.cinemaEmail}
                onChange={handleInput}
                id="email"
                className="w-full border rounded-lg p-2"
                placeholder="Registered email"
              />
            </label>
            <label htmlFor="otp">
              OTP
              <input
                type="text"
                name="otp"
                value={verifyAdminOtp.otp}
                onChange={handleInput}
                id="otp"
                className="w-full border rounded-lg p-2"
                placeholder="* * * * * *"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-purple-700 rounded-lg p-2 text-white text-lg"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="text-center mt-4">
          {!response ? (
            <Link to="/resend-otp" className="text-blue-500 underline">
              Resend OTP
            </Link>
          ) : (
            <p className="text-green-500">{response}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
