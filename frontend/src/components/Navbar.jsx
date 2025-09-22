import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/images/assets.js";
import { ShopContext } from "../context/ShopContext.jsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium relative ">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logot} alt="Trendora Logo" className="w-32 h-auto" />
      </Link>
      {/* Desktop Links */}
      <ul className="hidden sm:flex gap-5 text-md text-gray-700">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-amber-500"
                    : "text-gray-700 hover:text-amber-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`block h-[3px] bg-amber-500 transition-all duration-500 origin-left rounded-2xl ${
                      isActive
                        ? "w-full scale-x-100 opacity-100"
                        : "w-full scale-x-0 opacity-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Section: Search / Profile / Cart / Hamburger */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
        />

        {/* Profile Dropdown */}
        <div className="group relative">
          <Link to='/login'>
            <img
              src={assets.profile_icon}
              alt="User"
              className="w-5 cursor-pointer"
            />
          </Link>
          <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg pt-4">
            <ul className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <li className="cursor-pointer hover:text-amber-500">
                My Profile
              </li>
              <li className="cursor-pointer hover:text-amber-500">Orders</li>
              <li className="cursor-pointer hover:text-amber-500">Logout</li>
            </ul>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="Cart" className="w-5 min-w-5" />
          <p className="absolute bottom-[-5px] right-[-5px] text-center leading-4 bg-amber-500 text-white aspect-square rounded-full text-[8px] w-4">
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger (only mobile) */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar Menu (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 z-50 overflow-x-hidden ${
          visible ? "w-3/4 sm:w-1/3" : "w-0"
        }`}
      >
        {/* Header */}
        <div
          onClick={() => setVisible(false)}
          className="flex items-center gap-4 p-4 cursor-pointer border-b border-gray-200"
        >
          <img
            className="h-4 rotate-180"
            src={assets.dropdown_icon}
            alt="Back"
          />
          <p className="font-semibold">Back</p>
        </div>

        {/* Mobile Links */}
        <ul className="flex flex-col gap-4 p-6 text-gray-700">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setVisible(false)} // close menu after click
                className={({ isActive }) =>
                  `flex flex-col font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-amber-500"
                      : "text-gray-700 hover:text-amber-500"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
