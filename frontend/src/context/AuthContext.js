import React, { createContext, useState } from "react";

export const AuthContext =createContext("");

export default function AuthContextProvider({children}){
    const[loading,setloading]=useState(false);
    const [token,settoken]=useState(localStorage.getItem("token"));
    const storetokenInLS=(servertoken)=>{
      settoken(servertoken);
      return localStorage.setItem("token",servertoken);
    };
    
    const isLoggedUser=token;
    const logoutUser=()=>{
      settoken("");
      return localStorage.removeItem("token");
        
    }
    const [User, setuser] = useState({
      // name,
      // email,
      // address,
      // birthDate,
      // phone,
      // gender,
      // password,
      // profileImage,
      // age,
      // licenseImage
    });
    
    const state = {
      loading,User,setloading,storetokenInLS,isLoggedUser,logoutUser
    };
    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}