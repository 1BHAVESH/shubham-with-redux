import client1 from "../assets/Screenshot.png";
import client2 from "../assets/Screenshot.png";
import client3 from "../assets/Screenshot.png";
import client4 from "../assets/Screenshot.png";
import client5 from "../assets/Screenshot.png";

import bgImg from "../assets/ChatGPt_Bg_IMG.png"
import { useState } from "react";

const people = [
  {
    img: client1,
    name: "Ali Tufan",
    role: "Product Manager",
    quote:
      "What a great experience! I attended a masterclass and it was super useful!",
  },
  {
    img: client2,
    name: "Sarah Williams",
    role: "UI/UX Designer",
    quote: "Amazing workshop! Learned a lot and improved my design skills.",
  },
  {
    img: client3,
    name: "Michael Brown",
    role: "Software Engineer",
    quote: "Very professional and well structured sessions. Highly recommend!",
  },
  {
    img: client4,
    name: "Emily Johnson",
    role: "Marketing Specialist",
    quote: "Loved the learning environment and team support!",
  },
  {
    img: client5,
    name: "David Lee",
    role: "Freelancer",
    quote: "Hands-on experience helped me a lot in real-world work.",
  },
];




export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0); // 👉 Default first user

  return (
    <section className="relative py-8 md:py-12 text-white bg-black overflow-hidden"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        
      }}>
      {/* BG Effect */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(100, 149, 237, 0.3) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        {/* Title */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
  
  {/* LEFT LINE */}
  <div className="w-7 h-[4px]  bg-[#d4af37]"></div>

  {/* TEXT */}
  <p className="text-white font-semibold uppercase tracking-wider text-sm">
    Testimonials
  </p>

  {/* RIGHT LINE */}
  <div className="w-7 h-[4px]  bg-[#d4af37]"></div>

</div>

          <h2 className="font-playfair text-[30px] md:text-[26px] font-light tracking-wide text-white ">What Our Clients Say</h2>
        </div>

        {/* Quote Icon */}
        <div className="text-6xl md:text-7xl text-gray-700 leading-none mb-4">
          ❝
        </div>

        {/* Dynamic Quote */}
        <p className="text-lg md:text-xl font-normal leading-relaxed mb-6 max-w-3xl mx-auto">
          {people[activeIndex].quote}
        </p>

        {/* Name & Role */}
        <div className="mb-6">
          <h3 className="text-xl font-bold">{people[activeIndex].name}</h3>
          <p className="text-sm text-gray-400">{people[activeIndex].role}</p>
        </div>

        {/* People Images */}
        <div className="flex justify-center gap-4 flex-wrap">
          {people.map((person, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)} // 🔥 CLICK EVENT
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden cursor-pointer transition-all duration-300 ${
                activeIndex === index
                  ? "ring-2 ring-white scale-110"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={person.img}
                alt="client"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
