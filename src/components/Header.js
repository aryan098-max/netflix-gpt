import { useNavigate } from "react-router";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import {changeLanguage} from "../utils/configSlice";
import { useState } from "react";
import { Menu } from "lucide-react"; // Lucide icon


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
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
    <div className="absolute md:justify-between flex flex-col md:flex-row bg-gradient-to-b from-black to-transparent z-10 w-full ">

      {/* Logo + Hamburger for small screens */}
        <div className="px-6 py-4 flex justify-between w-full md:w-auto">
        <img className="w-[100px] md:w-[180px]"  src={LOGO} alt="logo" />
        {
          user && (
            <button className="md:hidden text-white"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu className="w-5 h-5" />
            </button>
          )
        }
      </div>

      {/* Menu section for user options */}
      {
        user && (
          <div className={`flex-col items-center md:flex md:flex-row m-[-35px] md:m-2 p-2 ${showMenu ? "flex" : "hidden"} md:!flex`}>
            
            {showGptSearch && (
              <select 
                className=" md:m-2 rounded-lg px-1 py-2 "
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            
            <button
              className="bg-purple-800 text-white rounded-lg hover:underline cursor-pointer text-sm md:text-lg px-1 py-1 md:px-2 md:py-2 my-2 md:mr-2"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "HomePage" : "GPTSearch"}
            </button>

            <button
              className="text-sm md:text-lg md:font-bold bg-red-600 px-1 py-1 md:px-2 md:py-2 mr-1 rounded-lg text-black hover:underline cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>

            <img
              className="hidden md:inline-block w-[55px] h-[50px] my-1 p-1 rounded-lg mr-1"
              src={user?.photoURL}
              alt="icon"
            />
          </div>
        )
      }
    </div>
  );
}

export default Header