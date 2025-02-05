import React, { useState } from "react";
import Api from "../utils/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [forgotPassword, setForgotPassword] = useState({ email: "" });
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInput = (e) => {
    setForgotPassword({ ...forgotPassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!forgotPassword.email) {
      setError("Email required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await Api.patch(`auth/forgotpassword`, forgotPassword);
      setResponse(res.data.data.message);
      if (res.data.message === "Password reset email sent.") {
        navigate("/otp");
      }
      console.log(res);

    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setForgotPassword({ email: "" });
    } finally {
      setLoading(false);
    }
  };
  console.log(response);
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="mt-2">Forgot password</div>
      </div>
      <div>
        <div className="p-3 max-w-lg mx-auto">
          <p className="text-center text-2xl text-gray-500 p-2">Web Admin</p>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="">
              Email
              <input
                type="text"
                name="email"
                value={forgotPassword.email}
                onChange={handleInput}
                id=""
                className="w-full border rounded-lg p-2"
                placeholder="registered email"
              />
            </label>

            <button
              className="w-full bg-purple-700 rounded-lg p-2 text-white text-lg"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          <div className="w-full flex flex-row gap-3">
          <Link to="/sign-in">
            <span className="text-blue-600">sign in</span>
          </Link>
        </div>
        </div>
        <div className="text-center mt-4">
          {!response ? <p className="text-green-500">{response}</p> : ""}
        </div>
      </div>
     
    </div>
  );
};

export default ForgotPassword;
