import React, { useContext, useEffect } from "react";
import { Route, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const PrivateRoute = () => {
  const { isLoggedUser } = useContext(AuthContext);
 
  return isLoggedUser ? <Outlet /> : <Navigate to="/Login" />;
};
export default PrivateRoute;
