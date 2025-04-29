import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackGround from './VideoBackGround'
import { useSelector } from 'react-redux'

const MainContainer = () => {

    const movies = useSelector((store)=>store?.movies?.nowPlayingMovies);

    // resolving - null first time - early return
    if(!movies) return;

    const mainMovie = movies[1]
    // console.log(mainMovie);

    // destructuring data
    const {original_title, overview, id} = mainMovie

  return (
    <div>
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBackGround movieId={id} />
    </div>
  )
}

export default MainContainer