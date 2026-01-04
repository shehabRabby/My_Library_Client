import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import { FaEye, FaUserCircle, FaIdCard, FaLock, FaCameraRetro } from "react-icons/fa";
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
      toast.error("Security keys must be at least 6 characters");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: name,
        photoURL: photo || "https://i.ibb.co/3N1RzRj/default-user.png",
      });
      await auth.signOut();
      toast.success("Identity Created. Please Authenticate.");
      navigate("/sign-in");
    } catch (e) {
      toast.error(e.message || "Archive registration failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Global Identity Verified");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden font-sans py-12">
      
      {/* AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[150px] animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 relative z-10 mx-4 shadow-2xl rounded-[3.5rem] overflow-hidden border border-white/5">
        
        {/* LEFT PANEL:  BRANDING */}
        <div className="lg:col-span-5 bg-white p-12 md:p-16 flex flex-col justify-between space-y-12">
          <div className="animate-fadeInLeft">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-brand-secondary">
                <FaUserCircle size={22} />
              </div>
              <span className="font-black tracking-[0.3em] uppercase text-[10px]">New Curator</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-black leading-[0.9] tracking-tighter mb-8">
              JOIN THE <br /> 
              <span className="text-brand-primary italic">THINKERS.</span>
            </h1>
            
            <p className="text-black/50 font-medium leading-relaxed max-w-xs text-lg">
              Unlock access to a worldwide network of shared wisdom and intellectual archives.
            </p>
          </div>

          <div className="space-y-6 animate-fadeInLeft [animation-delay:200ms]">
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-[2.5rem]">
              <p className="text-sm font-medium text-black/70 italic">
                "Over <span className="text-brand-primary font-black">3 million</span> curators connect here daily to build the future of knowledge."
              </p>
            </div>
            
            <p className="text-xs font-bold text-black/40 uppercase tracking-widest pl-4">
              Registered already?{" "}
              <Link to="/sign-in" className="text-brand-primary underline underline-offset-4 hover:text-black transition-colors ml-2">
                Enter Sanctuary →
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: REGISTRATION  */}
        <div className="lg:col-span-7 bg-[#111] p-10 md:p-16 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto animate-fadeInRight">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Create Credentials</h2>
            <p className="text-white/40 text-sm mb-10 font-medium">Define your curator profile</p>

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Floating Input: Name */}
              <div className="relative group">
                <FaIdCard className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-secondary transition-colors" />
                <input type="text" name="name" required placeholder="Full Name"
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-brand-secondary transition-all font-medium placeholder:text-white/20" />
              </div>

              {/* Floating Input: Email */}
              <div className="relative group">
                <FaIdCard className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-secondary transition-colors opacity-0" />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20">@</div>
                <input type="email" name="email" required placeholder="Email Identity"
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-brand-secondary transition-all font-medium placeholder:text-white/20" />
              </div>

              {/* Floating Input: Photo */}
              <div className="relative group">
                <FaCameraRetro className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-secondary transition-colors" />
                <input type="url" name="photo" placeholder="Avatar Image URL (Optional)"
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-brand-secondary transition-all font-medium placeholder:text-white/20" />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-secondary transition-colors" />
                <input type={show ? "text" : "password"} name="password" required placeholder="Security Key"
                  className="w-full pl-14 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-brand-secondary transition-all font-medium placeholder:text-white/20" />
                <span onClick={() => setShow(!show)} className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer text-white/20 hover:text-white">
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3 py-2 pl-2">
                <input type="checkbox" id="privacy" required className="w-5 h-5 accent-brand-secondary bg-transparent border-white/20 rounded cursor-pointer" />
                <label htmlFor="privacy" className="text-xs text-white/40 font-medium cursor-pointer hover:text-white/60 transition-colors">
                  I commit to the <span className="text-brand-secondary underline">Sanctuary Privacy Protocol</span>
                </label>
              </div>

              <button type="submit" className="w-full py-5 bg-brand-secondary hover:bg-brand-primary text-black hover:text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-secondary/10 transition-all active:scale-95 cursor-pointer">
                Initiate Account
              </button>
            </form>

            <div className="relative my-8 flex items-center">
                <div className="flex-grow h-px bg-white/5"></div>
                <span className="px-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Or Global Identity</span>
                <div className="flex-grow h-px bg-white/5"></div>
            </div>

            <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-4 py-5 bg-transparent border border-white/10 rounded-2xl text-white font-bold hover:bg-white/5 transition-all group cursor-pointer">
              <FcGoogle size={22} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest font-black">Google Protocol</span>
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};

export default Register;