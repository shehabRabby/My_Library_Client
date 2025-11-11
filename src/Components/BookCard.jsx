import React from 'react';
import { Link } from 'react-router';

const BookCard = ({ book }) => {
  const { coverImage, title, rating, genre, author } = book || {};

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
      {/* Cover Image */}
      <div className="relative">
        <img
          src={coverImage || 'https://via.placeholder.com/400x600?text=No+Image'}
          alt={title}
          className="w-full h-64 sm:h-72 md:h-80 object-cover"
        />
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white font-bold px-3 py-1 rounded-full text-xs sm:text-sm shadow-md">
            {rating} ★
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-5 flex flex-col justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 line-clamp-1">
          {title || 'Untitled'}
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          {genre || 'Unknown Genre'}
        </p>
        {author && (
          <p className="text-gray-400 text-sm italic mt-1">
            by {author}
          </p>
        )}

        {/* Button */}
        <Link to='/all-book' className="mt-5 w-full text-center bg-violet-600 text-white py-2 rounded-lg font-medium shadow-md hover:bg-violet-700 transition-colors duration-200">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
