import React from 'react'
import GtpSearchBar from "./GptSearchBar"
import GptMovieSuggestions from "./GptMovieSuggestions"
import { BACKGROUND_IMAGE } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
           <div className="absolute">
                <img
                    src= {BACKGROUND_IMAGE}
                    alt = "bgimage"
                />
            </div>
        <GtpSearchBar/>
        <GptMovieSuggestions/>

    </div>
  )
}

export default GptSearch