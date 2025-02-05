import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import ScreenForm from '../forms/ScreenForm.jsx';

const AddScreen = () => {
    const {addScreen, setAddScreen} = useContext(GlobalController);
    const toggleScreenModal = () => {
        setAddScreen(!addScreen);
        if (!addScreen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };
  return (
    <div className='mb-1'>
    <button onClick={toggleScreenModal} className='bg-purple-500 p-2 rounded-lg text-white'>
      Add Screen
    </button>
    {addScreen && <ScreenForm closeScreenForm={toggleScreenModal} />}
</div>  )
} 

export default AddScreen