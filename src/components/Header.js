import { useNavigate } from "react-router";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import {changeLanguage} from "../utils/configSlice";

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector((store)=> store?.user)
  const showGptSearch = useSelector((store)=>store?.gpt.showGptSearch)
  const dispatch = useDispatch();

  const handleSignOut = () =>{
    signOut (auth).then(() => {
      // signOut() only kills the session.
      //  navigate("/");  // - it is handled by onAuthStateChanged()

    }).catch((error) => {
      // error 
      navigate("/error");
    });
  }

  // Togginling GPT Search Box
  const handleGptSearchClick = ()=>{
      dispatch(toggleGPTSearchView())
  }

  // Language Selection 

  const handleLanguageChange = (e) =>{
    
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute bg-gradient-to-b from-black to-transparent z-10 w-full flex justify-between">
      <div className="px-12 py-4 ">
        <img
              className="w-[180px] "
              src = {LOGO}
              alt ="logo"
          />
      </div>

     {
      // If user exists then only show this div block
        user && (
        <div className="flex m-2 p-2 items-center">
          { 
               showGptSearch && (
               <select 
                className="m-2 rounded-lg px-1 py-2"
                onClick={handleLanguageChange}
               >
               {/* value must be same as language properties in lang obj */}
               {
                 SUPPORTED_LANGUAGES.map((lang)=> <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
               }
             </select>
               )}
         
          <button 
            className="bg-purple-800 text-white rounded-lg hover:underline cursor-pointer px-2 py-2 mr-2"
            onClick={handleGptSearchClick}
          >{showGptSearch? "HomePage" : "GPTSearch" }  </button>

          <button
            className="font-bold bg-red-600 px-2 py-2 mr-1 rounded-lg text-black hover:underline cursor-pointer"
            onClick={handleSignOut}
          > 
            Sign Out</button>

            <img
              className="w-[55px] h-[50px] my-1 p-1 rounded-lg mr-1"
              src = {user?.photoURL}
              alt="icon"
          />
         </div>
        )
     } 
    </div>
  )
}

export default Header