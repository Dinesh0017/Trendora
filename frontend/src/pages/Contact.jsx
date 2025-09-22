import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/images/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <section>
      {/* Page Title */}
      <div className="text-center text-2xl pt-10">
        <Title text1={"CONTACT "} text2={"US"} />
      </div>

      {/* Contact Section */}
      <div className="my-12 flex flex-col md:flex-row items-center md:items-start gap-12 px-4 lg:px-20">
        {/* Contact Image */}
        <img
          src={assets.contact_img}
          alt="Contact Us"
          className="w-full md:max-w-[420px] lg:max-w-[480px] rounded-lg shadow-lg object-cover"
        />

        {/* Contact Details */}
        <div className="flex flex-col justify-center gap-8 w-full max-w-xl text-gray-700">
          {/* Store Info */}
          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">
              Our Store
            </h3>
            <p className="leading-relaxed">
              485 7th Ave
              <br />
              Suite 100
              <br />
              New York, NY 10018
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Phone: <span className="font-medium">(123) 456-7890</span>
              <br />
              Email:{" "}
              <span className="font-medium">support@trendora.com</span>
            </p>
          </div>

          {/* Careers Info */}
          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">
              Careers at Trendora
            </h3>
            <p className="text-gray-600 mb-4">
              Join our team and help us shape the future of digital shopping.
            </p>
            <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-300 cursor-pointer">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-50 py-10 px-4">
        <NewsletterBox />
      </div>
    </section>
  );
};

export default Contact;
