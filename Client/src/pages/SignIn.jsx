import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Oauth from "../components/Oauth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setErrorMessage(null);
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage(null);
      setLoading(true);

      const { email, password } = formData;
      const res = await axios.post("http://localhost:4000/api/auth/signIn", {
        email,
        password,
      });

      console.log("Sign-In response:", res);
      if (res.data.success) {
        console.log("Successfully signed in!");
        setErrorMessage(null);
        navigate("/home");
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Sign-In Error:", error);
      const serverErr = error.response?.data?.message || "Sign-In Failed. Try again!";
      setErrorMessage(serverErr);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 via-blue-500 to-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="text-2xl font-bold text-blue-800 hover:text-blue-900">
            <span className="bg-gradient-to-br from-blue-800 to-black text-white px-2 py-1 rounded">
              Thought's
            </span>{" "}
            Diary
          </Link>
          <p className="mt-2 text-gray-600">
            Express yourself freely—because your ideas deserve the spotlight.
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email or User ID <sup className="text-red-500 text-[13px]">*</sup>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email or user ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={changeHandler}
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password <sup className="text-red-500 text-[13px]">*</sup>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={changeHandler}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-blue-500"
              aria-label="Toggle Password Visibility"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div>
            <button
              type="submit"
              className={`w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <Oauth/>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-800 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
