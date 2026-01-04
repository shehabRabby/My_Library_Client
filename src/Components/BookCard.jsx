import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  const { _id, coverImage, title, rating, genre, author } = book || {};
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="bg-base-100 border border-base-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-[320px] overflow-hidden">
      
      {/* Cover Image Container */}
      <div className="relative h-[65%] bg-base-300 rounded-t-xl overflow-hidden">
        
        {/* SKELETON  visible until image loads */}
        {!isImageLoaded && (
          <div className="absolute inset-0 z-10 bg-base-300 animate-pulse flex items-center justify-center">
             {/*  text in the center of the skeleton */}
             <span className="text-base-content/10 font-black uppercase tracking-widest text-[10px]">Loading Image...</span>
          </div>
        )}

        <img
          src={coverImage || "https://via.placeholder.com/400x600?text=No+Image"}
          alt={title}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        
        {/* Hidden until image is ready to prevent elements */}
        {isImageLoaded && (
          <>
            {rating && (
              <div className="absolute top-2 right-2 bg-brand-accent/90 backdrop-blur-sm text-black font-bold px-2 py-0.5 rounded-lg text-xs flex items-center gap-1 shadow-sm animate-fadeIn">
                {rating} <FaStar className="text-[10px]" />
              </div>
            )}
            <div className="absolute bottom-2 left-2 animate-fadeIn">
              <span className="bg-brand-primary/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md uppercase tracking-tighter font-semibold">
                {genre || "General"}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Book Info */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-base-100">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-base-content line-clamp-1 group-hover:text-brand-primary transition-colors">
            {title || "Untitled"}
          </h2>
          <p className="text-base-content/60 text-xs italic truncate">
            {author ? `by ${author}` : "Unknown Author"}
          </p>
        </div>

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