import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import AllBooksTable from "../Components/AllBooksTable";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyBook = () => {
  const { user } = useContext(AuthContext);
  // console.log(user)
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's books
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/my-book?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
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

  // Book delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/books/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete"); // check HTTP status
            return res.json();
          })
          .then(() => {
            // Remove deleted book from UI immediately
            setBooks((prev) => prev.filter((book) => book._id !== id));

            Swal.fire({
              title: "Deleted!",
              text: "Book has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something went wrong!");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10 space-x-2">
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce animation-delay-150"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce animation-delay-300"></div>
      </div>
    );
  }

  // Add tooltip + buttons
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
      <div className="flex justify-center gap-2 flex-wrap">
        <Link
          to={`/update-books/${book._id}`}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 text-center"
        >
          Update
        </Link>

        <button
          onClick={() => handleDelete(book._id)}
          className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 text-center cursor-pointer"
        >
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

      <AllBooksTable user={user} books={booksWithTooltips} loading={loading} />
    </div>
  );
};

export default MyBook;
