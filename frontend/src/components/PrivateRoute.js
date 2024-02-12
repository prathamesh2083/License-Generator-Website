import React, { useContext } from 'react'
import { Route,Outlet,Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const PrivateRoute=()=> {
    
    const{isLoggedUser}=useContext(AuthContext);
  return (
   
       isLoggedUser? <Outlet/>:<Navigate to="/Login"/>
   
  )
}
export default PrivateRoute;
