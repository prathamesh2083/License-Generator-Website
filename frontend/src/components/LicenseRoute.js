import React, { useContext, useEffect } from "react";
import { Route, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const PrivateRoute = () => {
  const { isLoggedUser, validLicense } = useContext(AuthContext);

  return (isLoggedUser && validLicense) ? <Outlet /> : <Navigate to="/Test" />;
};
export default PrivateRoute;
