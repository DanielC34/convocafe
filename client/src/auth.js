import axios from "axios";

//USER AND AUTH ROUTES

//SIGNIN
export const signin = async (user) => {
  try {
    const response = await axios.post("http://localhost:8000/api/signin", user);
    return response.data;
  } catch (error) {
    console.error("Signin error:", error);
    throw error; // Throw the error to be handled by calling code
  }
};

// SIGNUP
export const signup = async (user) => {
  try {
    const response = await axios.post("http://localhost:8000/api/signup", user);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response.data);
    throw error; // Throw the error to be handled by calling code
  }
};

//SETTING THE JWT TOKEN IN USER'S BROWSER
export const authenticate = (data, next) => {
  // Storing JWT token in user's browser
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data.token));
    if (next && typeof next === "function") {
      next();
    }
  }
};


// SIGNOUT -> REMOVING JWT TOKEN
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next && next();

    try {
      const response = axios.get("http://localhost:8000/api/signout")
      console.log(response.data)
    } catch (err) {
      console.log("Error signing out: ", err);
    }
  }
};

//VALIDATION IF USER IS SIGNED IN
export const isAuthenticated = () => {
  // Checking if the user is authenticated
  if (typeof window === "undefined") {
    return null;
  }
  const token = localStorage.getItem("jwt");
  return token ? token : null;
};
