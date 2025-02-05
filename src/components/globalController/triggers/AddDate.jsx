import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import DateForm from '../forms/DateForm';

const AddDate = () => {
    const { addDate, setAddDate } = useContext(GlobalController);

    const toggleClassModal = () => {
        setAddDate(!addDate);
        if (!addDate) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
  return (
    <div>
        <button onClick={toggleClassModal} className='bg-purple-500 p-2 rounded-lg text-white'>
            Add Date
        </button>
        {addDate && <DateForm closeDateForm={toggleClassModal} />}
    </div>
  )
}

export default AddDate