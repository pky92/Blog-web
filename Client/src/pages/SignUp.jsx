import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const SignUp = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    userId:"",
    password1: "",
    password2: "",
  });
  const [error, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility1 = () => {
    setShowPassword1((prev) => !prev);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setErrorMessage(null)
    setFormData((prev) => ({
      ...prev,
      [id]: value.trim(),
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password1, password2 , userId } = formData;

    // Validate form inputs
    if (!email || !userId || !password1 || !password2) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password1 !== password2) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4000/api/auth/signUp", {
        email:email,
        password: password1,
        userId:userId
      });

      console.log("Response data: ", res);
      if (res.status === 200) {
        // Assuming 201 is the success code for signup
        navigate("/sign-in");
      }
    } catch (error) {
      console.error(error);
       const serverMessage = error.response?.data?.message || "Signup failed. Please try again.";
          setErrorMessage(serverMessage);
    } finally {
      setLoading(false);
    }
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
            Diary
          </Link>
          <p className="mt-2 text-gray-600">
            Express yourself freely—because your ideas deserve the spotlight.
          </p>
        </div>

        <form onSubmit={submitHandler}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email <sup className="text-red-500 text-[13px]">*</sup>
            </label>
            <input
              type="text"
              id="email"
              onChange={changeHandler}
              placeholder="Enter your email "
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

           <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-bold text-gray-700">
              userId <sup className="text-red-500 text-[13px]">*</sup>
            </label>
            <input
              type="text"
              id="userId"
              onChange={changeHandler}
              placeholder="Enter your UserName "
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password1 Field */}
          <div className="mb-4 relative">
            <label htmlFor="password1" className="block text-sm font-bold text-gray-700">
              Password <sup className="text-red-500 text-[13px]">*</sup>
            </label>
            <div className="flex gap-4">
            <input
              type={showPassword1 ? "text" : "password"}
              id="password1"
              onChange={changeHandler}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility1}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-blue-500"
              aria-label="Toggle Password Visibility"
            >
              {showPassword1 ? <FaEyeSlash size={20} className="self-center mt-5 z-10 bg-white" /> : <FaEye size={20} className="self-center mt-5 z-10 bg-white" />}
            </button>
            </div>

          </div>

          {/* Confirm Password Field */}
          <div className="mb-4 relative">
            <label htmlFor="password2" className="block text-sm font-bold text-gray-700">
              Confirm Password <sup className="text-red-500 text-[13px]">*</sup>
            </label>
            <div className="flex gap-4">

            <input
              type={showPassword2 ? "text" : "password"}
              id="password2"
              onChange={changeHandler}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility2}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-blue-500"
              aria-label="Toggle Password Visibility"
            >
              {showPassword2 ? <FaEyeSlash size={20} className="self-center mt-5" /> : <FaEye size={20} className="self-center mt-5" />}
            </button>

            </div>
            
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
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
  );
};

export default SignUp;
