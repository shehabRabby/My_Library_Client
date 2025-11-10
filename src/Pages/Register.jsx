import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password Should be at least 6 character");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with displayName and photoURL
      await updateProfile(res.user, {
        displayName: name,
        photoURL: photo || "https://i.pravatar.cc/100",
      });
      await auth.signOut();

      toast.success("Register Successful! Please Login");
      navigate("/sign-in"); // auto-login redirect
    } catch (e) {
      console.log(e);
      if (e.code === "auth/email-already-in-use") {
        toast.error("User already exists in database");
      } else if (e.code === "auth/weak-password") {
        toast.error("At least 6 characters needed");
      } else if (e.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else if (e.code === "auth/operation-not-allowed") {
        toast.error("Email/password accounts are not enabled");
      } else if (e.code === "auth/network-request-failed") {
        toast.error("Network error, please try again");
      } else if (e.code === "auth/too-many-requests") {
        toast.error("Too many requests, please try later");
      } else {
        toast.error("Something went wrong, please try again");
      }
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
    <div>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Left Side - Text Section */}
        <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-10 md:px-20 py-16 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            JOIN THE <br />
            <span className="text-black">CREATORS AROUND</span>
            <br />
            <span className="bg-gradient-to-r from-lime-400 to-green-400 text-transparent bg-clip-text">
              THE WORLD.
            </span>
          </h1>

          <p className="text-gray-500">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="underline font-semibold text-gray-900 hover:text-lime-600 transition"
            >
              Login →
            </a>
          </p>

          <div className="bg-black text-white p-6 rounded-2xl max-w-md">
            <p className="text-sm leading-relaxed">
              Over <span className="font-semibold">3 million</span> creators
              joined our growing community — building, sharing, and inspiring
              together every day.
            </p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 w-[90%] max-w-md z-10">
            <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
              Create an Account
            </h2>

            {/* form here  */}
            <form onSubmit={handleSignup} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
              />

              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
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
                  {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  id="privacy"
                  className="accent-lime-400"
                />
                <label htmlFor="privacy" className="text-gray-600">
                  I accept the{" "}
                  <span className="text-lime-500 underline cursor-pointer">
                    Privacy Policy
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black hover:bg-gray-900 text-white rounded-xl font-semibold transition"
              >
                Create Account
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
                href="/sign-in"
                className="font-semibold text-lime-500 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
