import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import AllBooksTable from "../Components/AllBooksTable";
import { AuthContext } from "../Context/AuthProvider";

const AllBooks = () => {
  const data = useLoaderData();
  const [books, setBooks] = useState(data);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const { user } = use(AuthContext);
  // console.log(user);

  // search
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
      })
      .catch((err) => {
        console.error("Search error:", err);
        setLoading(false);
      });
  };

  // Sort by rating
  const handleSortByRating = (order) => {
    setLoading(true);
    setSortOrder(order);

    fetch(`https://my-library-orpin.vercel.app/booksSort/sort?order=${order}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setBooks(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sort error:", err);
        setLoading(false);
      });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-6">
        All Books
      </h2>

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

          {/* Dropdown for sorting */}
          <select
            value={sortOrder}
            onChange={(e) => handleSortByRating(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-200"
          >
            <option value="desc">High to Low ⬇</option>
            <option value="asc">Low to High ⬆</option>
          </select>
        </div>
      </form>

      {loading ? (
        <p className="text-center text-gray-500 font-medium">Loading...</p>
      ) : (
        <AllBooksTable books={books} loading={loading} />
      )}
    </div>
  );
};

export default AllBooks;
