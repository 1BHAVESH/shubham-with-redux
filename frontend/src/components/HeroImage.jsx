import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useGetBannersQuery } from "@/redux/features/adminApi";

const BASE_URL = "http://localhost:3001";

export default function HeroImage() {
  const { data: bannersData, isLoading } = useGetBannersQuery();
  const banners = bannersData?.data || [];

  if (isLoading) {
    return (
      <section className="w-full h-[270px] lg:h-[501px] bg-gray-200 animate-pulse" />
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={banners.length > 1}
        className="w-full h-[270px] lg:h-[501px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <img
              src={`${BASE_URL}${banner.imageUrl}`}
              alt={banner.title || "Banner"}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
