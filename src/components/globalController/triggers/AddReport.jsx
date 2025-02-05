import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import ReportForm from '../forms/ReportForm';

const AddReport = () => {
    const {addReport, setAddReport} = useContext(GlobalController);
    const toggleReportModal = () => {
        setAddReport(!addReport);
        if (!addReport) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
  return (
    <div>
        <button onClick={toggleReportModal} className='bg-purple-500 p-2 rounded-lg text-white'>
            Add Report
        </button>
        {addReport && <ReportForm closeReportForm={toggleReportModal} />}
    </div>
  )
}

export default AddReport