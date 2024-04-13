import React, { useState } from "react";

export default function EnterOtp({user}) {
  const [otp, setotp] = useState("");
  function handlesubmit(e){
       
  }
  function handlechange(e){
    setotp(e.target.value);
  }
  return (
    <div>
       <h3>Enter OTP</h3>
       <form  onSubmit={handlesubmit}>
        <input type="Number" onChange={handlechange} value={otp} placeholder="Enter OTP " />
        <button type="submit" > Register</button>
       </form>
    </div>
  );
}
