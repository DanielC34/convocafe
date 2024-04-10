import axios from 'axios';

//User and auth routes

//Sign in 
export const signin = (user) => {
    return axios.post("http://localhost:3001/api/signin", JSON.stringify(user), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((response) => {
        return response.data; //returns response data
    }).catch((error) => {
        return error.response.data; //returns error response data
    })
};

//Sign Up
export const signup = (user) => {
    //Api call to sign up a user
    return axios.post("http://localhost:3001/api/signup", JSON.stringify(user), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((response) => {
        return response.data; //returns response data
    }).catch((error) => {
        return error.response.data; //returns error response data
    });
};

//Setting the JWT token in user's browser
export const authenticate = (data, next) => {
    //Storing JWT token in user's browser
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

//Sign out (removing JWT token)
export const signout = (next) => {
    //Removing JWT token upon signing out
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");

        axios.get("http://localhost:3001/api/signup").then((response) => {
            console.log(response.data);
            next();
        }).catch((error) => console.log(error));
    }
};

//Validation if user is signed in
export const isAuthenticated = () => {
    //Checking if the user is authenticated
    if (typeof window !== "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt"))
        return JSON.parse(localStorage.getItem("jwt"));
    else return false;
};