import React, { use, useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import AllBooksTable from "../Components/AllBooksTable";
import { AuthContext } from "../Context/AuthProvider";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllBooks = () => {
  const data = useLoaderData();
  const [books, setBooks] = useState(data);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const { user } = use(AuthContext);

  //  Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  // Calculate slice indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  // Reset to page 1 when searching or sorting
  useEffect(() => {
    setCurrentPage(1);
  }, [books]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTitle = e.target.title.value.trim();
    if (searchTitle === "") {
      setBooks(data);
      return;
    }
    setLoading(true);
    fetch(`https://my-library-orpin.vercel.app/search?search=${searchTitle}`)
      .then((res) => res.json())
      .then((result) => {
        setBooks(result);
        setLoading(false);
      });
  };

  const handleSortByRating = (order) => {
    setLoading(true);
    setSortOrder(order);
    fetch(`https://my-library-orpin.vercel.app/booksSort/sort?order=${order}`)
      .then((res) => res.json())
      .then((result) => {
        setBooks(result);
        setLoading(false);
      });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-10 min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      
      {/* Page Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tight">
          Browse Library
        </h2>
        <div className="w-20 h-1.5 bg-brand-secondary mx-auto mt-4 rounded-full"></div>
      </div>

      <form onSubmit={handleSearch}>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10">
          <input
            type="text"
            name="title"
            placeholder="Search books by title..."
            className="w-full sm:w-1/2 p-3 bg-base-200 border border-base-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200"
          />
          <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-brand-primary text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark transition-all duration-300 active:scale-95">
            Search
          </button>
          <select
            value={sortOrder}
            onChange={(e) => handleSortByRating(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 bg-base-200 border border-base-300 text-base-content font-medium rounded-xl shadow-sm cursor-pointer"
          >
            <option value="desc">Sort: High Rating ⬇</option>
            <option value="asc">Sort: Low Rating ⬆</option>
          </select>
        </div>
      </form>

      {/* Content Section */}
      <div className="bg-base-100 rounded-2xl min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <span className="loading loading-spinner loading-lg text-brand-primary"></span>
             <p className="mt-4 text-base-content/60 font-medium">Fetching books...</p>
          </div>
        ) : (
          <>
            {/* Pass currentBooks instead of books */}
            <AllBooksTable books={currentBooks} loading={loading} />

            {/*  Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 border-t border-base-300 pt-6">
                <p className="text-sm opacity-60 font-medium">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, books.length)} of {books.length} entries
                </p>
                <div className="join">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="join-item btn bg-base-200 border-base-300 hover:bg-brand-primary hover:text-white transition-all disabled:opacity-30"
                  >
                    <FaChevronLeft />
                  </button>
                  
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`join-item btn border-base-300 transition-all ${
                        currentPage === idx + 1 
                        ? "bg-brand-primary text-white border-brand-primary" 
                        : "bg-base-200 hover:bg-brand-secondary hover:text-black"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}

                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="join-item btn bg-base-200 border-base-300 hover:bg-brand-primary hover:text-white transition-all disabled:opacity-30"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBooks;