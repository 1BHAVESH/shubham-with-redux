// Header.jsx
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Menu,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"; // 👈 Added
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import menuImg from "/logo.png";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Separator } from "./ui/separator";
import { Link, useNavigate } from "react-router-dom";
import EnquiryDialog from "./EnquiryDialog";

export default function Header() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState("home");

  const menuItems = [
    { name: "Home", id: "home", path: "/" },
    { name: "About us", id: "about", path: "/about" },
    { name: "Projects", id: "projects", path: "/projects" },
    { name: "Mission & Vision", id: "mission", path: "/mission-&-vision" },
    { name: "Media", id: "media", path: "/media" },
    { name: "Contact us", id: "contact", path: "/contact" },
  ];

  return (
          <header className="w-full">
      {/* TOP BLACK BAR */}
      <div className="bg-black text-[#d4af37] text-xs flex justify-between items-center px-3 sm:px-6 md:px-10 lg:px-20 xl:px-[145px] h-12 sm:h-14 overflow-hidden">
        
        {/* MOBILE CONTACT INFO */}
        <div className="flex md:hidden flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-3 text-[9px] sm:text-xs py-1">
          <a
            href="tel:+919024195195"
            className="flex items-center gap-1 hover:text-yellow-400 transition-colors whitespace-nowrap"
          >
            <Phone size={10} className="sm:w-3 sm:h-3" /> 
            <span>+91 9024195 195</span>
          </a>
          <a
            href="mailto:info@subhamdevelopers.com"
            className="flex items-center gap-1 hover:text-yellow-400 transition-colors whitespace-nowrap"
          >
            <Mail size={10} className="sm:w-3 sm:h-3" /> 
            <span>info@subhamdevelopers.com</span>
          </a>
        </div>

        {/* DESKTOP CONTACT INFO */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm">
          <a
            href="tel:+919024195195"
            className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors"
          >
            <Phone size={14} />
            <span className="hidden lg:inline">+91 9024195 195</span>
            <span className="inline lg:hidden">+91 902...</span>
          </a>
          <a
            href="mailto:info@subhamdevelopers.com"
            className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors"
          >
            <Mail size={14} />
            <span className="hidden lg:inline">info@subhamdevelopers.com</span>
            <span className="inline lg:hidden">info@subham...</span>
          </a>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.facebook.com/SubhamDevelopersJodhpur"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-colors"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-base sm:text-lg" />
          </a>
          <a 
            href="https://www.instagram.com/subhamdeveloper/" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-colors"
          >
            <FontAwesomeIcon icon={faSquareInstagram} className="text-base sm:text-lg" />
          </a>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-white w-full shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-[1370px] h-16 sm:h-[70px] md:h-[78px] mx-auto flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-10">
          
          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              className="h-12 w-auto sm:h-14 md:h-16 lg:h-[76px] object-contain"
              alt="Subham Developers"
            />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex gap-4 xl:gap-6 text-gray-700 text-sm font-medium">
            {menuItems.map(({ name, id, path }) => (
              <li
                key={id}
                onClick={() => setActiveNav(id)}
                className={`cursor-pointer border-b-2 pb-1 transition-all whitespace-nowrap
                  ${activeNav === id
                    ? 'border-[#d4af37] text-[#d4af37] font-semibold'
                    : 'border-transparent hover:border-[#d4af37] hover:text-[#d4af37]'
                  }`}
              >
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>

          {/* DESKTOP ENQUIRY BUTTON */}
          <div className="hidden lg:block flex-shrink-0">
            <Dialog>
              <DialogTrigger asChild>
                <button className="cursor-pointer bg-black text-[#d4af37] px-5 lg:px-7 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium hover:bg-gray-900 transition-colors">
                  Enquiry
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                <EnquiryDialog />
              </DialogContent>
            </Dialog>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile Enquiry Button (visible on md screens) */}
            <div className="hidden lg:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-black text-[#d4af37] px-4 py-1.5 rounded-full text-xs font-medium">
                    Enquiry
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <EnquiryDialog />
                </DialogContent>
              </Dialog>
            </div>

            <Sheet>
              <SheetTrigger>
                <Menu size={24} className="cursor-pointer text-gray-700 hover:text-[#d4af37] transition-colors" />
              </SheetTrigger>

              <SheetContent side="right" className="bg-white w-[280px] h-[450px]">
                <SheetTitle className="hidden"></SheetTitle>
                <SheetHeader className="p-2 mr-[190px] h-[0px]">
                  <img
                    src="/logo.png"
                    alt="menu"
                    className="h-12 w-auto object-contain"
                  />
                  <SheetDescription className="hidden"></SheetDescription>
                </SheetHeader>

                {/* Mobile Menu Items */}
                <ul className="flex flex-col gap-1 text-gray-700 mt-4">
                  {menuItems.map(({ name, id, path }) => (
                    <React.Fragment key={id}>
                      <li 
                        className="pl-4 py-3 hover:bg-gray-50 hover:text-[#d4af37] transition-colors cursor-pointer"
                        onClick={() => {
                          setActiveNav(id);
                          navigate(path);
                        }}
                      >
                        <Link to={path}>{name}</Link>
                      </li>
                      {id < menuItems.length && <Separator />}
                    </React.Fragment>
                  ))}
                </ul>

                {/* Mobile Enquiry Button */}
                <div className="mt-6 px-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full bg-black text-[#d4af37] px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-900 transition-colors">
                        Enquiry
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <EnquiryDialog />
                    </DialogContent>
                  </Dialog>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>


    </header>
  );
}