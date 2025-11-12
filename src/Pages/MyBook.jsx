import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import AllBooksTable from "../Components/AllBooksTable";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MyBook = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's books
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/my-book?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <p className="text-center mt-10">Loading your books...</p>;
  }

  // Map books and add use tooltip 
  const booksWithTooltips = books.map((book) => ({
    ...book,
    title: (
      <>
        <span
          data-tooltip-id={`tooltip-${book._id}`}
          data-tooltip-content={book.coverImage}
          className="cursor-pointer underline"
        >
          {book.title}
        </span>
        <Tooltip id={`tooltip-${book._id}`} place="top" effect="solid" />
      </>
    ),
    actions: (
      <div className="flex justify-center gap-2">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
          Update
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-6">
        My Books
      </h2>

      <AllBooksTable books={booksWithTooltips} />
    </div>
  );
};

export default MyBook;
