import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "@/redux/features/adminApi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EnquiryDialog from "@/components/EnquiryDialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import buildingImg from "../assets/image 27.png";

const BASE_URL = "http://localhost:3001";

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: projectsData, isLoading } = useGetProjectsQuery();
  const projects = projectsData?.data || [];
  const project = projects.find((p) => p._id === id);

  const [swiperOpen, setSwiperOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  console.log(project)

  console.log(`${BASE_URL}${project.imageUrl}`)

  const openSwiper = (index) => {
    setStartIndex(index);
    setSwiperOpen(true);
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setSwiperOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-[1370px] mx-auto px-6 lg:px-12 py-16">
        <div className="animate-pulse">
          <div className="h-[450px] bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 w-1/2 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-[1370px] mx-auto px-6 lg:px-12 py-16 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }

  return (
    <>
      {/* HERO SECTION WITH PROJECT IMAGE */}
      <section className="relative w-full h-[450px] md:h-[520px] overflow-visible">
        <img
          src={`${BASE_URL}${project.imageUrl}`}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-white text-3xl md:text-[40px] font-extrabold">
            {project.title}
          </h1>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="max-w-[1140px] mx-auto px-4 md:px-6 mt-[50px]">
        <div className="text-center mb-10">
          <h2 className="text-[32px] text-[#D2AB48] font-semibold">Overview</h2>
          <div className="flex items-center justify-center">
            <div className="w-3 h-[10px] bg-[#D2AB48] rotate-45"></div>
            <div className="w-[208px] h-[3px] bg-[#D2AB48]"></div>
            <div className="w-3 h-[10px] bg-[#D2AB48] rotate-45"></div>
          </div>
          {project.location && (
            <p className="text-[20px] mt-[10px] font-medium">{project.location}</p>
          )}
        </div>

        <div className="max-w-[1370px] grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {project.description && (
              <p className="text-[16px] font-normal leading-6 text-justify">
                {project.description}
              </p>
            )}

            <p className="text-[16px] font-normal leading-6 text-justify mt-4">
              To know more about this project, please contact
              <a
                href="tel:9119119249"
                className="text-[#D2AB48] font-semibold underline mx-1"
              >
                911911 9249
              </a>
              and plan your site visit to experience the project.
            </p>

            {project.brochureUrl && (
              <div className="mt-6">
                <button
                  className="bg-[#D2AB48] cursor-pointer hover:bg-[#b6903d] text-white font-semibold px-6 py-2 rounded-md transition-colors duration-300"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = `${BASE_URL}${project.brochureUrl}`;
                    link.download = project.title;
                    link.click();
                  }}
                >
                  Download Brochure
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-12 mt-12">
              {project.status && (
                <div className="flex flex-col items-start leading-tight">
                  <p className="font-semibold text-[14px] capitalize">{project.status}</p>
                  <p className="text-[13px] text-gray-600">Status</p>
                </div>
              )}
              {project.price && (
                <div className="flex flex-col items-start leading-tight">
                  <p className="font-semibold text-[14px]">{project.price}</p>
                  <p className="text-[13px] text-gray-600">Price</p>
                </div>
              )}
              {project.area && (
                <div className="flex flex-col items-start leading-tight">
                  <p className="font-semibold text-[14px]">{project.area}</p>
                  <p className="text-[13px] text-gray-600">Area</p>
                </div>
              )}
            </div>
          </div>

          <img
            src={`${BASE_URL}${project.imageUrl}`}
            alt={project.title}
            className="w-full h-[350px] rounded-xl object-cover"
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative w-full h-[350px] md:h-[420px] flex items-center justify-center overflow-hidden mt-16">
        <img
          src={buildingImg}
          alt="Shubham Developers"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0"></div>
        <div className="relative text-center max-w-[700px] mx-auto px-4">
          <h3 className="text-white text-[26px] md:text-[32px] font-bold leading-tight">
            Shubham Developers – Crafting Spaces, Creating Trust
          </h3>
          <p className="text-white mt-4 text-[16px] md:text-[18px] leading-relaxed">
            With a strong vision of quality construction and customer
            satisfaction, Shubham Developers delivers modern residential &
            commercial projects that bring comfort, luxury, and a premium
            lifestyle together.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button className="mt-6 cursor-pointer bg-[#D2AB48] px-4 py-2 text-black w-[140px] rounded-md font-semibold hover:bg-[#b89434] transition">
                Enquiry
              </button>
            </DialogTrigger>
            <DialogContent className="[&>button]:cursor-pointer">
              <EnquiryDialog selectedProject={project.title} />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="w-full mt-10">
        <div className="text-center mb-10">
          <h2 className="text-[32px] text-[#D2AB48] font-semibold">Location</h2>
          <div className="flex items-center justify-center">
            <div className="w-3 h-[10px] bg-[#D2AB48] rotate-45"></div>
            <div className="w-[208px] h-[3px] bg-[#D2AB48]"></div>
            <div className="w-3 h-[10px] bg-[#D2AB48] rotate-45"></div>
          </div>
          {project.location && (
            <p className="text-[20px] mt-[10px] font-medium">{project.location}</p>
          )}
        </div>
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2303.7374330207706!2d72.9814874!3d26.270844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <div className="h-16"></div>
    </>
  );
}
