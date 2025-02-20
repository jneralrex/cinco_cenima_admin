import React from 'react'

const Skeleton = () => {
  return (
    <div className="animate-pulse w-full">
        <div className="w-full flex justify-between items-center py-2 mx-3">
            <div className="w-24 h-4 bg-black bg-opacity-25 rounded"></div>
            <div className="w-32 h-4  bg-black bg-opacity-25 rounded"></div>
            <div className="w-48 h-4  bg-black bg-opacity-25 rounded"></div>
            <div className="w-20 h-4  bg-black bg-opacity-25 rounded"></div>
            <div className="w-4 h-4  bg-black bg-opacity-25 rounded-full"></div>
            <div className="w-24 h-4  bg-black bg-opacity-25 rounded"></div>
        </div>
    </div>
  )
}

export default Skeleton
