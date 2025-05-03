import Header from "./Header";
import { useState, useRef } from "react";
import { Link} from "react-router";
import { validateSignInData,validateSignUpData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";
import { BACKGROUND_IMAGE } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();

    // creating reference - useRef() - returns obj - {current:null} - refer it to input - email.current -> point to input
    // Next, access value - email.current.value - gives value of the input box
    const email = useRef(null);
    const password = useRef(null);
    const UserName = useRef(null);


    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);

        // clearing the error message when switching forms 
        setErrorMessage("");

        // clearing the email and password when switching forms - .value (access input box and clears the value)
        email.current.value = "";
        password.current.value = "";
       if(UserName.current) UserName.current.value = ""; // if UserName.current exists - only set = ""
    }

    const handleButtonClick = ()=>{
        // Validate Form Data - Utliity - declaring message as global 
        
        let message = "";
        if (!isSignInForm) {
            // undefined? - the firest argument is for userName 
          message = validateSignUpData( UserName.current.value, email.current.value, password.current.value,);
        } else {
            message = validateSignInData(email.current.value, password.current.value);
        }
        setErrorMessage(message);


       // Next, handle signIn , SignUp - If the form data is correct - validate.js - returns null 
       // Error message presents - return - don't do anything - Early Return
       if(message) return;

       // For signed and not signedIn 

       if(!isSignInForm){
        // returns a promise - handled by then (resolve), error (catch)- creates user in firebase
        // Check API call from Network Tab - Fetch 
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                
                // Update a user's profile - run only once
                updateProfile(auth.currentUser, {
                    // updating displayname and photoURL
                    displayName: UserName.current.value, 
                    photoURL: USER_AVATAR,
                  })
                  .then(() => {
                    // Dispatching an action - to update store
                    // navigate("/browser") // - Inside onAuth()
                    const {uid, email, displayName, photoURL} = auth.currentUser

                    dispatch(addUser({
                        uid:uid,
                        email:email,
                        displayName:displayName,
                        photoURL:photoURL
                    }))

                  }).catch((error) => {
                    setErrorMessage(error.message);
                  });
                  
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage);
            }); 

       } else {
       
        // Sing In logic 
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    
                // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+"-"+errorMessage);
                });
             }
    }

    return(
        <div>
            <Header/>
            <div className="absolute">
                <img
                    className="h-screen object-cover md:h-auto"
                    src= {BACKGROUND_IMAGE}
                    alt = "bgimage"
                />
            </div>

            <div className= "w-10/12 md:w-3/12 p-8 md:p-12 bg-black/80 absolute left-1/2 md:top-1/2 top-[35%] transfrom -translate-x-1/2 -translate-y-1/2">
                <form className=" text-white" onSubmit={(e)=>{e.preventDefault()}}>
                    
                    <h1 className="text-xl md:text-3xl font-bold py-2 md:py-4">{isSignInForm? "Sign In" : "Sign Up"}</h1>

                    { 
                        !isSignInForm && 
                        (<input
                             ref={UserName}
                             className="p-2 md:p-4 my-2 md:my-3 w-full rounded-lg bg-black/50 border border-white text-sm md:text-lg" 
                             placeholder="UserName" 
                             type="textarea"/>
                             
                        )
                    }

                    <input 
                        ref={email}
                        className="p-3 my-2 md:p-4 md:my-3 w-full rounded-lg bg-black/50 border border-white text-sm md:text-lg" 
                        placeholder="Email Address" 
                        type="email"
                    />
                    <input 
                        ref={password}
                        className="p-3 mt-2 mb-0  md:p-4 md:my-3 w-full rounded-lg bg-black/50  border border-white text-sm md:text-lg" 
                        placeholder="Password"
                        type="password"
                    />

                    <p className="text-red-500 font-bold py-2">{errorMessage}</p>

                    <button 
                        className="p-2 my-1 md:p-3 md:my-1 bg-red-700 w-full rounded-lg text-sm md:text-lg" 
                        onClick={handleButtonClick}>
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <div className="flex py-4">
                    {
                        isSignInForm ? (
                            <div className="flex gap-2">
                            <h1 className="text-sm md:text-[16px]">New to Netflix?</h1>
                            <h1 onClick={toggleSignInForm} className="hover:underline cursor-pointer text-sm md:text-[16px] font-bold ">
                                <Link>Sign up now</Link>
                            </h1>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                            <h1 className="text-sm  md:text-[16px]">Already have an account?</h1>
                            <h1 onClick={toggleSignInForm} className="hover:underline cursor-pointer font-bold text-sm md:text-[16px]">
                                <Link>Sign in now</Link>
                            </h1>
                            </div>
                        )
                    } 
                    </div>
                    
                </form>
            </div>
               
        </div>
    )
}

export default Login;