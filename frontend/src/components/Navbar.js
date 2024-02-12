import React, { useContext } from "react";
import "../styles/Navbar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import profile from "../images/myprofile.png";
import logo from "../images/logo.png";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
export default function Navbar() {
  const Navigate=useNavigate();
  const {isLoggedUser,logoutUser}=useContext(AuthContext);
  const handlelogout=(event)=>{
      logoutUser();
      toast.success("Logout Successfull");
      Navigate("/Login");
  }
  return (
    <div id="navbar">
    <Toaster></Toaster>
      <nav class="navbar navbar-expand-lg px-5 ">
        <div class="container-fluid">
          <div className="Logo">Digital World</div>
          <button
            style={{ margin: "5px" }}
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav">
              <li class="nav-item mx-4">
                <Link class="hover-underline-animation nav-link" to="/">
                  Home
                </Link>
              </li>

              <li class="nav-item mx-4">
                <Link class=" hover-underline-animation nav-link " to="/Test">
                  Give Test
                </Link>
              </li>
              {isLoggedUser ? (
                <li class="nav-item mx-4">
                  <div 
                    onClick={handlelogout}
                    class=" hover-underline-animation nav-link "
                    to="/Login"
                  >
                    Logout
                  </div>
                </li>
              ) : (
                <li class="nav-item mx-4">
                  <Link
                    class=" hover-underline-animation nav-link "
                    to="/Login"
                  >
                    Login
                  </Link>
                </li>
              )}
              {isLoggedUser ? (
                <li></li>
              ) : (
                <li class="nav-item mx-4">
                  <Link
                    class=" hover-underline-animation nav-link "
                    to="/Register"
                  >
                    Register
                  </Link>
                </li>
              )}

              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={profile}
                    style={{ width: "40px", borderRadius: "50%" }}
                  ></img>
                </Link>
                <ul class="dropdown-menu" id="menu">
                  <li>
                    <Link class="dropdown-item" to={"/Profile"}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Update Profile
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Download License
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
