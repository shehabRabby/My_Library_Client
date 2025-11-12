import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import LatestBooks from "../Components/LatestBooks";
import { Link } from "react-router"; // updated import
import book1 from "../assets/crimson.png";
import book2 from "../assets/since.png";
import book3 from "../assets/mistry2.png";
import book4 from "../assets/fantasy.png";
import HomeStatic from "../Components/HomeStatic";

const bannerImages = [book1, book2, book3, book4];

const Home = () => {
  const data = useLoaderData();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-violet-700 to-purple-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between">
          {/* Banner Text */}
          <div className="md:w-1/2 text-center md:text-left animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
              Welcome to Book Haven
            </h1>
            <p className="text-lg sm:text-xl text-gray-100 mb-6 drop-shadow-sm">
              Explore thousands of books, discover hidden gems, and unleash your
              imagination.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start cursor-pointer">
              <Link
                to="/all-book"
                className="bg-white border border-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-violet-700 transition"
              >
                All Book
              </Link>
              <Link
                to="/add-books"
                className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-violet-700 transition"
              >
                Create Book
              </Link>
            </div>
          </div>

          {/* Banner Animation */}
          <div className="md:w-1/2 mt-20 lg:mt-10 md:mt-0 flex justify-center">
            <div className="w-64 h-64 bg-white/20 rounded-xl animate-bounce shadow-2xl flex items-center justify-center overflow-hidden">
              <img
                src={bannerImages[currentIndex]}
                alt="Book Banner"
                className=" p-5 object-contain transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* Latest Books */}
      <LatestBooks data={data} />

      <HomeStatic></HomeStatic>
    </div>
  );
};

export default Home;
