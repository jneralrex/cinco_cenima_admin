import React, { useContext } from 'react'
import VerifyOtp from '../../../auth/VerifyOtp.jsx';
import { GlobalController } from '../Global.jsx';

const ConfirmOtp = () => {
  const {addVerifyOtp, setVerifyOtp} = useContext(GlobalController);

    const toggleVerifyOtp = () => {
        setVerifyOtp(!addVerifyOtp);
        if (!addVerifyOtp) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };
  return (
    <div className='mb-1'>
    <button onClick={toggleVerifyOtp} className='bg-purple-500 p-2 rounded-lg text-white'>
      Verify Otp
    </button>
    {addVerifyOtp && <VerifyOtp closeVerifyOtp={toggleVerifyOtp} />}
</div>  )
} 
export default ConfirmOtp