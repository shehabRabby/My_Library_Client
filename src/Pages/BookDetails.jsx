import React from "react";
import { useLoaderData, Link } from "react-router";
import { FaStar } from "react-icons/fa";

const BookDetails = () => {
  const data = useLoaderData();
  const book = data.result || data; // handle both formats

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 md:px-10">
      {/* Main Container */}
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row">
          {/* Book Cover */}
          <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover md:object-contain max-h-[500px]"
            />
          </div>

          {/* Book Info */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                {book.title}
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                by{" "}
                <span className="font-semibold text-gray-800">
                  {book.author}
                </span>
              </p>
              <p className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {book.genre}
              </p>

              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-gray-700 font-medium">{book.rating}</span>
              </div>

              <p className="text-gray-700 text-base leading-relaxed">
                {book.summary}
              </p>
            </div>

            {/* Email / Extra Info */}
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Added by:{" "}
                <span className="text-indigo-600 font-semibold">
                  {book.userEmail}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-6 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Format</p>
            <p className="font-semibold">Hardcover</p>
          </div>
          <div>
            <p className="text-gray-500">Language</p>
            <p className="font-semibold">English</p>
          </div>
          <div>
            <p className="text-gray-500">Rating</p>
            <p className="font-semibold">{book.rating} / 5</p>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <Link
            to={`/update-books/${book._id}`}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
          >
            Update Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
