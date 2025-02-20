import React, { useContext, useEffect, useState } from "react";
import { GlobalController } from "../Global";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../../utils/AxiosInstance";
import DotsLoader from "../../DotLoader";

const DateForm = () => {
  const dispatch = useDispatch();
  const { addDate, setAddDate } = useContext(GlobalController);
  const { loading, screens, error } = useSelector((state) => state.screens);

  // const loggedAdmin = useSelector(
  //   (state) => state.theatre?.theatre?.theatre?._id
  // );

  const [newDate, setNewDate] = useState({
    theatre_id: loggedAdmin,
    movie_id: '',
    date: '',
    show_times: [{ time: '', screen_id: '', available_seats: '' }],
  });

  const handleNestedChange = (e, field, index) => {
    const { name, value } = e.target;
    const updatedField = [...newDate[field]];
    updatedField[index] = { ...updatedField[index], [name]: value };
    setNewDate({ ...newDate, [field]: updatedField });
    // console.log(` Updated ${field} at index ${index}:`, updatedField[index]);
  };

  const addNestedField = (field) => {
    setNewDate({
      ...newDate,
      [field]: [...newDate[field], { time: '', screen_id: '', available_seats: '' }],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDate((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const id = localStorage.getItem("movieId");
    try {
      const resp = await Api.post(`airingdate/new`, {...newDate, movie_id: id});
      // const resp = await axios.post('http://localhost:5000/api/v1/airingdate/new', {...newDate, movie_id: id});
      // console.log(resp);
      if(resp.status === 201){
        setNewDate({
          movie_id: '',
          date: '',
          show_times: [{ time: '', screen_id: '', available_seats: '' }],
        });
        setAddDate("");
      }
    } catch (error) {
      console.log(` Error creating date: ${error}`, error);
    }
  };
  
  // useEffect(() => {
  //   dispatch(getAllScreen(loggedAdmin));
  // }, [dispatch]);

  if(loading) return <DotsLoader />;
  if(error) return <div><p className="text-center text-red-500">Error with screen id: {error}</p></div>;
  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddDate("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form */}
        <h2 className="text-xl font-bold text-center mb-4">Add Date</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            required
            type="date"
            name="date"
            value={newDate.date}
            onChange={handleChange}
            placeholder="Enter Date"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="form-control mb-4">
            <label htmlFor="" className="text-xs mb-1">Streaming time <span className="text-red-500">*</span></label>
            {newDate.show_times.map((st, index) => (
              <div key={index} className="grid lg:grid-cols-3 gap-2 mb-2">
                <input
                  type="time"
                  required
                  name="time"
                  value={st.time}
                  onChange={(e) => handleNestedChange(e, 'show_times', index)}
                  className="input input-bordered flex-1"
                />
                <select
                  className="input input-bordered flex-1"
                  name="screen_id"
                  required
                  value={st.screen_id}
                  onChange={(e) => handleNestedChange(e, 'show_times', index)}
                >
                  <option value="">Screen</option>
                  {screens?.map((screen) => (
                    <option key={screen._id} value={screen._id}>{screen.screenName}</option>
                  ))}
                </select>

                <input
                  name="available_seats"
                  type="number"
                  required
                  value={st.available_seats}
                  onChange={(e) => handleNestedChange(e, 'show_times', index)}
                  placeholder="Available seats"
                  className="input input-bordered flex-1"
                />
              </div>
            ))}
            <div className="flex justify-end">
              <button type="button" onClick={() => addNestedField('show_times')} className="text-xs rounded text-purple-800 hover:bg-gray-100 p-1">
                + Add stream time
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Date
          </button>
        </form>
      </div>
    </div>
  );
};

export default DateForm;
