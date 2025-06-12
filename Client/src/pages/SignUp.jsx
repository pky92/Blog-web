import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

  
    const togglePasswordVisibility1 = () => {
      setShowPassword1((prev) => !prev);
    };
    const togglePasswordVisibility2 = () => {
      setShowPassword2((prev) => !prev);
    };


  return (
     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 via-blue-500 to-gray-900">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <div className="text-center mb-6">
              <Link
                to="/"
                className="text-2xl font-bold text-blue-800 hover:text-blue-900"
              >
                <span className="bg-gradient-to-br from-blue-800 to-black text-white px-2 py-1 rounded">
                  Thought's
                </span>{" "}
                Dairy
              </Link>
              <p className="mt-2 text-gray-600">
                Express yourself freely—because your ideas deserve the spotlight.
              </p>
            </div>
    
            <form>
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                  Email or User ID <sup className="text-red-500 text-[13px]">*</sup>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email or user ID"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
    
              {/* Password Field */}
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                  Password <sup className="text-red-500 text-[13px]">*</sup>
                </label>
                <input
                  type={showPassword1 ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility1}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-blue-500"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword1 ? <FaEyeSlash size={20}  className="self-center mt-5"/> : <FaEye size={20}  className="self-center mt-5" />}
                </button>
              </div>

                <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                 Confirm Password <sup className="text-red-500 text-[13px]">*</sup>
                </label>
                <input
                  type={showPassword2 ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility2}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-blue-500"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword2 ? <FaEyeSlash size={20}  className="self-center mt-5"/> : <FaEye size={20}  className="self-center mt-5" />}
                </button>
              </div>
    
    
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </form>
    
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-blue-800 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
  )
}

export default SignUp