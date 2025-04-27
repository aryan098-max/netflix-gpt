import { useNavigate } from "react-router";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector((store)=> store?.user)

  const handleSignOut = () =>{
    signOut (auth).then(() => {
      // signs out - back to Login
        navigate("/");

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
              src = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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