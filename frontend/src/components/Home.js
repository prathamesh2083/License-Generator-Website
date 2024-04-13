import React from 'react'
import back from "../images/Email Image.jpg"
import importanceImg from "../images/importanceImg.webp";
import {data} from "../data/importance";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
export default function Home() {
   
  const color1 = "#343336";
  const color2 = "#B408A4";
  
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "30px",
      }}
    >
      <div style={{ width: "100%", display: "flex", padding: "30px" }}>
        <div
          style={{
            width: "50%",
            textAlign: "center",
            padding: "50px",
            fontSize: "2.5rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            fontFamily: "sans-serif",
          }}
        >
          Give simple test and get your license now !!
        </div>
        <div
          style={{
            margin: "auto",
            width: "50%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={back}
            style={{ width: "100%", maxHeight: "600px", borderRadius: "5px" }}
          ></img>
        </div>
      </div>
      <div
        style={{
          
          height: "500px",
          width: "100%",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <div style={{fontSize:"2rem" ,fontWeight:"200px" ,padding:"50px"}}>Importance of Driving License</div>
        <Swiper
        style={{display:"flex",justifyContent:"center",alignItems:"center"}}
          
          slidesPerView={3}
          spaceBetween={10}
          loop={true}
          freeMode={true}
          speed={1900}
          centeredSlides={true}
          centeredSlidesBounds={true}
          autoplay={{
            delay: 2000,

            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          breakpoints={{
            200: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data?.map((d, index) => {
            return (
              <SwiperSlide
                key={index}
                style={{
                  border: "solid 1px #DCDCDC",
                  backgroundColor: "#F5F5F5",
                  borderRadius: "4px",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  padding: "10px",
                }}
                className="flex justify-center items-center  w-[500px]"
              >
                <div style={{ fontSize: "20px", fontWeight: "100px" }}>
                  {d.title}
                </div>
                <div>{d.desc}</div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
