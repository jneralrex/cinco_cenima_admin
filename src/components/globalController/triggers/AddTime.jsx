import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import TimeForm from '../forms/TimeForm';

const AddTime = () => {
    const { addTime, setAddTime } = useContext(GlobalController);

    const toggleClassModal = () => {
        setAddTime(!addTime);
        if (!addTime) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
  return (
    <div>
        <button onClick={toggleClassModal} className='bg-purple-500 p-2 rounded-lg text-white'>
            Add Time
        </button>
        {addTime && <TimeForm closeTimeForm={toggleClassModal} />}
    </div>
  )
}

export default AddTime