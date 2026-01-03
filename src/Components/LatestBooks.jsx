import React from "react";
import BookCard from "./BookCard";

const LatestBooks = ({ data }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary dark:text-brand-secondary transition-colors duration-300">
          Latest Books Collection
        </h2>
        <div className="w-24 h-1 bg-brand-secondary mx-auto mt-4 rounded-full"></div>
        <p className="text-base-content/70 mt-4 text-sm md:text-base max-w-md mx-auto">
          Discover the most recently added gems in our library, curated just for you.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {data?.length > 0 ? (
          data.map((book, index) => (
            <BookCard key={book._id || index} book={book} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <span className="loading loading-dots loading-lg text-brand-primary"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestBooks;