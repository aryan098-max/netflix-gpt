import { useEffect } from "react";
import { Outlet, useNavigate} from "react-router";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";



const Body = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
       const unSubscribe =  onAuthStateChanged(auth, (user) => { // user object passed internall by firebase SDK
            // User is Signed In
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid, email, displayName, photoURL} = user
              dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
        
              // user sings in - navigate to browse page 
              navigate("/browse");
              
            } else {
              // User is signed out
              dispatch(removeUser());

              // user signs out - navigate to main page
              navigate("/");
            }
            return () => unSubscribe();
          });
    },[])

    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default Body;