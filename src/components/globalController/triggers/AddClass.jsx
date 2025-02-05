import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import ClassForm from '../forms/ClassForm'

const AddClass = () => {
    const { addClass, setAddClass } = useContext(GlobalController);

    const toggleClassModal = () => {
        setAddClass(!addClass);
        if (!addClass) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
  return (
    <div>
        <button onClick={toggleClassModal} className='bg-purple-500 p-2 rounded-lg text-white'>
            Add Class
        </button>
        {addClass && <ClassForm closeClassForm={toggleClassModal} />}
    </div>
  )
}

export default AddClass