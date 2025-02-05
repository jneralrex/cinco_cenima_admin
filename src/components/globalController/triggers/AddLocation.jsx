import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import LocationForm from '../forms/LocationForm';

const AddLocation = () => {
const {addLocation, setAddLocation} = useContext(GlobalController);
const toggleLocationModal = () => {
    setAddLocation(!addLocation);
    if (!addLocation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  return (
<div>
<button onClick={toggleLocationModal} className='bg-purple-500 p-2 rounded-lg text-white'>
  Add Location
</button>
{addLocation && <LocationForm closeLocationForm={toggleLocationModal} />}
</div>  )
}

export default AddLocation