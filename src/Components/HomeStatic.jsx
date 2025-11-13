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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Top Genres */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-violet-700">
          Top Genres
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <div
              key={genre.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition"
            >
              <img
                src={genre.image}
                alt={genre.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center font-semibold text-gray-700">
                {genre.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Book of the Week */}
      <section className="flex flex-col md:flex-row items-center gap-8 bg-violet-100 rounded-xl p-6 md:p-12 shadow-lg">
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <img
            src={featuredBook.image}
            alt={featuredBook.title}
            className="w-100 h-80 object-cover rounded-lg shadow-xl"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h3 className="text-2xl font-bold text-violet-800 mb-3">
            {featuredBook.title}
          </h3>
          <p className="text-gray-600 mb-4 italic">by {featuredBook.author}</p>
          <p className="text-gray-700 mb-4">{featuredBook.description}</p>
          <Link to='/all-book' className="mt-6 px-6 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition cursor-pointer">
            Read More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeStatic;
