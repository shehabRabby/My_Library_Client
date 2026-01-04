import React from "react";
import { Link, useRouteError } from "react-router";
import { FaBookOpen, FaHome, FaSearch } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 relative overflow-hidden px-4">
      
      {/* ANIMATED BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[15%] w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
      </div>

      {/* FLOATING BOOK ICONS */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <FaBookOpen className="absolute top-20 left-[20%] text-brand-primary text-6xl animate-float" />
        <FaBookOpen className="absolute bottom-40 right-[25%] text-brand-secondary text-4xl animate-float [animation-delay:1s]" />
        <FaSearch className="absolute top-1/2 left-[10%] text-brand-primary text-3xl animate-float [animation-delay:1.5s]" />
      </div>

      {/* MAIN ERROR CARD */}
      <div className="max-w-2xl w-full bg-base-100/40 backdrop-blur-xl border border-base-300 p-12 md:p-20 rounded-[4rem] shadow-2xl text-center relative z-10 animate-fadeInUp">
        
        {/* 404 WITH GRADIENT */}
        <h1 className="text-[12rem] md:text-[15rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-purple-900 select-none">
          404
        </h1>

        <div className="space-y-4 -mt-8 md:-mt-12">
          <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter">
            Misplaced <span className="text-brand-primary">Volume.</span>
          </h2>
          
          <p className="text-base-content/60 font-medium text-lg max-w-md mx-auto leading-relaxed italic">
            "{error?.statusText || error?.message || "This page has been removed from our archives or never existed in our sanctuary."}"
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="group flex items-center gap-3 bg-brand-primary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:bg-brand-dark transition-all active:scale-95"
          >
            <FaHome className="group-hover:-translate-y-1 transition-transform" />
            Return Home
          </Link>
          
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-3 bg-base-200 text-base-content px-10 py-4 rounded-2xl font-black uppercase tracking-widest border border-base-300 hover:bg-base-300 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>

      {/* FOOTER METADATA */}
      <p className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-base-content/30 relative z-10">
        Book Haven Management System • Error Log 404
      </p>

      {/* CUSTOM ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}} />
    </div>
  );
};

export default ErrorPage;