// components/HeroImage.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Basic Swiper CSS
import "swiper/css/pagination"; // Optional pagination style
import { Pagination, Autoplay } from "swiper/modules";

import hero1 from "../assets/Screenshot.png";
import hero2 from "../assets/Gemini-the-fort.png";
import shubhvilla from "../assets/SHUBH VILLA.jpeg";


export default function HeroImage() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[270px] lg:h-[501px]"
      >
        <SwiperSlide>
          <img src={hero2} alt="subham developers" className="w-full h-full object-cover" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={hero1} alt="subham developers" className="w-full h-full object-cover" />
        </SwiperSlide>
         <SwiperSlide>
          <img src={shubhvilla} alt="subham developers" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
