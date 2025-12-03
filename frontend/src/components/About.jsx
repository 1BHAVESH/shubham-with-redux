// components/About.jsx

import hero from "../assets/Screenshot.png";
import chairman from "../assets/chairman.png";


export default function About() {
  return (
 <section className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-12 py-16">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
    {/* 🟢 TEXT FIRST FOR MOBILE, SECOND FOR DESKTOP */}
    <div className="flex flex-col justify-center order-1 lg:order-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-[2px] bg-[#d4af37]"></div>
        <p className="font-serif text-[18px] font-bold tracking-wide">
          About us
        </p>
      </div>

      <h2 className="text-[28px] sm:text-[32px] font-semibold text-gray-800 mb-6">
        Welcome to Subham Developers
      </h2>

      <p className="text-[15px] leading-relaxed font-sans text-justify text-gray-700">
        At Subham Developers, we are committed to offer the best
        full-service Real Estate and Infrastructure Development. We aim at
        fulfilling one's dream into reality with our professional approach,
        timely delivery and commitment to excellent service. Since its
        inception, we have focused on creating unmatched luxuryspaces with
        top-notch quality for our clients that surpasses our customer's
        aspirations. The house of Subham Developers is a blend of experience
        and a dedicated team to create spaces that offer natural light, air
        and aesthetically pleasing designs. Our work doesn't end with
        building a home, quality check-points are installed at every level
        to ensure the best results. The company is setting new standards in
        the real estate industry by creating quality-driven projects through
        our client's trusts.
      </p>
    </div>

    {/* 🟢 IMAGE SECOND FOR MOBILE, FIRST FOR DESKTOP */}
    <div className="w-full order-2 lg:order-1">
      <img
        src={hero}
        alt="Subham Developers"
        className="rounded-xl shadow-md w-full h-[250px] sm:h-[366px] object-cover"
      />
    </div>
  </div>

  {/* Bottom Section */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-start">
    {/* Left Text Block */}
    <div className="max-w-[600px]">
      <p className="text-[15px] font-semibold leading-relaxed font-sans text-justify text-gray-800">
        Established in 2019, Subham Developers is one of Rajasthan's most
        respected and trusted real estate developers in Jodhpur. With over
        three decades of experience, we have transformed the skyline of
        Jodhpur. Our commitment to quality, innovation, and customer
        satisfaction sets us apart, making us a preferred choice for
        homebuyers and investors alike.
      </p>
    </div>

    {/* Chairman Card - Aligned to the Right */}
    <div className="flex justify-start lg:justify-end">
      <div className="max-w-[230px] bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
        <img
          src={chairman}
          alt="Chairman"
          className="w-full h-[200px] rounded-lg object-cover"
        />

        <h3 className="text-xl font-semibold mt-4 text-gray-900">
          Sheshmal Sanklecha
        </h3>
        <p className="text-gray-600 text-sm mt-1">Chairman</p>
      </div>
    </div>
  </div>
</section>
  );
}
