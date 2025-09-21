import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/images/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <section>
      {/* About Section */}
      <div className="text-2xl text-center pt-8">
        <Title text1="ABOUT " text2="US" />
      </div>

<div className="mb-16 mt-6 px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-16">
  {/* About Image */}
  <div className="relative flex justify-center">
    <img
      className="w-full max-w-md lg:max-w-lg rounded-2xl shadow-lg object-cover"
      src={assets.about_img}
      alt="About Us"
    />
    {/* Decorative Accent */}
    <div className="absolute -z-10 top-6 left-6 w-3/4 h-3/4 bg-primary/10 rounded-2xl"></div>
  </div>

  {/* About Content */}
  <div className="flex flex-col justify-center gap-6 text-gray-600">
    <p className="leading-relaxed">
      Forever was founded in 2020 with a clear vision: to bridge the gap between 
      creativity and technology. What started as a small group of passionate 
      developers and designers has grown into a full-fledged digital solutions 
      company trusted by clients across industries.
    </p>
    <p className="leading-relaxed">
      We specialize in creating modern, responsive, and user-friendly websites 
      and applications that not only look beautiful but also perform seamlessly. 
      From e-commerce platforms to corporate websites and custom web apps, we 
      bring ideas to life with cutting-edge technologies and innovative design 
      strategies. Every project we take on is backed by thorough research, 
      attention to detail, and a relentless pursuit of quality.
    </p>
    <b className="text-gray-900 text-xl">Our Mission</b>
    <p className="leading-relaxed">
      Our mission is to empower businesses with digital tools that spark growth, 
      efficiency, and customer engagement. We don’t just deliver products — we 
      build long-term partnerships with our clients. By combining innovation, 
      creativity, and technical expertise, we help brands establish a strong 
      online presence and achieve measurable success.
    </p>
    <p className="leading-relaxed">
      At Forever, we believe in continuous learning and adapting to the 
      ever-evolving digital landscape. Whether it’s exploring new design trends, 
      experimenting with emerging technologies, or refining our processes, we 
      are committed to staying ahead of the curve.
    </p>
  </div>
</div>


      {/* Why Choose Us Section */}
      <div className="text-2xl text-center my-10">
        <Title text1={"WHY "} text2={"CHOOSE US?"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <div className="border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition p-8 flex flex-col gap-4 bg-white">
          <b className="text-lg text-gray-800">Quality Assurance</b>
          <p className="text-gray-600 text-sm leading-relaxed">
            Every solution we create undergoes rigorous testing and review. From
            performance optimization to cross-platform compatibility, we ensure
            that the final product is robust, reliable, and exceeds industry
            standards.
          </p>
        </div>

        <div className="border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition p-8 flex flex-col gap-4 bg-white">
          <b className="text-lg text-gray-800">Client-Centered Approach</b>
          <p className="text-gray-600 text-sm leading-relaxed">
            We don’t believe in one-size-fits-all. By taking the time to deeply
            understand your goals and audience, we tailor every project to match
            your unique vision. Your success is our success, and that mindset
            drives everything we do.
          </p>
        </div>

        <div className="border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition p-8 flex flex-col gap-4 bg-white md:col-span-2 lg:col-span-1">
          <b className="text-lg text-gray-800">Dedicated Support</b>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our commitment doesn’t end when a project is delivered. We offer
            continuous support, maintenance, and upgrades to ensure your digital
            presence stays strong, secure, and ahead of competitors. Whenever
            you need us, we’re just a call or message away.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </section>
  );
};

export default About;
