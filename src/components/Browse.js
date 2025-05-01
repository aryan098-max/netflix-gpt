import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {

  // Subscribing to the gpt Store 
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)

  // calling custom hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();

  return (
    <div>
     <Header/>
     {showGptSearch ? <GptSearch/>: 
      <>
        <MainContainer/>
        <SecondaryContainer/>
      </>
     }
     
    </div>
  )
}

export default Browse