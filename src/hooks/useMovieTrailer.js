import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { addTrailerVideo } from '../utils/movieSlice'
import { useDispatch } from 'react-redux'

const useMovieTrailer = (movieId) =>{

// fetch trailer video and updating the store (movieSlice) with trailer video
  const dispatch = useDispatch()

  // Videos API - fetch movie using - movieId
  const getMovieVideos = async () =>{

    // making fetch dynamic
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer")
    const trailer = filterData.length ? filterData[0] : json.results[0]; 
    dispatch(addTrailerVideo(trailer))
  }

  useEffect(()=>{

    getMovieVideos();

  },[])

}

export default useMovieTrailer;