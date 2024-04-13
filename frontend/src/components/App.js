import React from "react";

import html2canvas from "html2canvas";
import Navbar from "./Navbar";
import {  Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Test from "./Test";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import EnterOtp from "./EnterOtp";
import Certificate from "./Certificate";
import LicenseRoute from "./LicenseRoute";
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>

        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/Register" element={<Register></Register>}></Route>

       
       
        <Route element={<PrivateRoute />}>
          <Route
            path="/Certificate"
            element={<Certificate></Certificate>}
          ></Route>
          <Route element={<Test />} path="/Test" />
        </Route>
        <Route path="/EnterOtp" element={<EnterOtp></EnterOtp>}></Route>
      </Routes>
    </div>
  );
}
