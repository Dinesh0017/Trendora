import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import { assets } from "../assets/images/assets";

const Footer = () => {
  return (
    <footer className="  border-gray-200">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <img src={assets.logot} alt="Trendora Logo" className="w-32 h-auto -ml-2" />
          <p className="mt-3 text-gray-500 text-sm leading-relaxed">
            Redefining elegance with timeless fashion. Discover curated
            collections crafted for modern lifestyles.
          </p>
        </div>

        {/* Shop Links */}
        <div className="lg:ml-12">
          <h3 className="text-sm font-semibold text-gray-900 tracking-wide mb-4 ">
            SHOP
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="/collection" className="hover:text-amber-600">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover:text-amber-600">
                Women
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover:text-amber-600">
                Men
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover:text-amber-600">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 tracking-wide mb-4">
            SUPPORT
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="/faq" className="hover:text-amber-600">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-amber-600">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-amber-600">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-amber-600">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 tracking-wide mb-4">
            STAY IN TOUCH
          </h3>
          <form className="flex w-full mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
            <button
              type="submit"
              className="bg-amber-600 text-white px-4 py-2 rounded-r-md text-sm hover:bg-amber-700 cursor-pointer "
            >
              Join
            </button>
          </form>
          <div className="flex gap-5 text-gray-600 text-lg">
            <a href="#" className="hover:text-amber-600">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-amber-600">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-amber-600">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-amber-600">
              <FaPinterest />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Trendora. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <img src={assets.visa_img} alt="Visa" className="h-6" />
            <img src={assets.masterCard_img} alt="MasterCard" className="h-6" />
            <img src={assets.paypal_img} alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
