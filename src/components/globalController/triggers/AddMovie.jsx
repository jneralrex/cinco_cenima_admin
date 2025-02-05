import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import MoviesForm from '../forms/MoviesForm.jsx';

const AddMovie = () => {
    const {addMovie, setAddMovie} = useContext(GlobalController);
    const toggleMovieModal = () => {
        setAddMovie(!addMovie);
        if (!addMovie) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };
  return (
    <div className='mb-1'>
    <button onClick={toggleMovieModal} className='bg-purple-500 p-2 rounded-lg text-white'>
      Add Movie
    </button>
    {addMovie && <MoviesForm closeMovieForm={toggleMovieModal} />}
</div>  )
} 
export default AddMovie