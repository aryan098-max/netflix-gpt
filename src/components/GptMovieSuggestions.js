import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {

  const {gptSearchResults, tmdbSearchResults} = useSelector((store)=>store.gpt);
  
  // early return 
  if(!gptSearchResults) return null;
  console.log(gptSearchResults, tmdbSearchResults)
 
  return (

    
       <div className='p-4 m-4 text-white absolute bg-black/80 w-10/12 md:w-6/12 top-[620px] md:top-[750px] left-1/2 transfrom -translate-x-1/2 -translate-y-1/2'>
       {
          gptSearchResults.map((movieName,index)=>(
            // > tmdbSearchResults[index] - Cause - Array of Array - Rest is handled by MovieList
            <MovieList key={movieName} title={movieName} movies={tmdbSearchResults[index]}/>
          ))
       }
    </div>
  
   
  )
}

export default GptMovieSuggestions