import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const AllBooksTable = ({ books }) => {
  return (
    <div className="w-full p-4 md:p-6 bg-gray-50 rounded-lg shadow-lg overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        {/* Desktop Header */}
        <thead className="hidden md:table-header-group bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
              #
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
              Title
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
              Author
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
              Genre
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
              Rating
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {books.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                No books available
              </td>
            </tr>
          ) : (
            books.map((book, index) => (
              <tr
                key={book._id}
                className="hover:bg-gray-100 transition-colors block md:table-row mb-4 md:mb-0 rounded-lg"
              >
                {/* Mobile stacked layout */}
                <td className="block md:table-cell py-2 px-3 text-gray-700">
                  <span className="font-semibold md:hidden">#:</span>{" "}
                  {index + 1}
                </td>
                <td className="block md:table-cell py-2 px-3 font-medium text-gray-800">
                  <span className="font-semibold md:hidden">Title:</span>{" "}
                  {book.title}
                </td>
                <td className="block md:table-cell py-2 px-3 text-gray-600">
                  <span className="font-semibold md:hidden">Author:</span>{" "}
                  {book.author}
                </td>
                <td className="block md:table-cell py-2 px-3 text-gray-600">
                  <span className="font-semibold md:hidden">Genre:</span>{" "}
                  {book.genre}
                </td>
                <td className="block md:table-cell py-2 px-3">
                  <span className="font-semibold md:hidden">Rating:</span>
                  <div className="flex items-center space-x-1 text-yellow-500 font-semibold">
                    <span>{book.rating}</span>
                    <FaStar />
                  </div>
                </td>
                <td className="block md:table-cell py-2 px-3 text-center">
                  <Link to={`/book-details/${book._id}`} 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg font-medium transition-colors mt-2 md:mt-0 cursor-pointer">
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllBooksTable;