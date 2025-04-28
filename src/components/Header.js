import { useNavigate } from "react-router";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { LOGO } from "../utils/constants";

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector((store)=> store?.user)

  const handleSignOut = () =>{
    signOut (auth).then(() => {
      // signOut() only kills the session.
      //  navigate("/");  // - it is handled by onAuthStateChanged()

    }).catch((error) => {
      // error 
      navigate("/error");
    });
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


     {/* Display this div - User Signed IN */}

     {
        user && 
        <div className="flex m-2 p-2">
          <img
              className="w-[55px] h-[60px] my-1 p-1 rounded-lg"
              src = {user?.photoURL}
              alt="icon"
          />

          <button
            className="font-bold bg-red-500 px-2 my-4 mx-1 rounded-lg text-black hover:underline cursor-pointer"
            onClick={handleSignOut}
          > 
            Sign Out</button>
         </div>
     } 
    </div>
  )
}

export default Header