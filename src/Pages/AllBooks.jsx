import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AllBooksTable from "../Components/AllBooksTable";

const AllBooks = () => {
  const data = useLoaderData();
  const [books, setBooks] = useState(data);
  const [loading, setLoading] = useState(false); // loading state

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTitle = e.target.title.value.trim();

    if (searchTitle === "") {
      setBooks(data); // reset to all books
      return;
    }

    setLoading(true); // start loading
    fetch(`http://localhost:3000/search?search=${searchTitle}`)
      .then((res) => res.json())
      .then((result) => {
        setBooks(result);
        setLoading(false); // stop loading
      })
      .catch((err) => {
        console.error("Search error:", err);
        setLoading(false); // stop loading even on error
      });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-6">
        All Books
      </h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-8">
          <input
            type="text"
            name="title"
            placeholder="Search books by title..."
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all duration-200"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-violet-600 text-white font-medium rounded-lg shadow-md hover:bg-violet-700 transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </form>

      {/* Loading or Table */}
      {loading ? (
        <p className="text-center text-gray-500 font-medium">Searching...</p>
      ) : (
        <AllBooksTable books={books} />
      )}
    </div>
  );
};

export default AllBooks;
