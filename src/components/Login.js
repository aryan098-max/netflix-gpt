import Header from "./Header";
import { useState, useRef } from "react";
import { Link} from "react-router";
import { validateSignInData,validateSignUpData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

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
       // Error message presents - return - don't do anything
       if(message) return 

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
                    photoURL: "https://avatars.githubusercontent.com/u/73595473?s=400&u=81cd5ae6c3a65cfaf175d1c41c667c5bed40fcf9&v=4",
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
                    src= "https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_small.jpg"
                    alt = "bgimage"
                />
            </div>

            <div className= "w-3/12 p-12 bg-black/80 absolute left-1/2 top-1/2 transfrom -translate-x-1/2 -translate-y-1/2">
                <form className=" text-white" onSubmit={(e)=>{e.preventDefault()}}>
                    
                    <h1 className="text-3xl font-bold py-4">{isSignInForm? "Sign In" : "Sign Up"}</h1>

                    { 
                        !isSignInForm && 
                        (<input
                             ref={UserName}
                             className="p-4 my-3 w-full rounded-lg bg-black/50 border border-white" 
                             placeholder="UserName" 
                             type="textarea"/>
                             
                        )
                    }

                    <input 
                        ref={email}
                        className="p-4 my-3 w-full rounded-lg bg-black/50 border border-white" 
                        placeholder="Email Address" 
                        type="email"
                    />
                    <input 
                        ref={password}
                        className="p-4 my-3 w-full rounded-lg bg-black/50  border border-white" 
                        placeholder="Password"
                        type="password"
                    />

                    <p className="text-red-500 font-bold py-2">{errorMessage}</p>

                    <button 
                        className="p-3 my-2 bg-red-700 w-full rounded-lg" 
                        onClick={handleButtonClick}>
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <div className="flex gap-2 py-4">
                    {
                        isSignInForm ? (
                            <div className="flex gap-2">
                            <h1>New to Netflix?</h1>
                            <h1 onClick={toggleSignInForm} className="hover:underline cursor-pointer font-bold">
                                <Link>Sign up now</Link>
                            </h1>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                            <h1>Already have an account?</h1>
                            <h1 onClick={toggleSignInForm} className="hover:underline cursor-pointer font-bold">
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