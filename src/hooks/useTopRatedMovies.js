import { API_OPTIONS } from '../utils/constants'
import { addTopRatedMovies} from "../utils/movieSlice";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useTopRatedMovies = () =>{

     // Fetch Data from TMBD API and update store
  const dispatch = useDispatch();

  const getTopRatedMovies = async ()=>{
    const data = await fetch ('https://api.themoviedb.org/3/movie/top_rated', API_OPTIONS);
    const json = await data.json();
    // console.log(json.results);

    dispatch(addTopRatedMovies(json.results))
    
  }
  useEffect(()=>{
    getTopRatedMovies();
  },[])
}

export default useTopRatedMovies;