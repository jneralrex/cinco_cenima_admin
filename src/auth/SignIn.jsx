import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/images/cinco-logo.png";
import { loggWebAdmin } from "../redux/slices/adminSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.cinema);

  const [signInAdmin, setSignInAdmin] = useState({
    cinemaPhoneNumberOrCinemaEmail: "",
    password: "",
  });

  const handleInput = (e) => {
    setSignInAdmin({ ...signInAdmin, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!signInAdmin.cinemaPhoneNumberOrCinemaEmail || !signInAdmin.password) {
      alert("Fields cannot be empty");
      return;
    }
    dispatch(loggWebAdmin(signInAdmin)).then((action) => {
      if (action.type === "admin/loggWebAdmin/fulfilled") {
        navigate("/dashboard");
      }
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <img src={Logo} alt="" />
      </div>
      <div className="p-3 max-w-lg mx-auto">
        <p className="text-center text-2xl text-gray-500 p-2">Cinema admin</p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <label>
            <input
              type="text"
              name="cinemaPhoneNumberOrCinemaEmail"
              className="w-full border rounded-lg p-2"
              placeholder="Name or Email"
              value={signInAdmin.cinemaPhoneNumberOrCinemaEmail}
              onChange={handleInput}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              className="w-full border rounded-lg p-2"
              placeholder="Password"
              value={signInAdmin.password}
              onChange={handleInput}
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
        <div className="w-full flex justify-between text-sm">
        
          <Link to="/forgot-password" className="text-blue-600">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
