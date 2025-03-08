import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { signUpWebAdmin } from "../redux/slices/adminSlice";
const SignUp = () => {
  const navigate = useNavigate();
  const [  addTheatreAdmin,setAddTheatreAdmin] = useState(null);
  const { loading, error } = useSelector((state) => state.cinema);
  const dispatch = useDispatch();
  const [regWebAdmin, setWebAdmin] = useState({
    cinemaName: "",
    ownerFirstName: "",
    ownerLastName: "",
    cinemaEmail: "",
    cinemaPhoneNumber: "",
    password: "",
  });

  const handleInput = (e) => {
    setWebAdmin({ ...regWebAdmin, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    if (
      !regWebAdmin.cinemaName ||
      !regWebAdmin.ownerFirstName ||
      !regWebAdmin.ownerLastName ||
      !regWebAdmin.cinemaEmail ||
      !regWebAdmin.cinemaPhoneNumber ||
      !regWebAdmin.password
    ) {
      alert("Fields cannot be empty");
      return;
    }
    dispatch(signUpWebAdmin(regWebAdmin)).then((action) => {
      if (action.type === "admin/signUpWebAdmin/fulfilled") {
        navigate("/otp");
      }
    });
  };
  return (
    <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-scroll max-h-screen">
        {/* Close Button */}
        {/* <button
          aria-label="Close"
          onClick={() => setAddTheatreAdmin("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button> */}

        <p className="text-center text-2xl text-gray-500 p-2">
          Create Cinema Admin
        </p>
      
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={register}>
          <label htmlFor="">
            Cinema Name
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
          <div className="flex justify-between">
            <p>Already have an account?</p>
            <Link to="/sign-in" className="underline text-blue-500">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
