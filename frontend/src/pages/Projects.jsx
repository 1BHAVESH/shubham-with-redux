import CommomImg from "@/components/CommonBackgroundImg";
import React from "react";
import shubhvilla from "../assets/SHUBH VILLA.jpeg";
import hero from "../assets/the fort jodhpur.png";
import hero2 from "../assets/shubham paradise.png";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <CommomImg page="Projects" />

      {/* Header Section */}
      <section className="w-full py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Top Text */}
          <p className="text-[#D2AB48] text-lg sm:text-xl md:text-2xl font-medium">
            About Properties at Subham Developers
          </p>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2">
            List of Available Properties
          </h2>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="w-full max-w-7xl mx-auto mb-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* LEFT SIDE - BIG PROJECT */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <img
                onClick={() => navigate("/Shubh-Villa")}
                src={shubhvilla}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                alt="The Fort Jodhpur"
              />

              <div className="p-4 sm:mt-10 sm:p-6 flex items-center justify-between cursor-pointer">
                <div onClick={() => navigate("/the-fort-jodhpur")}>
                  <h3 className="text-base sm:text-lg font-semibold hover:underline">
                    SHUBH VILLA
                  </h3>
                  <p className="text-sm max-w-[400px] text-[#d4af37] hover:underline mt-1">
                    shubh villa opp. harigarh resort , behind vyas college ,
                    guda road,near jhalamand circle jodhpur
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - TWO PROJECTS */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6">
            {/* CARD 1 - Shubham Paradise */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex-1">
              <img
                onClick={() => navigate("/Shubham-Paradise")}
                src={hero2}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-[220px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                alt="Shubham Paradise"
              />
              <div className="p-4 sm:p-6 flex items-center justify-between cursor-pointer">
                <div onClick={() => navigate("/Shubham-Paradise")}>
                  <h3 className="text-base sm:text-lg font-semibold hover:underline">
                    Shubham Paradise
                  </h3>
                  <p className="text-sm text-[#d4af37] hover:underline mt-1">
                    Tagore Nagar, Opp. Circuit House Pali Rajasthan
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2 - The Fort Jodhpur */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex-1">
              <img
                onClick={() => navigate("/the-fort-jodhpur")}
                src={hero}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-[220px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                alt="The Fort Jodhpur"
              />
              <div className="p-4 sm:p-6 flex items-center justify-between cursor-pointer">
                <div onClick={() => navigate("/the-fort-jodhpur")}>
                  <h3 className="text-base sm:text-lg font-semibold hover:underline">
                    The Fort Jodhpur
                  </h3>
                  <p className="text-sm text-[#d4af37] hover:underline mt-1">
                    Near AIIMS Hospital, Jodhpur(Raj.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;