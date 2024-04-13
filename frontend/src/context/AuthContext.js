import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext("");

export default function AuthContextProvider({ children }) {
  const [loading, setloading] = useState(false);
  const [token, settoken] = useState(localStorage.getItem("token"));
  const storetokenInLS = (servertoken) => {
    settoken(servertoken);
    return localStorage.setItem("token", servertoken);
  };

  const isLoggedUser = token ? true : false;
  const logoutUser = () => {
    settoken("");
    return localStorage.removeItem("token");
  };
 const[validLicense,setvalidLicense]=useState(false);
  const [User, setUser] = useState({
    Name: "",
    email: "",
   
   
    profileImage: "",
   
    
    id: "",
  });
  useEffect(() => {
    if (token) {
      const user = jwtDecode(token); // decode your token here
      console.log(user);
    
      setUser((prev) => {
        return { ...prev, email: user.email,id:user._id,name:user.name};
      });
    
    }
  }, []);

  const state = {
    loading,
    User,
    setloading,
    storetokenInLS,
    isLoggedUser,
    logoutUser,
    setUser,
    validLicense,
    setvalidLicense
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
