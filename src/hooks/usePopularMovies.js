import { API_OPTIONS } from '../utils/constants'
import { addPopularMovies} from "../utils/movieSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const usePopularMovies = () =>{

// Fetch Data from TMBD API and update store
  const dispatch = useDispatch();

// Suscribing to the Store - prevent unncessary api calls
const popularMovies = useSelector((store)=>store?.movies?.popularMovies)

  const getPopularMovies = async ()=>{
    const data = await fetch ('https://api.themoviedb.org/3/movie/popular', API_OPTIONS);
    const json = await data.json();
    // console.log(json.results);

    dispatch(addPopularMovies(json.results))
    
  }
  useEffect(()=>{
    !popularMovies && getPopularMovies();
  },[])
}

export default usePopularMovies;