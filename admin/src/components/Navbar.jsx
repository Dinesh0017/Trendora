import React from "react";
import { assets } from "../assets/adminIcons/assets.js";

const Navbar = ({setToken}) => {
  return (
    <nav className="flex items-center justify-between px-5 sm:px-10 py-3 bg-white  sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          className="w-[max(12%,80px)] object-contain cursor-pointer  transition-transform duration-300"
          src={assets.adminLogo}
          alt="Logo"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Logout Button */}
        <button onClick={() => setToken("")} className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm md:text-base shadow transition-all duration-300 cursor-pointer">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
