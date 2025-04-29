import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = ({movie}) => {
  return (
    <div>
      <div className='min-w-[180px]'>
        <img
          className='p-2'
          src={IMG_CDN + movie?.poster_path } 
          alt="movie poster"
        />
      </div>
    </div>
  )
}

export default MovieCard