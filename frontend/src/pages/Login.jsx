import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-sm m-auto mt-16 gap-5 text-gray-800 mb-16"
    >
      {/* Heading */}
      <div className="inline-flex items-center gap-2 mb-4">
        <p className="bodoni-moda text-3xl font-semibold tracking-wide">
          {currentState}
        </p>
        <span className="block h-[2px] w-10 bg-gray-800 rounded-full"></span>
      </div>

      {/* Inputs */}
      {currentState === "Login" ? null : (
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
        required
      />

      {/* Links */}
      <div className="w-full flex justify-between text-xs sm:text-sm text-gray-600">
        <p className="cursor-pointer hover:text-amber-600">
          Forgot your password?
        </p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer font-medium text-amber-600 hover:underline"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create an account
          </p>
        ) : (
          <p
            className="cursor-pointer font-medium text-amber-600 hover:underline"
            onClick={() => setCurrentState("Login")}
          >
            Already have an account?
          </p>
        )}
      </div>

      {/* Button */}
      <button className="w-full bg-amber-500 text-white font-medium rounded-md px-3 py-2 mt-4 hover:bg-amber-600 transition-colors duration-300 cursor-pointer">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
