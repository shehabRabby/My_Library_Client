import React from "react";
import fantasyImg from "../assets/new4.png";
import scienceImg from "../assets/new2.png";
import mistryImg from "../assets/new1.png";
import romanceImg from "../assets/new3.png";
import whitehere from "../assets/new7.png";
import { Link } from "react-router";

const genres = [
  { name: "Fantasy", image: fantasyImg },
  { name: "Science Fiction", image: scienceImg },
  { name: "Mystery", image: mistryImg },
  { name: "Romance", image: romanceImg },
];

const featuredBook = {
  title: "The Crimson Heir",
  author: "Isabella Moore",
  image: whitehere,
  description:
    "Born into exile, a royal child discovers her bloodline carries a curse that destroyed her kingdom. To reclaim her throne, she must tame the fire within and navigate a world of intrigue, betrayal, and hidden magic.",
};

const HomeStatic = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      {/* Top Genres */}
      <section>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-brand-primary dark:text-brand-secondary transition-colors duration-300">
          Explore Top Genres
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <div
              key={genre.name}
              className="bg-base-100 border border-base-200 rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition-all duration-300 group cursor-pointer"
            >
              <div className="overflow-hidden h-40">
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center font-bold text-base-content group-hover:text-brand-primary transition-colors">
                {genre.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Book of the Week - Featured Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 bg-base-200 dark:bg-brand-primary/10 rounded-2xl p-8 md:p-14 shadow-xl border border-base-300 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src={featuredBook.image}
              alt={featuredBook.title}
              className="relative w-72 h-96 object-cover rounded-lg shadow-2xl transform group-hover:rotate-2 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="md:w-1/2 text-center md:text-left space-y-5">
          <div className="inline-block px-4 py-1 bg-brand-secondary text-black text-xs font-bold rounded-full mb-2 uppercase tracking-widest">
            Book of the Week
          </div>
          <h3 className="text-3xl font-black text-brand-primary dark:text-white leading-tight">
            {featuredBook.title}
          </h3>
          <p className="text-brand-primary font-medium italic">by {featuredBook.author}</p>
          <p className="text-base-content/80 text-lg leading-relaxed">
            {featuredBook.description}
          </p>
          <div className="pt-4">
            <Link 
              to='/all-book' 
              className="inline-block px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark shadow-lg shadow-brand-primary/30 transition-all duration-300 active:scale-95"
            >
              Start Reading
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeStatic;