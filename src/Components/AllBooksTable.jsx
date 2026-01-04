import React, { use } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthProvider";

const AllBooksTable = ({ books, loading }) => {
  const { user } = use(AuthContext);

  return (
    <div className="w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300 transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-0">
          {/* Table Header  */}
          <thead className="hidden md:table-header-group bg-brand-primary text-white">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-widest border-none">#</th>
              <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-widest border-none">Title</th>
              <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-widest border-none">Author</th>
              <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-widest border-none">Genre</th>
              <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-widest border-none">Rating</th>
              <th className="py-4 px-6 text-center text-xs font-bold uppercase tracking-widest border-none">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-transparent divide-y divide-base-300">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  <span className="loading loading-spinner loading-lg text-brand-primary"></span>
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 px-4 text-center text-base-content/50 font-medium italic">
                  No books found in the collection.
                </td>
              </tr>
            ) : (
              books.map((book, index) => (
                <tr
                  key={book._id}
                  className="hover:bg-base-200 transition-colors block md:table-row mb-6 md:mb-0 border md:border-none border-base-300 rounded-xl"
                >
                  <td className="block md:table-cell py-4 px-6 text-base-content/70">
                    <span className="font-bold md:hidden text-brand-primary mr-2 uppercase text-xs">#:</span>
                    {index + 1}
                  </td>
                  <td className="block md:table-cell py-4 px-6 font-bold text-base-content">
                    <span className="font-bold md:hidden text-brand-primary mr-2 uppercase text-xs">Title:</span>
                    {book.title}
                  </td>
                  <td className="block md:table-cell py-4 px-6 text-base-content/80">
                    <span className="font-bold md:hidden text-brand-primary mr-2 uppercase text-xs">Author:</span>
                    {book.author}
                  </td>
                  <td className="block md:table-cell py-4 px-6">
                    <span className="font-bold md:hidden text-brand-primary mr-2 uppercase text-xs">Genre:</span>
                    <span className="badge badge-ghost font-medium">{book.genre}</span>
                  </td>
                  <td className="block md:table-cell py-4 px-6">
                    <span className="font-bold md:hidden text-brand-primary mr-2 uppercase text-xs">Rating:</span>
                    <div className="flex items-center space-x-1 text-brand-accent font-bold">
                      <span>{book.rating}</span>
                      <FaStar className="mb-0.5" />
                    </div>
                  </td>

                  <td className="block md:table-cell py-4 px-6 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <Link
                        to={`/book-details/${book._id}`}
                        className="btn btn-sm lg:btn-md bg-brand-primary text-white border-none hover:bg-brand-dark px-6 rounded-lg transition-all duration-300"
                      >
                        View Details
                      </Link>
                      {book.actions}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooksTable;