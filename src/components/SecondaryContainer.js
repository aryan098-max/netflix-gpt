import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  // subscribe to the movie store
  const movies = useSelector((store)=>store?.movies)
  // console.log(movies);

  return  (
    // resolving map null issue with this - movies.nowPlayingMovies - exists then run
    (movies.nowPlayingMovies && movies.popularMovies && movies.topRatedMovies) && 
    <div className='bg-black'>
      <div className='-mt-52 relative pl-8 z-10'>
       <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
        <MovieList title={"Top Rated"} movies={movies?.topRatedMovies}/>
        <MovieList title={"Popular"} movies={movies?.popularMovies}/>
        <MovieList title={"Horror"} movies={movies?.nowPlayingMovies}/>
        <MovieList title={"Romance"} movies={movies?.nowPlayingMovies}/>
      </div>
    </div>
  )
}

export default SecondaryContainer