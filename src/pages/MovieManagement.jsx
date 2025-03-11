import React, { useContext, useEffect, useState } from "react";
import AddMovie from "../components/globalController/triggers/AddMovie";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import { useSelector } from "react-redux";
import { GlobalController } from "../components/globalController/Global";
import DateForm from "../components/globalController/forms/DateForm";
import Api from "../utils/AxiosInstance";

const MovieManagement = () => {
  const { addDate, setAddDate } = useContext(GlobalController);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const loggedAdmin = useSelector((state) => state.cinema.cinema.cinema._id);

  const [all_movie_on_database, setAllMovieOnDatabase] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllMovieByCinema = async () => {
    try {
      const resp = await Api.get(`movies?cinema_id=${loggedAdmin}`);
      if (resp.status === 200) {
        setLoading(false);
        setAllMovieOnDatabase(resp.data.data);
        setCurrentPage(resp.data.currentPage);
      }
    } catch (error) {
      console.log("Error fetching all movies from database", error);
    }
  };

  const totalPages = Math.ceil(all_movie_on_database.length / rowsPerPage);

  const displayedMovie = all_movie_on_database.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value; // Get selected value
    if (!value) return; // Prevent empty selections

    let arr = value.split("-");
    let key = arr[0];
    let id = arr[1];

    switch (key) {
      case "view":
        navigate(`/movie-detail/${id}`);
        break;
      case "edit":
        navigate(`/edit-movie/${id}`);
        break;
      case "delete":
        handleDelete(id);
        break;
      case "toggleAvailability":
        toggleAvailability(id);
        break;
      case "add":
        toggleClassModal();
        localStorage.setItem("movieId", id);
      default:
        break;
    }
  };

  // Sample delete function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const resp = await Api.delete(`movies/${id}`);
        fetchAllMovieByCinema();
      } catch (error) {
        console.log("Error deleting Movie", error);
      }
      console.log(`Deleting movie with ID: ${id}`);
    }
  };

  //toggle availability
  const toggleAvailability = async (id) => {
    try {
      const resp = await Api.patch(`movies/${id}/toggle-availability`);
      if (resp.status === 200 && resp.data.success === true) {
        fetchAllMovieByCinema();
      }
    } catch (error) {
      console.log("Error toggling Availability", error);
    }
  };

  const toggleClassModal = () => {
    setAddDate(!addDate);
    if (!addDate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  useEffect(() => {
    fetchAllMovieByCinema();
  }, []);

  return (
    <div className="max-h-screen w-full  pt-2 pb-20 lg:pb-20">
      {/* date form */}
      {addDate && <DateForm closeDateForm={toggleClassModal} />}

      <div className="flex flex-row items-center justify-between w-[90%] m-auto">
        {/* <AddMovie fetchAllMovieByCinema={fetchAllMovieByCinema} /> */}
        <div className="text-center text-xl font-bold mb-4">
          See all movies created by your theatre(s)
        </div>
      </div>
      <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Thumbnail</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Genre</th>
            <th className="p-2 border">IsAvailable</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center p-3">
                <Skeleton />
              </td>
            </tr>
          ) : displayedMovie?.length > 0 ? (
            displayedMovie.map((movie) => (
              <tr key={movie._id} className="hover:bg-gray-100">
                <td className="p-2 border flex justify-center items-center">
                  <img
                    src={movie.banner.url}
                    alt={movie.title}
                    className="w-[80px]"
                  />
                </td>
                <td className="p-2 border font-semibold">{movie.title}</td>
                <td className="p-2 border">{movie.genre}</td>
                <td className="p-2 border relative">
                  <div
                    className={`size-3 absolute top-[50%] left-[50%] rounded-full ${
                      movie.isAvailable
                        ? "bg-green-500"
                        : "bg-red-500 filter drop-shadow-2xl"
                    }`}
                  ></div>
                </td>
                <td className="p-2 border">
                  <select
                    className="border p-1"
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="">Select an option</option>
                    <option value={`add-${movie._id}`}>Add date & time</option>
                    <option value={`view-${movie._id}`}>View</option>
                    <option value={`toggleAvailability-${movie._id}`}>
                      Toggle-Availability
                    </option>
                    <option value={`edit-${movie._id}`}>Edit</option>
                    <option value={`delete-${movie._id}`}>Delete</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center p-3">
                No Information to display. Add a new Movie
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center w-[90%] m-auto mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieManagement;
