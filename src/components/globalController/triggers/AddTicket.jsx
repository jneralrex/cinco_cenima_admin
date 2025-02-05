import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import TicketForm from '../forms/TicketForm';

const AddTicket = () => {
    const {addTicket, setAddTicket} = useContext(GlobalController);
    const toggleTicketModal = () => {
        setAddTicket(!addTicket);
        if (!addTicket) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };
  return (
    <div className='mb-1'>
    <button onClick={toggleTicketModal} className='bg-purple-500 p-2 rounded-lg text-white'>
      Add Ticket
    </button>
    {addTicket && <TicketForm closeTicketForm={toggleTicketModal} />}
</div>  )
}

export default AddTicket