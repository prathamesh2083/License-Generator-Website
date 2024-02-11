import React from 'react'

import html2canvas from "html2canvas";
import Navbar from './Navbar';
import {Router,Route,Routes} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Test from './Test';
import Profile from './Profile';
export default function App() {
  
  
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/Login" Component={Login}></Route>
        <Route path="/Register" Component={Register}></Route>
        <Route path="/Test" Component={Test}></Route>
        <Route path="/Profile" Component={Profile}></Route>
      </Routes>
    </div>
  );
}
