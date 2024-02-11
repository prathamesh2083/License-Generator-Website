import React, { createContext, useState } from "react";

export const AuthContext =createContext("");

export default function AuthContextProvider({children}){
    const[loading,setloading]=useState(false);
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
      loading,User,setloading
    };
    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}