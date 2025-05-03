import React from 'react'
import GtpSearchBar from "./GptSearchBar"
import GptMovieSuggestions from "./GptMovieSuggestions"
import { BACKGROUND_IMAGE } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
    {/* fixed the problem of vertial overflow */}
    <div className="fixed">
            <img
                className='h-screen md:h-auto object-cover'
                src= {BACKGROUND_IMAGE}
                alt = "bgimage"
            />
    </div>
    <div className=''>
        <GtpSearchBar/>
        <GptMovieSuggestions/>
    </div>
    </>
  )
}

export default GptSearch