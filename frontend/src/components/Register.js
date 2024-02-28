import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../styles/Register.css";
import axios from "./axios";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader";
const style=require("../styles/Register.css");
export default function Registration() {

  const {loading,setloading}=useContext(AuthContext);

  const Navigate = useNavigate();
  const [profileImage,setprofileImage]=useState();
  const [formdata, setformdata] = useState({
    name: "prathamesh",
    password: "123",
    birthDate: "",
    email: "prathamesh.pandit21@pccoepune.org",
    address: "pune",
    phone: "9834670973",
    otp:"",
    gender: "Male",
  });
  const handlechangeImage=async(event)=>{
      
    setprofileImage(event.target.files[0]);
    
  }
  const handlechange = async (event) => {
   
      setformdata((prev) => {
        return {
          ...prev,
          [event.target.name]: event.target.value,
        };
      });
    
      //  console.log(formdata);
    
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
     if(profileImage==undefined || profileImage==null){
       toast.error("Profile image not selected");
       return;
     }
   
       
    try {
      
      const { name, email, address, birthDate, phone, gender, password } =formdata;
      
      // const otpresponse=await fetch("/v1/sendotp",{
      //   method:"POST",
      //   body:{
      //     email:email
      //   }
      // }).then((res)=>res.json()).then((res)=>{
      //   if(res.success){
      //     formdata.otp=res.otp;
      //   }
      //   else{
      //     toast.error(res.message);
      //     return;
      //   }
      // })
     
        const form = new FormData();
        for (const key in formdata) {
          form.set(key, formdata[key]);
        }
        form.set("profileImage", profileImage);



      setloading(true);
      const response = await fetch("/v1/register", {
        method: "POST",
       
        body: form,
      })
        .then((res) => res.json())
        .then((res) => {
          setloading(false);

          if (res.success === true) {
            toast.success(res.message);
            setTimeout(() => {
              Navigate("/Login");
            }, 500);
          } else {
            toast.error(res.message, {
              duration: 200,
            });
          }
        })
        .catch((err) => {
          setloading(false);
          // console.log(err);
        });
    } catch (err) {
      setloading(false);
      toast.error("Error in xx");
      console.log(err);
    }
  };

  return (
    <div style={style}>
     
      {loading ? (
       <Loader></Loader>
        
      ) : (
        <div className="container d-flex justify-content-center align-items-center ">
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
              <label>Name</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter email"
                name="name"
                value={formdata.name}
                onChange={(event) => handlechange(event)}
                required
              />
            </div>
            <div className="form-group">
              <label> Email</label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={formdata.email}
                onChange={(event) => handlechange(event)}
                required
              />
            </div>
            <div className="form-group ">
              <label>Password</label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={formdata.password}
                onChange={(event) => handlechange(event)}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>

              <input
                type="date"
                className="form-control"
                placeholder="Enter birthDate"
                name="birthDate"
                value={formdata.birthDate}
                onChange={(event) => handlechange(event)}
                required
              />
            </div>

            <div className="form-group">
              <label>Address</label>

              <input
                type="text"
                className="form-control "
                placeholder="Enter address"
                name="address"
                value={formdata.address}
                onChange={(event) => handlechange(event)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone no. </label>

              <input
                type="number"
                className="form-control"
                placeholder="Enter Phone number"
                name="phone"
                value={formdata.phone}
                onChange={(event) => handlechange(event)}
                required
              />
            </div>
            <div className="comb">
              <div className="form-group" style={{ width: "50%" }}>
                <label>Profile Image</label>
                <input
                  id="exampleFormControlFile1"
                  style={{ border: "none",backgroundColor:"none" }}
                  type="file"
                  onChange={handlechangeImage}
                  name="profileImage"
                ></input>
              </div>

              <div
                className="form-group"
                id="gender"
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                <label htmlFor="inputState" className="form-label">
                  Gender
                </label>
                <select
                  style={{ width: "150px", height: "50px" }}
                  id="inputState"
                  className="form-select"
                  name="gender"
                  value={formdata.gender}
                  onChange={(event) => handlechange(event)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );



}
