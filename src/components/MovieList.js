import React from 'react';
import MovieCard from "./MovieCard"

const MovieList = ({title, movies}) => {

  return (
    <div className='px-4'>
        <h1 className='py-2 text-white text-sm md:text-3xl md:font-bold ml-2'>{title}</h1>
        <div className="flex overflow-x-scroll scrollbar-hidden">
          {
            movies.map((movie)=>
            <MovieCard key={movie?.id} movie={movie}/>
          )}
        </div>
    </div>
  )
}

export default MovieList