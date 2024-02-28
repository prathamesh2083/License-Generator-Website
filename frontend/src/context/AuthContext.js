import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 
export const AuthContext =createContext("");

export default function AuthContextProvider({children}){
    const[loading,setloading]=useState(false);
    const [token,settoken]=useState(localStorage.getItem("token"));
    const storetokenInLS=(servertoken)=>{
      settoken(servertoken);
      return localStorage.setItem("token",servertoken);
    };
    
    const isLoggedUser=token?true:false;
    const logoutUser=()=>{
      settoken("");
      return localStorage.removeItem("token");
        
    }

    const [User, setUser] = useState({
      Name:"",
      email:"",
      address:"",
      birthDate:"",
      phone:"",
      gender:"",
      password:"",
      profileImage:"",
      age:"",
      licenseImage:""
    });
    useEffect(()=>{
if(token){
       const user = jwtDecode(token); // decode your token here
       setUser(user);
    }
    },[token])
    
   
    
    const state = {
      loading,User,setloading,storetokenInLS,isLoggedUser,logoutUser,setUser
    };
    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}