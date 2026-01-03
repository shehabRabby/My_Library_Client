import React, { useState, useEffect, useContext } from "react";
import { useLoaderData, Link } from "react-router";
import LatestBooks from "../Components/LatestBooks";
import HomeStatic from "../Components/HomeStatic";
import { AuthContext } from "../Context/AuthProvider";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaMouse } from "react-icons/fa";

// Requirement: Local assets used in a structured array
import book1 from "../assets/new5.png";
import book2 from "../assets/new2.png";
import book3 from "../assets/new3.png";
import book4 from "../assets/new4.png";
import book5 from "../assets/new7.png";
import book6 from "../assets/new8.png";
import CategoryGrid from "../Components/Home/CategoryGrid";
import Testimonials from "../Components/Home/Testimonials";
import FaqSection from "../Components/Home/FaqSection";
import Newsletter from "../Components/Home/NewsLatter";

const bannerImages = [book1, book2, book3, book4, book5, book6];

const Home = () => {
  const data = useLoaderData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useContext(AuthContext);

  // REQUIREMENT: Interactive (Auto control)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // REQUIREMENT: Interactive (Manual controls)
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      
      {/* REQUIREMENT: Hero Section Max height 60–70% of screen */}
      <section className="relative h-[65vh] min-h-[500px] w-full bg-brand-primary overflow-hidden group">
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-10">
          
          {/* Banner Text Area */}
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none animate-fadeIn">
              Welcome to <br />
              <span className="text-brand-secondary">Book Haven</span>
            </h1>
            <p className="text-lg text-white/80 max-w-md font-medium">
              Explore thousands of books, discover hidden gems, and unleash your imagination in our digital sanctuary.
            </p>

            {/* REQUIREMENT: Interactive CTA */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <Link to="/all-book" className="flex items-center gap-2 bg-brand-secondary text-black font-black px-8 py-4 rounded-2xl hover:bg-white transition-all shadow-xl active:scale-95">
                ALL BOOKS <FaArrowRight />
              </Link>
              <Link to="/add-books" className="px-8 py-4 border-2 border-white/20 text-white font-black rounded-2xl hover:bg-white/10 transition-all">
                CREATE BOOK
              </Link>
            </div>
          </div>

          {/* REQUIREMENT: Slider Display */}
          <div className="md:w-1/2 flex justify-center relative mt-12 md:mt-0">
            <div className="relative w-64 h-80 md:w-80 md:h-[400px] bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 p-8 shadow-2xl flex items-center justify-center transition-transform duration-700 hover:rotate-3">
              <img
                key={currentIndex}
                src={bannerImages[currentIndex]}
                alt="Featured Book"
                className="w-full h-full object-contain animate-fadeInScale"
              />
            </div>
          </div>
        </div>

        {/* REQUIREMENT: Manual Control Arrows (Visible on hover) */}
        <button onClick={handlePrev} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 text-white hover:bg-brand-secondary hover:text-black opacity-0 group-hover:opacity-100 transition-all z-20">
          <FaChevronLeft size={24} />
        </button>
        <button onClick={handleNext} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 text-white hover:bg-brand-secondary hover:text-black opacity-0 group-hover:opacity-100 transition-all z-20">
          <FaChevronRight size={24} />
        </button>

        {/* REQUIREMENT: Visual Hint to next section */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
            <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Scroll Down</p>
            <FaMouse className="text-brand-secondary animate-bounce" />
        </div>

        {/* Manual Progress Indicators (Dots) */}
        <div className="absolute bottom-10 right-10 flex gap-2">
            {bannerImages.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-brand-secondary" : "w-2 bg-white/30"}`}
                />
            ))}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Latest Books */}
        <div className="py-2">
            <LatestBooks data={data} />
        </div>

           {/* Static Sections */}
        <div className="pb-2">
           <HomeStatic />
        </div>

        <div className="py-2">
          <CategoryGrid></CategoryGrid>
        </div>

        <div className="py-2">
            <Testimonials></Testimonials>
        </div>
        <div className="py-2">
            <FaqSection></FaqSection>
        </div>
        <div className="py-2">
            <Newsletter></Newsletter>
        </div>


     
      </main>
    </div>
  );
};

export default Home;