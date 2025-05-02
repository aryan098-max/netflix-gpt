import React,{useRef} from 'react';
import lang from '../utils/languageConstant';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addMovieResults } from '../utils/gptSlice';

const GptSearchBar = () => {

    const dispatch = useDispatch();

    // useRef for input box - returns - {current:null}
    const searchText = useRef(null)

    // suscribing to the redux store
    const preferedLan = useSelector((store)=>store.config.lang);

    // search movie in TMBD - async funtion returns promise 
    const searchMovieTMBD = async (movie) =>{

        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ 
          movie +"&include_adult=false&language=en-US&page=1", API_OPTIONS);
        const json = await data.json();
        return json.results;
    }


    const handleGptSearchBarClick = async ()=>{

        console.log(searchText.current.value);

        // ========================= Don't use this =====================================>
        // const gptQuery = "Act as a movie recommendation system and suggest some movies for the query :" 
        // + searchText.current.value + 
        // ". only give me name of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Shole, Don, Golmal, Housefull ";

        // openai.chat - This openai - coming from - openai.js
        // const gptResults = await openai.chat.completions.create({
        //     messages: [{ role: 'user', content: gptQuery }],
        //     model: 'gpt-3.5-turbo',
        //   });
        
        // returns array of movies
        // console.log(gptResults.choices?.[0]?.message?.content);
        // const gptMovies = gptResults.choices?.[0]?.message?.content?.split(","); 
        // ============================ Costs Money : Make Dummy Data ==================> 

        // array of movies
        const gptMovies = ["Dunkirk", "The Equalizer", "Black Hawk Down"]
        
        // For each movie - search TMBD api - 5 promises are returned
        const promiseArray = gptMovies.map((movie)=>searchMovieTMBD(movie));
        const tmbdMovies = await Promise.all(promiseArray);

        // dispatching an action using same action for multiple states, passing an obk - destructure it later
        dispatch(addMovieResults({gptSearchResults:gptMovies , tmdbSearchResults:tmbdMovies}));
    }

  return (
    <div>
        <div className='flex justify-center relative transfrom top-52 left-1/2 -translate-x-1/2 -translate-y-1/2'>   
            <form onSubmit={(e)=>e.preventDefault()} className='bg-black/80 rounded-lg p-4 grid grid-cols-12 w-[1000px]'> 
                <input
                    ref={searchText}
                    className='m-2 p-3 rounded-lg col-span-9'                    
                    type='text' 
                    placeholder={lang[preferedLan].gptSearchPlaceHolder}
                />
               <button 
                  className='bg-red-700 rounded-lg m-2 col-span-3 text-white'
                  onClick={handleGptSearchBarClick}
                >{lang[preferedLan].search}
               </button>
            </form>
        </div>
    </div>
  )
}

export default GptSearchBar