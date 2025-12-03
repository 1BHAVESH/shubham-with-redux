import { useNavigate } from "react-router-dom";
import EnquiryDialog from "./EnquiryDialog";
import { useState } from "react";
import shubhvilla from "../assets/SHUBH VILLA.jpeg";
import shubhVillaPdf from "../assets/Shubh Villa broucher .pdf"

import hero from "../assets/the fort jodhpur.png";
import hero2 from "../assets/shubham paradise.png";
import pdf1 from "../assets/Brochure The Fort Jodhpur.pdf";
import pdf2 from "../assets/Brochure Shubham Paradise-I.pdf";

// ShadCN UI
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section className="max-w-[1370px] mx-auto px-6 lg:px-12 py-16">
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <div className="h-1 w-5 bg-yellow-500"></div>
          <p className="font-bold text-[24px]">Projects</p>
        </div>

        <h2 className="text-3xl md:text-2xl font-normal">Featured Projects</h2>
      </div>

  <div className="flex flex-col lg:flex-row gap-6">

  {/* LEFT SIDE - BIG PROJECT */}
  <div className="lg:w-1/2 w-full">
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
      <img
        onClick={() => navigate("/Shubh-Villa")}
        src={shubhvilla}
        className="
          w-full 
          h-[420px]     
          sm:h-[300px]  
          md:h-[380px]  
          lg:h-[550px]   
          object-cover cursor-pointer
        "
      />

      <div className="p-4 mt-0 sm:mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer">
        <div onClick={() => navigate("/Shubh-Villa")}>
          <h3 className="text-lg sm:text-xl font-semibold hover:underline">SHUBH VILLA</h3>
          <p className="text-sm sm:text-base text-[#d4af37] hover:underline">
            shubh villa opp. harigarh resort , behind vyas college , guda road,near jhalamand circle jodhpur
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            className="bg-[#d4af37] cursor-pointer hover:bg-yellow-600 text-sm sm:text-base"
            onClick={() => {
              const link = document.createElement("a");
              link.href = shubhVillaPdf;
              link.download = shubhVillaPdf.split("/").pop();
              link.click();
            }}
          >
            Download
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-black cursor-pointer text-[#d4af37] px-6 py-1 rounded-full text-sm sm:text-base">
                Enquiry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <EnquiryDialog selectedProject="SHUBH VILLA" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  </div>

  {/* RIGHT SIDE – TWO PROJECTS */}
  <div className="lg:w-1/2 w-full flex flex-col gap-6">

    {/* CARD 1 */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        onClick={() => navigate("/Shubham-Paradise")}
        src={hero2}
        className="w-full h-[220px] sm:h-[300px] md:h-[320px] lg:h-[240px] object-cover cursor-pointer"
      />
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer">
        <div onClick={() => navigate("/Shubham-Paradise")}>
          <h3 className="text-lg sm:text-xl font-semibold hover:underline">Shubham Paradise</h3>
          <p className="text-sm sm:text-base text-[#d4af37] hover:underline">
            Tagore Nagar, Opp. Circuit House Pali Rajasthan
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-[#d4af37] cursor-pointer hover:bg-yellow-600 text-sm sm:text-base"
            onClick={() => {
              const link = document.createElement("a");
              link.href = pdf1;
              link.download = pdf1.split("/").pop();
              link.click();
            }}
          >
            Download
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-black cursor-pointer text-[#d4af37] px-6 py-1 rounded-full text-sm sm:text-base">
                Enquiry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <EnquiryDialog selectedProject="Shubham Paradise" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        onClick={() => navigate("/the-fort-jodhpur")}
        src={hero}
        className="w-full h-[220px] sm:h-[300px] md:h-[320px] lg:h-[240px] object-cover cursor-pointer"
      />
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer">
        <div onClick={() => navigate("/the-fort-jodhpur")}>
          <h3 className="text-lg sm:text-xl font-semibold hover:underline">The Fort Jodhpur</h3>
          <p className="text-sm sm:text-base text-[#d4af37] hover:underline">
            Near AIIMS Hospital, Jodhpur(Raj.)
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-[#d4af37] cursor-pointer hover:bg-yellow-600 text-sm sm:text-base"
            onClick={() => {
              const link = document.createElement("a");
              link.href = pdf2;
              link.download = pdf2.split("/").pop();
              link.click();
            }}
          >
            Download
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-black cursor-pointer text-[#d4af37] px-6 py-1 rounded-full text-sm sm:text-base">
                Enquiry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <EnquiryDialog selectedProject="The Fort Jodhpur" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>

  </div>
</div>



    </section>
  );
}
