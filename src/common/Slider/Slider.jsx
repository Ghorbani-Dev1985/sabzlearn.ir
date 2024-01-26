import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import './SliderStyle.css'
import { FreeMode, Autoplay , Navigation} from "swiper/modules";

function Slider({children , SwiperNextBtnID, SwiperPrevBtnID }) {
  return (
    <Swiper
      loop={true}
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={20}
      grabCursor={true}
      freeMode={true}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
      modules={[FreeMode, Autoplay , Navigation]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      navigation={{
        nextEl: `${SwiperNextBtnID}`,
        prevEl: `${SwiperPrevBtnID}`,
      }}
      className="mySwiper"
    >
   {children}
    </Swiper>
  );
}

export default Slider;
