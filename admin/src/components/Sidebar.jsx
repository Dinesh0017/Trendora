import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/adminIcons/assets";


const Sidebar = () => {

// Sidebar navigation links data
  const navLinks = [
    { to: "/add", label: "Add Items", icon: assets.add_icon },
    { to: "/list", label: "List Items", icon: assets.order_icon },
    { to: "/orders", label: "Orders", icon: assets.order_icon },
  ];

  return (
    <div className="w-[20%] min-h-screen border-r border-gray-400 bg-white shadow-md ">
      <div className="flex flex-col gap-4 pt-6  text-[15px]">
        {navLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md transition-all duration-300 mx-2
              ${
                isActive
                  ? "bg-amber-100 text-amber-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <img src={icon} alt={`${label} Icon`} className="w-5 h-5 " />
            <span className="hidden md:block ">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
