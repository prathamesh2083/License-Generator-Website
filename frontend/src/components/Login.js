import React, { useContext } from "react";
import { useState } from "react";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const {storetokenInLS}=useContext(AuthContext);
  const Navigate = useNavigate();
  const [formdata, setformdata] = useState({
    password: "",
    email: "",
  });

  function handlechange(event) {
    setformdata((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formdata.email,
          password: formdata.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          
         
          if (res.success === true) {
            
            storetokenInLS(res.token);
            toast.success("Login Successfull", {
              duration: 2000,
            });
            setTimeout(() => {
              Navigate("/");
            }, 500);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      toast.error("Error in xx");
    }
  };

  return (
    <div className="login_page">
      <div
        className="login-page-container d-flex justify-content-center align-items-center container  "
        style={{ width: "50%" }}
      >
        <Toaster>
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? "custom-enter 1s ease"
                  : "custom-exit 1s ease",
              }}
            />
          )}
        </Toaster>

        <form className="w-100" onSubmit={handlesubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              required
            />
          </div>
          <div
            className="form-group text-center"
            style={{ justifyContent: "center" }}
          >
            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
