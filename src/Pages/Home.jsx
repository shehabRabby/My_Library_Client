import React, { useState, useEffect, use } from "react";
import { useLoaderData } from "react-router";
import LatestBooks from "../Components/LatestBooks";
import { Link } from "react-router";
import book1 from "../assets/new5.png";
import book2 from "../assets/new2.png";
import book3 from "../assets/new3.png";
import book4 from "../assets/new4.png";
import book5 from "../assets/new7.png";
import book6 from "../assets/new8.png";

import HomeStatic from "../Components/HomeStatic";
import { AuthContext } from "../Context/AuthProvider";

const bannerImages = [book1, book2, book3, book4, book5, book6];

const Home = () => {
  const data = useLoaderData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = use(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-base-100 text-base-content transition-colors duration-300">
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-brand-primary to-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between">
          
          {/* Banner Text */}
          <div className="md:w-1/2 text-center md:text-left animate-fadeIn z-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
              Welcome to Book Haven
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6 drop-shadow-sm">
              Explore thousands of books, discover hidden gems, and unleash your
              imagination.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/all-book"
                className="bg-white text-brand-primary font-bold px-8 py-3 rounded-lg hover:bg-brand-secondary hover:text-black transition-all duration-300 shadow-lg"
              >
                All Books
              </Link>
              <Link
                to="/add-books"
                className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-brand-primary transition-all duration-300"
              >
                Create Book
              </Link>
            </div>
          </div>

          {/* Banner Animation */}
          <div className="md:w-1/2 mt-20 lg:mt-10 md:mt-0 flex justify-center z-10">
            <div className="w-64 h-80 bg-white/10 backdrop-blur-md rounded-2xl animate-soft-bounce shadow-2xl flex items-center justify-center overflow-hidden border border-white/20">
              <img
                src={bannerImages[currentIndex]}
                alt="Book Banner"
                className="p-6 object-contain transition-all duration-500 transform hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Animated Background Shapes - Matching Brand Colors */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-secondary rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-primary rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </section>

      {/* Main Content Areas */}
      <main className="max-w-7xl mx-auto">
        {/* Latest Books */}
        <LatestBooks data={data} />

        {/* Static Sections */}
        <div className="py-10">
           <HomeStatic />
        </div>
      </main>
    </div>
  );
};

export default Home;