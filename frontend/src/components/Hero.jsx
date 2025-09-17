import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/images/assets"; // replace with actual images

const Hero = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Big Featured Product */}
          <div className="sm:col-span-2 lg:col-span-2 relative rounded-2xl overflow-hidden shadow-md group">
            <img
              src={assets.hero2}
              alt="Elegance Embodied Dress"
              className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-4 py-2 rounded-xl">
              <h3 className="font-semibold text-gray-800">
                Elegance Embodied Dress
              </h3>
              <p className="text-gray-600 text-sm">$199.99</p>
            </div>
          </div>

          {/* Highlight Card */}
          <div className="bg-amber-200 rounded-2xl flex flex-col justify-center items-center text-center p-6 shadow-md">
            <h3 className="font-bold text-gray-900 text-lg">
              Comprehensive Guide
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              To The World Of Fashion
            </p>
            <span className="text-2xl font-bold text-amber-600">1000+</span>
          </div>

          {/* Two Small Products */}
          <div className="grid gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md group">
              <img
                src={assets.hero3}
                alt="Simplicity Blouse"
                className="w-full h-[170px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 bg-white/80 px-3 py-1 rounded-lg">
                <p className="font-medium text-gray-800 text-sm">
                  Simplicity Blouse
                </p>
                <span className="text-xs text-gray-600">$129.99</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-md group">
              <img
                src={assets.hero4}
                alt="Regal Touch Pants"
                className="w-full h-[170px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 bg-white/80 px-3 py-1 rounded-lg">
                <p className="font-medium text-gray-800 text-sm">
                  Regal Touch Pants
                </p>
                <span className="text-xs text-gray-600">$149.99</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Text */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="font-cormorant text-3xl md:text-5xl font-bold text-gray-900">
              Harmonizing Your Style <br /> and Craftsmanship
            </h1>
          </div>

          <div className="space-y-4 max-w-2xl">
            <p className="text-gray-600">
              Where fashion meets craftsmanship — uniting impeccable detailing
              with your unique style.
            </p>
            <Link
              to="/collection"
              className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-all shadow-md"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
