import React, { useState } from "react";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful");
      navigate("/"); // redirect home after login
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-10 md:px-20 py-16 space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          LOG IN TO <br />
          <span className="text-black">YOUR HUB OF</span>
          <br />
          <span className="bg-gradient-to-r from-lime-400 to-green-400 text-transparent bg-clip-text">
            KNOWLEDGE.
          </span>
        </h1>

        <p className="text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/sign-up"
            className="underline font-semibold text-gray-900 hover:text-lime-600 transition"
          >
            Create one →
          </a>
        </p>
      </div>

      {/* Right Section */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-[url('https://i.ibb.co/ZpybRbM4/photo-1568667256549-094345857637.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 w-[90%] max-w-md z-10">
          <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
            Login to your account
          </h2>
          <form onSubmit={handleSignin} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-[15px] top-[15px] cursor-pointer z-10"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black hover:bg-gray-900 text-white rounded-xl font-semibold transition"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} />
            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-lime-500 hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
