import React from "react";
import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter, FaCopyright } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-content/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          
          {/* Column 1: Brand Identity */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Book Haven" 
                className="w-14 h-14 rounded-2xl border border-brand-primary/20 group-hover:rotate-6 transition-transform duration-300 shadow-lg" 
              />
              <h2 className="text-2xl font-black text-brand-primary tracking-tighter">
                HAVEN<span className="text-brand-secondary">.</span>
              </h2>
            </Link>
            <p className="text-base-content/60 text-sm leading-relaxed max-w-xs">
              A digital sanctuary for curators and book lovers. Archiving knowledge, one volume at a time.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { Icon: FaFacebookF, link: "https://facebook.com" },
                { Icon: FaXTwitter, link: "https://twitter.com" },
                { Icon: FaLinkedinIn, link: "https://linkedin.com" },
                { Icon: FaInstagram, link: "https://instagram.com" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 active:scale-90"
                >
                  <social.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links - Updated with Router Paths */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary">Navigation</h4>
            <nav className="flex flex-col space-y-3 text-sm font-bold">
              <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
              <Link to="/all-book" className="hover:text-brand-primary transition-colors">All Books</Link>
              <Link to="/about-us" className="hover:text-brand-primary transition-colors">About Us</Link>
              <Link to="/my-profile" className="hover:text-brand-primary transition-colors">My Profile</Link>
            </nav>
          </div>

          {/* Column 3: Curator Actions - Updated with Router Paths */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary">Curator Desk</h4>
            <nav className="flex flex-col space-y-3 text-sm font-bold">
              <Link to="/add-books" className="hover:text-brand-primary transition-colors">Add New Book</Link>
              <Link to="/my-books" className="hover:text-brand-primary transition-colors">My Collections</Link>
              <Link to="/sign-in" className="hover:text-brand-primary transition-colors">Login to Archive</Link>
              <Link to="/sign-up" className="hover:text-brand-primary transition-colors">Join Community</Link>
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary">Contact Info</h4>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="p-2 bg-brand-secondary/20 text-brand-primary rounded-lg">
                  <FaEnvelope />
                </div>
                <span className="opacity-70">shehabrabby764@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="p-2 bg-brand-secondary/20 text-brand-primary rounded-lg">
                  <FaMapMarkerAlt />
                </div>
                <span className="opacity-70">Dhaka, Bangladesh</span>
              </div>
              <div className="pt-4">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Lead Developer</p>
                <p className="text-sm font-bold">Md Shehab</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-base-content/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-base-content/40 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <FaCopyright className="text-brand-secondary" /> {new Date().getFullYear()} Book Haven Sanctuary.
          </p>
          
          <div className="flex gap-8 items-center">
            <div className="flex gap-4 text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
               <span className="hover:text-brand-primary transition-colors cursor-default">Privacy</span>
               <span className="hover:text-brand-primary transition-colors cursor-default">Terms</span>
            </div>
            {/* Minimalist Visual Brand Hint */}
            <div className="h-1 w-12 bg-brand-secondary rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;