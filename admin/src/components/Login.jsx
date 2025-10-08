import React from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin',{email, password});
      if(response.data.success){
        setToken(response.data.token);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Panel
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-medium">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-medium py-3 rounded-lg hover:bg-amber-700 transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; 2025 Trendora Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
