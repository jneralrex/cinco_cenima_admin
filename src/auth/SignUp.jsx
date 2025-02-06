import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/cinco-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signUpWebAdmin } from "../redux/slices/adminSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.cinema);
  const dispatch = useDispatch();
  const [regWebAdmin, setWebAdmin] = useState({
    cinemaName: "",
    ownerFirstName: "",
    ownerLastName: "",
    cinemaEmail: "",
    cinemaPhoneNumber:"",
    password: "",
  });
  

  const handleInput = (e) => {
    setWebAdmin({ ...regWebAdmin, [e.target.name]: e.target.value });
  };

 
  const register = (e) => {
    e.preventDefault();
    if (!regWebAdmin.cinemaName || !regWebAdmin.ownerFirstName || !regWebAdmin.ownerLastName || !regWebAdmin.cinemaEmail || !regWebAdmin.cinemaPhoneNumber || !regWebAdmin.password) {
      alert("Fields cannot be empty");
      return;
    }
    dispatch(signUpWebAdmin(regWebAdmin)).then((action) => {
      if (action.type === "admin/signUpWebAdmin/fulfilled") {
        navigate("/otp");
      }
    });
  };
  console.log(regWebAdmin);
  return (
    <div>
      <div className="flex justify-center items-center">
        <img src={Logo} alt="" className="h-40" />
      </div>
      <div className="p-3 max-w-lg mx-auto">
        <p className="text-center text-2xl text-gray-500 p-2">Web Admin</p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={register}>
          <label htmlFor="">
            User Name
            <input
              type="text"
              name="cinemaName"
              value={regWebAdmin.cinemaName}
              onChange={handleInput}
              className="w-full border rounded-lg p-2"
              placeholder=""
            />
          </label>
          <label htmlFor="">
          Owner First Name
          <input
              type="text"
              name="ownerFirstName"
              onChange={handleInput}
              value={regWebAdmin.ownerFirstName}
              className="w-full border rounded-lg p-2"
              placeholder=""
            />
          </label>
          <label htmlFor="">
            Owner Last Name
            <input
              type="text"
              name="ownerLastName"
              onChange={handleInput}
              value={regWebAdmin.ownerLastName}
              className="w-full border rounded-lg p-2"
              placeholder=""
            />
          </label>
          <label htmlFor="">
            Mobile Number
            <input
              type="text"
              name="cinemaPhoneNumber"
              onChange={handleInput}
              value={regWebAdmin.cinemaPhoneNumber}
              className="w-full border rounded-lg p-2"
              placeholder="+11 111 11"
            />
          </label>
          <label htmlFor="">
            Email
            <input
              type="email"
              name="cinemaEmail"
              value={regWebAdmin.cinemaEmail}
              onChange={handleInput}
              className="w-full border rounded-lg p-2"
              placeholder="email@mail.com"
            />
          </label>
          <label htmlFor="">
            Password
            <input
              type="password"
              name="password"
              onChange={handleInput}
              value={regWebAdmin.password}
              className="w-full border rounded-lg p-2"
              placeholder="password"
            />
          </label>
          <button
            className="w-full bg-purple-700 rounded-lg p-2 text-white text-lg"
            disabled={loading}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </form>
        <div className="w-full flex flex-row gap-3">
          Already have an account?
          <Link to="/sign-in">
            <span className="text-blue-600">sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
