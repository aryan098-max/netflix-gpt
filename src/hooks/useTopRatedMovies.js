import { API_OPTIONS } from '../utils/constants'
import { addTopRatedMovies} from "../utils/movieSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const useTopRatedMovies = () =>{

  // Fetch Data from TMBD API and update store
  const dispatch = useDispatch();

  // Suscribing to the Store - prevent unncessary api calls
  const topRatedMovies = useSelector((store)=>store?.movies?.topRatedMovies)

  const getTopRatedMovies = async ()=>{
    const data = await fetch ('https://api.themoviedb.org/3/movie/top_rated', API_OPTIONS);
    const json = await data.json();
    // console.log(json.results);

    dispatch(addTopRatedMovies(json.results))
    
  }
  useEffect(()=>{
   !topRatedMovies && getTopRatedMovies();
  },[])
}

export default useTopRatedMovies;