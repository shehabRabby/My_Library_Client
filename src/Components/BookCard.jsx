import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  const { _id, coverImage, title, rating, genre, author } = book || {};

  return (
    <div className="bg-base-100 border border-base-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-[420px]">
      {/* Cover Image Container - Reduced Height */}
      <div className="relative h-[65%] overflow-hidden bg-base-300 rounded-t-xl">
        <img
          src={coverImage || "https://via.placeholder.com/400x600?text=No+Image"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Rating Overlay - Top Right */}
        {rating && (
          <div className="absolute top-2 right-2 bg-brand-accent/90 backdrop-blur-sm text-black font-bold px-2 py-0.5 rounded-lg text-xs flex items-center gap-1 shadow-sm">
            {rating} <FaStar className="text-[10px]" />
          </div>
        )}

        {/* Genre Overlay - Bottom Left */}
        <div className="absolute bottom-2 left-2">
          <span className="bg-brand-primary/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md uppercase tracking-tighter font-semibold">
            {genre || "General"}
          </span>
        </div>
      </div>

      {/* Book Info - Compact Layout */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-base-100 rounded-b-xl">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-base-content line-clamp-1 group-hover:text-brand-primary transition-colors leading-tight">
            {title || "Untitled"}
          </h2>
          {author && (
            <p className="text-base-content/60 text-xs italic truncate">
              by {author}
            </p>
          )}
        </div>

        {/* Compact Action Button */}
        <Link
          to={`/book-details/${_id}`}
          className="w-full text-center bg-brand-primary/10 text-brand-primary py-2 rounded-lg text-xs font-bold hover:bg-brand-primary hover:text-white transition-all duration-300 active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;