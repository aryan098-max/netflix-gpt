# Netflix - GPT 

- Create react app
- Config tailwindcss form the official website of tailwind - create react app 
- Install React router - npm i -D react-router
- Header
- Ruouting of App
- Login Form/ Sign In
- Sign up Form
- Formik Library for form 
- Form Validation - Regex for Form Validation
- useRef() hook
- FireBase - For Authentication - firebase.google.com - Chose Firebase Hosting option
    - Firebase Config required - Connect to Database - # npm install firebase
    - firebase.json and .firebaserc (created)
    - For Hosting - Command: # npm install -g firebase-tools
    - Authentication 
    # Command: Firebase Login (Login Using Your Credentials)
    - firebase init (initalized the firebase) - ## (whole process) Gives firebase.json, firbase.rc 
        - # Chose Deployment method - Press Space Bar to Select the below option 
        -  Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
            - # Further Questions 
            - use an existing project 
            - chose the correct project - from the list 
            - # Further Options 
            - What do you want to use as your build directory?
                - Type build  - (similar to dist in parcel stores all the production ready files)
                - Configure as a single-page app - N
                - Set up automatic builds and deploys with GitHub? - N 

        - Command: npm run build (Command) - command tells firebase to deploy using the build folder 
        # Problem while doing this -'react-scripts' is not recognized as an internal or external command,
        - Solution - Commands - # npm install react-scripts -save 
        - builds the production build 
        - build folder is created 
        - contains code of the React app 

        - Command For Deployment 
         - firebase deploy

        - Setting Domain Name - Using Fire Box 
            - Go to Hosting 
                - Add custom domain (You can deploy your app)

- Create SignUp User Account
    - Serach firebase authentication 
        - Navigate through and find web 
            - Chose Password Authentication
                - API - createUserWithEmailAndPassword
                - Use Web modular API
                - getAuth() - method used everywhere - making it central
                    - # Note - Add this getAuth() - firebase.js - import {getAuth} from "firebase/auth"
                    - export const auth = getAuth(); - use it everywhere now
                - Access token returned - after successful SingUp & Login
                
- Create Redux Store - Install two libraries - Add user to the redux store
    - Command # npm install react-redux, npm install -D @reduxjs/toolkit
    - Adding - onAuthStateChange() use this API ? - Don't want to call - useDispatch() multiple times - acts like # event listener
    # Note = Userlogs In - call - useDispatch(), Userlogs Out - call - useDispatch(), UserSings In - call - useDispatch()
    - Must use onAuthSateChange() - inisde the root level - Body or App
    - Call it only once - therefore, using useEffect() - useDispatch() will be called once
    - After logging , Signing up completes - useNavigate() hook - to navigate to a different page

- Sign Out Feature
     - Use SignOut() Api from - Firebase - Password Authentication   

- Display User's Name - Update a user's profile
    - Use updateProfile() Api from - Firebase - Manage Users
    - Reloading the page removes the data from - Redux Store
    - Therefore, must dispatch - addUser() at - Login and Body.js 
    - After every page reload onAuthStateChaged() - runs - populates the Redux Store

- Detach listener when component unmounts - unSubscribe to the onAuthStateChanged callback
- Fetch Movies From - TMD Movies
- Addded Hardcoded values into constants.js file





# Features 

- Login/Sign up 
    - Sign In / Sign up Form 
    - redirect to Browser Page 

- Browse (after authentication)
    - Header 
    - Main Movie
        - Trailer in Background 
        - Title & Description 
        - Movie Suggestions 
            - MovieLists * N

- Netflix GPT 
    - Search Bar 
    - Movie Suggestions 