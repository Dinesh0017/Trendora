import React from "react";
import { assets } from "../assets/images/assets";

const OurPolicy = () => {
  const policies = [
    {
      id: 1,
      icon: assets.exchange_icon,
      title: "Easy Exchange",
      desc: "Enjoy hassle-free product exchanges anytime.",
    },
    {
      id: 2,
      icon: assets.quality_icon,
      title: "7-Day Returns",
      desc: "Return products within 7 days with no extra charges.",
    },
    {
      id: 3,
      icon: assets.support_img,
      title: "24/7 Support",
      desc: "Our support team is always available to assist you.",
    },
    {
      id: 4,
      icon: assets.shipping_icon,
      title: "Fast Delivery",
      desc: "Quick & reliable shipping across all regions.",
    },
    {
      id: 5,
      icon: assets.secure_icon,
      title: "Secure Payments",
      desc: "All transactions are encrypted & 100% safe.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 sm:px-10 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center"
          >
            <img
              className="w-14 h-14 mb-4"
              src={policy.icon}
              alt={policy.title}
            />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              {policy.title}
            </h3>
            <p className="text-sm text-gray-500">{policy.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;
