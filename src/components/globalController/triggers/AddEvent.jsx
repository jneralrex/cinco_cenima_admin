import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import EventForm from '../forms/EventForm.jsx';

const AddEvent = () => {
    const {addEvent, setAddEvent} = useContext(GlobalController);
    const toggleLoginModal = () => {
        setAddEvent(!addEvent);
        if (!addEvent) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };
  return (
    <div className='mb-1'>
    <button onClick={toggleLoginModal} className='bg-purple-500 p-2 rounded-lg text-white'>
      Add Event
    </button>
    {addEvent && <EventForm closeEventForm={toggleLoginModal} />}
</div>  )
} 

export default AddEvent