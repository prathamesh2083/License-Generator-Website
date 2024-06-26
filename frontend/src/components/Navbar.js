import React, { useContext } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";


import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import  "../styles/Navbar.css";
export default function Navbar() {
  const Navigate=useNavigate();
  const {isLoggedUser,logoutUser,User}=useContext(AuthContext);
  const url = `https://api.dicebear.com/5.x/initials/svg?seed=${User.name}`;
  const handlelogout=(event)=>{
      logoutUser();
      toast.success("Logout Successfull");
      Navigate("/Login");
  }
  return (
    <div >
      <Toaster></Toaster>
      <nav class="navbar navbar-expand-lg px-5 ">
        <div class="container-fluid">
          <div className="Logo bg-blue-500">Digital World</div>
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
              {isLoggedUser ? (
                <li class="nav-item dropdown">
                  <Link
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {isLoggedUser ? (
                      <img
                        src={url}
                        style={{
                          width: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                      ></img>
                    ) : (
                      <div></div>
                    )}
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
                    {User.licenseImage? <li>
                      <a class="dropdown-item" href="#">
                        Download License
                      </a>
                    </li>:<div></div>}
                   
                  </ul>
                </li>
              ) : (
                <div></div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
