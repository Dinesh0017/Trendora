import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/images/assets";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Only show on collection page
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-b border-gray-300 bg-white/80 backdrop-blur-md text-center sticky top-0 z-40 ">
      <div className="flex items-center justify-center py-4 px-3">
        {/* Search container */}
        <div className="flex items-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-100 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-amber-400 transition-all">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-5 opacity-60 mr-3"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400"
          />
          {search && (
            <img
              onClick={() => setSearch("")}
              src={assets.cross_icon}
              alt="clear"
              className="w-4 ml-3 cursor-pointer opacity-60 hover:opacity-90 transition"
            />
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => setShowSearch(false)}
          className="ml-3 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
        >
          <img
            src={assets.cross_icon}
            alt="close search"
            className="w-4 opacity-70"
          />
        </button>
      </div>
    </div>
  ) : null;
};

export default SearchBar;
