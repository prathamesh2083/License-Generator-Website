import React from 'react'
import back from "../images/Email Image.jpg"
export default function Home() {
  return (
    <div>
      <div style={{ margin:"auto" ,display:"flex",justifyContent:"center" }}>
        <img src={back} style={{ width: "80%" ,maxHeight:"600px" }}></img>
      </div>
    </div>
  );
}
