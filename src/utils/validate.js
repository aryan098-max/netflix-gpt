// Note: Returning a string means emailId and password is not valid; null means it is valid;

export const validateSignInData = (email, password) =>{

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s]))\S{8,20}$/.test(password);


    // if email is not valid return - strin (Email & password is not valid)
    if(!isEmailValid) return "Email ID is not valid";
    if(!isPasswordValid) return "Password is not valid";

    // It means there is no error; however, if there is any string inside it is not valid.
    return null;
}

export const validateSignUpData = (UserName, email, password) =>{

    // Regex has a method test()
    const isUserNameValid = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(UserName);
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s]))\S{8,20}$/.test(password);


    // if email is not valid return - strin (Email & password is not valid)
    if(!isUserNameValid) return "UserName is not valid";
    if(!isEmailValid) return "Email ID is not valid";
    if(!isPasswordValid) return "Password is not valid";

    // It means there is no error; however, if there is any string inside it is not valid.
    return null;
}