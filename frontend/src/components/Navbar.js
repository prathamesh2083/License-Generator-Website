import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import profile from "../images/myprofile.png";
import logo from "../images/logo.png";
export default function Navbar() {
  

  return (
    <div id="navbar">
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

              <li class="nav-item mx-4">
                <Link class=" hover-underline-animation nav-link " to="/Login">
                  Login
                </Link>
              </li>
              <li class="nav-item mx-4">
                <Link
                  class=" hover-underline-animation nav-link "
                  to="/Register"
                >
                  Register
                </Link>
              </li>
              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={profile} style={{width:"40px",borderRadius:"50%"}}></img>
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
