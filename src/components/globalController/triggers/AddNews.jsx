import React, { useContext } from 'react'
import { GlobalController } from '../Global';
import NewsForm from '../forms/NewsForm';

const AddNews = () => {
    const {addNews, setAddNews} = useContext(GlobalController);
    const toggleNewsModal = () => {
        setAddNews(!addNews);
        if (!addNews) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
  return (
  <div>
    <button onClick={toggleNewsModal} className='bg-purple-500 p-2 rounded-lg text-white'>
        Add News
    </button>
    {addNews && <NewsForm closeNewsForm={toggleNewsModal} />}
  </div>
  )
}

export default AddNews