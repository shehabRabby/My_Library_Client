import React from "react";
import logo from "../assets/logo.png";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-violet-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">

          {/* Logo & Brand */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <img src={logo} alt="Book Haven Logo" className="w-30 h-30 mb-2" />
            <h2 className="text-2xl font-bold mb-1">Book Haven</h2>
            <p className="text-gray-300 text-sm">Developed by Md Shehab</p>
            <p className="text-gray-400 text-sm mt-1">📧 shehabrabby764@gmail.com</p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-col sm:flex-row gap-4 text-gray-300 text-sm text-center md:text-left">
            <a href="#" className="hover:text-white transition">About Us</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Jobs</a>
            <a href="#" className="hover:text-white transition">Press Kit</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400 transition"><FaFacebookF size={24} /></a>
            <a href="#" className="hover:text-gray-400 transition"><FaXTwitter size={24} /></a>
            <a href="#" className="hover:text-gray-400 transition"><FaLinkedinIn size={24} /></a>
            <a href="#" className="hover:text-gray-400 transition"><FaInstagram size={24} /></a>
          </div>

        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Copyright */}
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Book Haven. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
