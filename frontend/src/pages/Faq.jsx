import React, { useState } from "react";
import CommomImg from "@/components/CommonBackgroundImg";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const Faq = () => {
  const [openItem, setOpenItem] = useState("");

  return (
    <div>
      <CommomImg page="FAQ" />

      <div className="max-w-[1370px] mx-auto px-4 py-5">
        <div className="flex items-center gap-1 mb-10 ml-5 max-w-[100px]">
          <div className="bg-[#D2AB48] h-1 w-7"></div>
          <p className="font-bold text-[20px]">FAQs</p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="max-w-[1140px] mx-auto space-y-4 ml-5"
          value={openItem}
          onValueChange={setOpenItem}
        >
          {/* Q1 */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex cursor-pointer justify-between items-center w-full text-[20px] font-semibold [&>svg]:hidden hover:no-underline hover:no-underline">
              What services do you offer?
              <span className="text-xl">
                {openItem === "item-1" ? "−" : "+"}
              </span>
            </AccordionTrigger>

            <AccordionContent className="text-16px font-normal">
              We offer luxurious villas, premium apartments, and commercial
              spaces.
            </AccordionContent>
          </AccordionItem>

          {/* Q2 */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="flex cursor-pointer justify-between items-center w-full text-[20px] font-medium [&>svg]:hidden hover:no-underline">
              Are your projects legally approved?
              <span className="text-xl">
                {openItem === "item-2" ? "−" : "+"}
              </span>
            </AccordionTrigger>

            <AccordionContent className="text-16px font-normal">
              Yes, all our projects are RERA approved.
            </AccordionContent>
          </AccordionItem>

          {/* Q3 */}
          <AccordionItem value="item-3">
            <AccordionTrigger className="flex cursor-pointer justify-between items-center w-full text-[20px] font-medium [&>svg]:hidden hover:no-underline">
              Are the properties good for investment?
              <span className="text-xl">
                {openItem === "item-3" ? "−" : "+"}
              </span>
            </AccordionTrigger>

            <AccordionContent className="text-16px font-normal">
              Yes, our properties are located in high-growth areas ideal for
              investment.
            </AccordionContent>
          </AccordionItem>

          {/* Q4 */}
          <AccordionItem value="item-4">
            <AccordionTrigger className="flex cursor-pointer justify-between items-center w-full text-[20px] font-medium [&>svg]:hidden hover:no-underline">
              How can I contact you?
              <span className="text-xl">
                {openItem === "item-4" ? "−" : "+"}
              </span>
            </AccordionTrigger>

            <AccordionContent className="text-16px font-normal">
              You can reach us via phone, email, WhatsApp, or visit our office.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;