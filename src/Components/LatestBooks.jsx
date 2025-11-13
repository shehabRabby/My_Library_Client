import React from "react";
import BookCard from "./BookCard";

const LatestBooks = ({ data,user}) => {
  // console.log(user)
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-violet-700">
          Latest Books Collection
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Discover the most recently added gems in our library
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
