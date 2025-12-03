// src/layout/Layout.jsx
import Footer from "@/components/Footer";
import Header from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />   {/* Page content yaha change hoga */}
      <Footer />
    </>
  );
}
