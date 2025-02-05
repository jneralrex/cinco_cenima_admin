import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import TheatreForm from '../forms/TheatreForm.jsx';

const AddTheatre = () => {
    const {addTheatre, setAddTheatre} = useContext(GlobalController);
    const toggleTheatreModal = () => {
        setAddTheatre(!addTheatre);
        if (!addTheatre) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };
  return (
    <div className='mb-1'>
    <button onClick={toggleTheatreModal} className='bg-purple-500 p-2 rounded-lg text-white'>
      Add Theatre
    </button>
    {addTheatre && <TheatreForm closeTheatreForm={toggleTheatreModal} />}
</div>  )
} 
export default AddTheatre