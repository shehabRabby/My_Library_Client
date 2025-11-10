import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOff } from "react-icons/io5";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";


const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email,password)

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        toast.success("Login Sucessfull");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfull");
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  console.log(user);
  return (
    <div>
      <div>
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
          {/* Left Side - Text Section */}
          <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-10 md:px-20 py-16 space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              POWERED BY <br />
              <span className="text-black">CREATORS AROUND</span>
              <br />
              <span className="bg-gradient-to-r from-lime-400 to-green-400 text-transparent bg-clip-text">
                THE WORLD.
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

            <div className="bg-black text-white p-6 rounded-2xl max-w-md">
              <p className="text-sm leading-relaxed">
                Over <span className="font-semibold">3 million</span>{" "}
                high-resolution images brought to you by the world’s most
                generous community of creators.
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            {user ? (
              <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 w-[90%] max-w-md z-10">
                <div>
                  <img
                    src={user?.photoURL || "https://i.pravatar.cc/100"}
                    alt=""
                    className="h-30 w-30 rounded-full mx-auto "
                  />
                </div>
                <h2 className="tyext-xl font-normal text-black">
                  {user?.displayName}
                </h2>
                <button onClick={handleSignOut} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            ) : (
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
                      {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="accent-lime-400"
                      />
                      <label htmlFor="remember" className="text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <a
                      href="/forgot-password"
                      className="text-gray-800 hover:underline font-medium"
                    >
                      Forgot password?
                    </a>
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

                <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition">
                  <FcGoogle size={22} />
                  <span className="font-medium text-gray-700">
                    Continue with Google
                  </span>
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Don’t have an account?{" "}
                  <a
                    href="/sign-up"
                    className="font-semibold text-lime-500 hover:underline"
                  >
                    Register
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
