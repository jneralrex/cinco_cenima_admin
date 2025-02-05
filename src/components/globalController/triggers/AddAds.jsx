import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import AdsForm from '../forms/AdsForm';

const AddAds = () => {
    const {addAds, setAddAds} = useContext(GlobalController);
    const toggleAdsModal = () => {
        setAddAds(!addAds);
        if (!addAds) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };
  return (
    <div>
    <button onClick={toggleAdsModal} className='bg-purple-500 p-2 rounded-lg text-white'>
      Add Ads
    </button>
    {addAds && <AdsForm closeAdsForm={toggleAdsModal} />}
    </div>
)
}

export default AddAds