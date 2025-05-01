import React from 'react';
import lang from '../utils/languageConstant';
import { useSelector } from 'react-redux';

const GptSearchBar = () => {

    const preferedLan = useSelector((store)=>store.config.lang)

  return (
    <div>
        <div className='flex justify-center absolute transfrom top-52 left-1/2 -translate-x-1/2 -translate-y-1/2'>   
            <form onSubmit={(e)=>e.preventDefault()} className='bg-black/80 rounded-lg p-4 grid grid-cols-12 w-[1000px]'> 
                <input
                    className='m-2 p-3 rounded-lg col-span-9'                    
                    type='text' 
                    placeholder={lang[preferedLan].gptSearchPlaceHolder}
                />
                <button className='bg-red-700 rounded-lg m-2 col-span-3 text-white'>{lang[preferedLan].search}</button>
            </form>
        </div>
    </div>
  )
}

export default GptSearchBar