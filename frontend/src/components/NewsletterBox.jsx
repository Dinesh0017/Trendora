import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  }

  return (
    <section className="py-16 px-6 sm:px-10 lg:px-20 rounded-sm  text-center mt-10">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        Subscribe & Get <span className="text-amber-500">15% Off</span> Your First Purchase
      </h2>
      <p className="text-gray-600 mt-3 text-sm sm:text-base">
        Be the first to know about our latest collections, exclusive deals, and style tips.
      </p>

      {/* Form */}
      <form className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto" onSubmit={onSubmitHandler}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full sm:flex-1 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          className="bg-amber-500 text-white px-6 py-3 rounded-md sm:rounded-l-none sm:rounded-r-md font-semibold hover:bg-amber-600 transition-all duration-300 shadow-md w-full sm:w-auto cursor-pointer"
        >
          Subscribe
        </button>
      </form>

      {/* Extra note */}
      <p className="text-xs text-gray-500 mt-4">
        No spam, unsubscribe anytime.
      </p>
    </section>
  );
};

export default NewsletterBox;
