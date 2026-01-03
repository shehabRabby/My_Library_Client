import React from "react";
import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter, FaCopyright } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          
          {/* Column 1: Brand Identity */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="Book Haven" className="w-16 h-16 rounded-full border-2 border-brand-primary group-hover:rotate-12 transition-transform duration-300" />
              <h2 className="text-2xl font-black text-brand-primary tracking-tighter">Book Haven</h2>
            </Link>
            <p className="text-base-content/70 text-sm leading-relaxed max-w-xs">
              Your gateway to thousands of worlds. Curating the best literature for every kind of reader.
            </p>
            <div className="flex gap-4 pt-2">
              {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 active:scale-90 shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-base-content">Navigation</h4>
            <nav className="flex flex-col space-y-2 text-base-content/70 text-sm">
              <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
              <Link to="/all-book" className="hover:text-brand-primary transition-colors">Browse Library</Link>
              <Link to="/about-us" className="hover:text-brand-primary transition-colors">About Our Vision</Link>
              <Link to="/add-books" className="hover:text-brand-primary transition-colors">Contribute Books</Link>
            </nav>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-base-content">Legal & Help</h4>
            <nav className="flex flex-col space-y-2 text-base-content/70 text-sm">
              <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Copyright Info</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Press Kit</a>
            </nav>
          </div>

          {/* Column 4: Newsletter/Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-base-content">Contact Us</h4>
            <div className="space-y-2 text-sm text-base-content/70">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-brand-primary">📧</span> shehabrabby764@gmail.com
              </p>
              <p className="text-xs italic mt-4 opacity-60 font-medium">Developed by Md Shehab</p>
            </div>
            {/* Minimalist divider for mobile visibility */}
            <div className="h-1 w-12 bg-brand-secondary rounded-full mx-auto md:mx-0"></div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-base-300 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-base-content/50 text-xs flex items-center gap-1">
            <FaCopyright /> {new Date().getFullYear()} Book Haven. Crafted for Book Lovers.
          </p>
          <div className="flex gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all text-[10px] font-bold uppercase tracking-widest text-base-content">
             <span>Innovation</span>
             <span>Literature</span>
             <span>Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;