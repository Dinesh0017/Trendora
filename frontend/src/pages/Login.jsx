import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Registration successful!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Login successful!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error during authentication:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

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
          onChange={(e) => setName(e.target.value)}
          value={name}
          disabled={isLoading}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
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
      <button
        type="submit"
        className="w-full bg-amber-500 text-white font-medium rounded-md px-3 py-2 mt-4 hover:bg-amber-600 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingSpinner message={currentState === "Login" ? "Logging in..." : "Signing up..."} />
        ) : currentState === "Login" ? (
          "Login"
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default Login;
