import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import { FaEye, FaUnlockAlt, FaEnvelope } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back to the Sanctuary");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Welcome back to the Sanctuary");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-100 overflow-hidden">
      
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-center items-start w-full md:w-5/12 px-10 md:px-24 py-16 space-y-8 bg-base-100 relative">
        {/* Subtle Background */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 animate-fadeInLeft">
            <span className="bg-brand-secondary/20 text-brand-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 inline-block border border-brand-secondary/30">
                Member Access
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] text-base-content tracking-tighter">
              ACCESS <br />
              <span className="text-brand-primary">YOUR VOID OF</span>
              <br />
              <span className="bg-gradient-to-r from-brand-secondary to-lime-500 text-transparent bg-clip-text">
                WISDOM.
              </span>
            </h1>

            <div className="mt-12 space-y-4">
                <p className="text-base-content/50 font-medium max-w-xs leading-relaxed">
                  Enter the archives and continue your journey through the world's most prestigious digital collection.
                </p>
                <div className="pt-4">
                    <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest mb-2">New Curator?</p>
                    <Link
                      to="/sign-up"
                      className="inline-flex items-center gap-2 font-black text-brand-primary group underline underline-offset-8 decoration-brand-secondary hover:text-brand-dark transition-all"
                    >
                      Create your credentials <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="relative w-full md:w-7/12 flex items-center justify-center p-6">
        {/* Background Image */}
        <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000')] bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
        ></div>
        
        {/* Overlay Layers */}
        <div className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>

        {/* LOGIN CARD */}
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-[3rem] border border-white/20 shadow-2xl p-10 md:p-14 w-full max-w-lg z-10 animate-fadeInRight">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white tracking-tighter mb-2">
              Welcome Back
            </h2>
            <p className="text-white/60 text-sm font-medium">Verify your identity to proceed</p>
          </div>

          <form onSubmit={handleSignin} className="space-y-6">
            <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-secondary ml-4 opacity-70">Email Address</label>
                <div className="relative">
                    <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-secondary transition-colors" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="curator@haven.com"
                      className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:bg-white/10 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-secondary ml-4 opacity-70">Security Key</label>
                <div className="relative">
                    <FaUnlockAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-secondary transition-colors" />
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      required
                      placeholder="••••••••"
                      className="w-full pl-14 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:bg-white/10 transition-all font-medium"
                    />
                    <span
                      onClick={() => setShow(!show)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-white/30 hover:text-white transition-colors"
                    >
                      {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
                    </span>
                </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-brand-secondary hover:bg-lime-400 text-black rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-secondary/20 transition-all active:scale-95 mt-4"
            >
              Sign In
            </button>
          </form>

          {/* SOCIAL LOGIN */}
          <div className="flex items-center my-10">
            <div className="flex-grow h-px bg-white/10"></div>
            <span className="px-4 text-white/30 text-[10px] font-black uppercase tracking-widest">Gateway</span>
            <div className="flex-grow h-px bg-white/10"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-4 bg-white/5 border border-white/10 py-5 rounded-2xl hover:bg-white/10 text-white transition-all group active:scale-95"
          >
            <FcGoogle size={24} className="group-hover:scale-110 transition-transform" />
            <span className="font-black uppercase text-xs tracking-widest">
              Continue with Google
            </span>
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
      `}} />
    </div>
  );
};

export default Login;