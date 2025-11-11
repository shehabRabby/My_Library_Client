import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import AllBooksTable from "../Components/AllBooksTable";

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

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-6">
        My Books
      </h2>

      {/* Add buttons for now, functionality later */}
      <AllBooksTable
        books={books.map((book) => ({
          ...book,
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
        }))}
      />
    </div>
  );
};

export default MyBook;