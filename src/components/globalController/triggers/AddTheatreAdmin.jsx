import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import TheatreAdminForm from '../forms/TheatreAdminForm.jsx';

const AddTheatreAdmin = () => {
    const {addTheatreAdmin, setAddTheatreAdmin} = useContext(GlobalController);
    const toggleLoginModal = () => {
        setAddTheatreAdmin(!addTheatreAdmin);
        if (!addTheatreAdmin) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };
  return (
    <div className='mb-1'>
    <button onClick={toggleLoginModal} className='bg-purple-500 p-2 rounded-lg text-white'>
      Add Theatre Admin
    </button>
    {addTheatreAdmin && <TheatreAdminForm closeEventForm={toggleLoginModal} />}
</div>  )
} 

export default AddTheatreAdmin