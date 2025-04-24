import Header from "./Header";
import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
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
                <form className=" text-white">
                    <h1 className="text-3xl font-bold py-4">{isSignInForm? "Sign In" : "Sign Up"}</h1>
                    { 
                        !isSignInForm && 
                        (<input className="p-4 my-3 w-full rounded-lg bg-black/50 border border-white" placeholder="UserName" type="textarea"/>)

                    }

                    <input className="p-4 my-3 w-full rounded-lg bg-black/50 border border-white" placeholder="Email Address" type="textarea"/>
                    <input className="p-4 my-3 w-full rounded-lg bg-black/50  border border-white" placeholder="Password" type="textarea"/>
                    <button className="p-3 my-2 bg-red-700 w-full rounded-lg">Sign In</button>
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