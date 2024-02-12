import React from "react";

import html2canvas from "html2canvas";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Test from "./Test";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Login" element={<Login></Login>}></Route>
          <Route path="/Register" element={<Register></Register>}></Route>
          {/* <PrivateRoute path="/Test" Component={Test}></PrivateRoute> */}
          <Route element={<PrivateRoute />}>

              <Route element={<Test />} path="/test" />
            
          </Route>
          {/* <Route path="/Profile" element={Profile}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}
