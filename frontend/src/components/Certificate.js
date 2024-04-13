
import html2canvas from "html2canvas";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { AuthContext } from '../context/AuthContext';

// export default function Certificate() {

//   const [data,setdata]=useState(null);
//   const { User, setUser } = useContext(AuthContext);
  

//   useEffect(()=>{
//     ;(async()=>{
//          console.log("email is ",User);
//          try {
//            const response = await fetch("/v1/getdata", {
//              method: "POST",
//              headers: {
//                "Content-Type": "application/json",
//              },
//              body: JSON.stringify({
               
//                email: User.email,
//              }),
//            })
//              .then((res) => res.json())
//              .then((res) => {
//                if (res.success === true) {
//                  setdata(res.data);
//                  console.log("data is " ,res);

               
//                } else {
//                  toast.error(res.message);
//                }
//              })
//              .catch((err) => {
//                console.log(err);
//              });

//              console.log(response);
//          } catch (err) {
//            console.log("error in fetching all data ");
//            console.log(err);
//          }
//     })()
        
//   },[])
//   const printRef = React.useRef();
 
//  const handleDownloadImage = async () => {
//    try {
//      const element = printRef.current;

//      // Create a promise to wait for the image to load
//      const imageLoadPromise = new Promise((resolve, reject) => {
//        const image = new Image();
//        image.onload = resolve;
//        image.onerror = reject;
//        image.src = data?.profileImage; // Replace with the correct image source
//      });

//      // Wait for the image to load
//      await imageLoadPromise;

//      // Once the image is loaded, capture the content of the div
//      const canvas = await html2canvas(element);

//      // Convert the canvas to a data URL
//      const imageDataURL = canvas.toDataURL("image/jpeg");

//      // Create a link element to download the image
//      const link = document.createElement("a");
//      link.href = imageDataURL;
//      link.download = "certificate.jpg";

//      // Append the link to the body, trigger click event, and remove the link
//      document.body.appendChild(link);
//      link.click();
//      document.body.removeChild(link);
//    } catch (error) {
//      console.error("Error while capturing and downloading image:", error);
//    }
//  };
 
//   return (
//     <div
//       style={{
//         margin: "auto",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <div
//         ref={printRef}
//         style={{
//           backgroundColor: "beige",
//           width: "500px",
//           height: "350px",
//           borderRadius: "10px",
//           paddingTop: 0,
//           margin: "30px",
//           textAlign: "center",
//         }}
//       >
//         <h2
//           style={{
//             backgroundColor: "#8ac3f6",
//             padding: 6,
//             width: "100%",
//             padding: "10px",
//           }}
//         >
//           Driving License{" "}
//         </h2>

//         <div style={{ textAlign: "start", marginLeft: "20px" }}>
//           Id : {data?._id}
//         </div>
//         <div
//           style={{
//             display: "flex",
//             gap: "20px",
//             marginLeft: "20px",
//             marginTop: "20px",
//             padding: "5px",
//           }}
//         >
//           <div
//             id="capture"
//             style={{
//               width: "200px",
//               height: "200px",
//               backgroundImage: `url(${data?.profileImage})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//             }}
//           >
//             <img
//               src={data?.profileImage}
//               alt="Profile"
//               style={{ width: "200px", height: "200px" }}
//             />
//           </div>

//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: 8,
//             }}
//           >
//             <h5>{data?.name} pandit</h5>
//             <div>DOB : {data?.birthDate}</div>
//             <div style={{ display: "flex", gap: "12px" }}>
//               <div style={{ fontSize: "14px" }}>Gender : {data?.gender} </div>
//               <div style={{ fontSize: "14px" }}>Phone No. : {data?.phone} </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <button onClick={handleDownloadImage}>Download</button>
//     </div>
//   );
// }
 
import React, { useRef, useState,useEffect,useContext } from "react";
import { createFileName, useScreenshot } from "use-react-screenshot";
import { takeScreenShot } from "./utils";
export default () => {
  const [image, setImage] = useState(null);
    const [data,setdata]=useState(null);
    const { User, setUser } = useContext(AuthContext);
    const [url,seturl]=useState("");
    useEffect(()=>{
      ;(async()=>{
           console.log("email is ",User);
           try {
             const response = await fetch("/v1/getdata", {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify({

                 email: User.email,
               }),
             })
               .then((res) => res.json())
               .then((res) => {
                 if (res.success === true) {
                   setdata(res.data);
                  
                  seturl(res.data.profileImage);
                  
                 } else {
                   toast.error(res.message);
                 }
               })
               .catch((err) => {
                 console.log(err);
               });

               console.log(response);
           } catch (err) {
             console.log("error in fetching all data ");
             console.log(err);
           }
          
            try {
              const response = await fetch(`${url}`);
              if (!response.ok) {
                throw new Error("Failed to fetch image");
              }
              const blob = await response.blob();
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result);
              };
              reader.readAsDataURL(blob);
            } catch (error) {
              console.log(error);
              console.error("Error fetching image:", error);
            }
      })()
       

       
    },[data?.name])
  
    
  const downloadScreenshot = () => {
    takeScreenShot("capture", "myimage", "image/jpeg", "#f5f5f5");
  };
  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        id="capture"
        style={{
          backgroundColor: "beige",
          width: "500px",
          height: "350px",
          borderRadius: "10px",
          paddingTop: 0,
          margin: "30px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            backgroundColor: "#8ac3f6",
            padding: 6,
            width: "100%",
            padding: "10px",
          }}
        >
          Driving License{" "}
        </h2>

        <div style={{ textAlign: "start", marginLeft: "20px" }}>
          Id : {data?._id}
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginLeft: "20px",
            marginTop: "20px",
            padding: "5px",
          }}
        >
          <img
            src={image}
            alt="Profile"
            style={{
              width: "170px",
              height: "180px",
              objectPosition: "center",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <h5>{data?.name} </h5>
            <div>DOB : {data?.birthDate}</div>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ fontSize: "14px" }}>Gender : {data?.gender} </div>
              <div style={{ fontSize: "14px" }}>Phone No. : {data?.phone} </div>
            </div>
            <div style={{ fontSize: "14px" }}> Address : {data?.address}</div>
          </div>
        </div>
      </div>
      <button onClick={downloadScreenshot}>Get Your License</button>
    </div>
  );
};

