import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-full aspect-video pt-[20%] px-24 absolute bg-gradient-to-r from-black">
        <h1 className="text-6xl font-bold text-white">{title}</h1>
        <p className="py-6 text-lg w-1/4 text-white">{overview}</p>

        <div>
            <button className='bg-white px-10 py-4 text-xl text-black rounded-lg hover:bg-opacity-60'>▶Play</button>
            <button className='bg-gray-600 opacity-90 px-10 py-4 text-xl text-white rounded-lg mx-2'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle