import CommomImg from "@/components/CommonBackgroundImg";
import React from "react";
import { Briefcase } from "lucide-react";

const jobList = [
  {
    title: "Telecaller / CRM Executive",
    points: [
      "Generate leads and close property deals",
      "Conduct site visits with clients",
      "Excellent communication and negotiation skills",
      "Freshers & experienced both can apply",
    ],
  },
  {
    title: "Telecaller / CRM Executive",
    points: [
      "Generate leads and close property deals",
      "Conduct site visits with clients",
      "Excellent communication and negotiation skills",
      "Freshers & experienced both can apply",
    ],
  },
  {
    title: "Telecaller / CRM Executive",
    points: [
      "Generate leads and close property deals",
      "Conduct site visits with clients",
      "Excellent communication and negotiation skills",
      "Freshers & experienced both can apply",
    ],
  },
  {
    title: "Telecaller / CRM Executive",
    points: [
      "Generate leads and close property deals",
      "Conduct site visits with clients",
      "Excellent communication and negotiation skills",
      "Freshers & experienced both can apply",
    ],
  },
  {
    title: "Telecaller / CRM Executive",
    points: [
      "Generate leads and close property deals",
      "Conduct site visits with clients",
      "Excellent communication and negotiation skills",
      "Freshers & experienced both can apply",
    ],
  },
  {
    title: "Telecaller / CRM Executive",
    points: [
      "Generate leads and close property deals",
      "Conduct site visits with clients",
      "Excellent communication and negotiation skills",
      "Freshers & experienced both can apply",
    ],
  },
];

const Careers = () => {
  return (
    <div>

      {/* 🔶 PAGE HERO SECTION */}
      <section>
        <CommomImg page="Careers" />
      </section>

      {/* 🔶 MAIN CONTENT */}
      <section className="max-w-[1370px] mx-auto px-4 md:px-8 py-12">

        <div className="flex items-center gap-1">
        <div className="bg-[#D2AB48] h-2 w-7"></div>
        <p className="font-bold text-[20px]">Careers</p>
        </div>

        {/* 🔸 HEADING  */}
        <h2 className="text-[20px] md:text-[24px] font-normal mb-3">
          Build Your Future With Us
        </h2>

        <p className=" leading-relaxed mb-10 max-w-[1140px] text-justify">
          At <strong>[Your Company Name]</strong>, we don’t just build properties —
          we build people, careers, and long-term success stories. As a fast-growing
          real estate company, we are always looking for passionate, driven, and
          talented individuals to join our team. If you're ready to grow in an
          exciting industry filled with opportunities, you’ve come to the right place.
        </p>

        {/* 🔸 CURRENT OPENINGS */}
        <h3 className="text-[24px] font-medium mb-6">Current Openings</h3>

        {/* GRID OF JOBS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {jobList.map((job, index) => (
            <div
              key={index}
              className="bg-[#FFFBF2] w-[346px] h-[179px] p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* ICON + TITLE */}
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="text-[#D2AB48]" size={26} />
                <h4 className="font-semibold text-[18px]">{job.title}</h4>
              </div>

              {/* POINTS */}
              <ul className="list-disc ml-5 mb-20 text-[14px] leading-relaxed">
                {job.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default Careers;
