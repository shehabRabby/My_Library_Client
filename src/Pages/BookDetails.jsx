import React from "react";
import { useLoaderData, Link, useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const BookDetails = () => {
  const data = useLoaderData();
  const book = data.result || data;
  const navigate = useNavigate();

  const handleDelete = () => {
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
        fetch(`http://localhost:3000/books/${book._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            navigate("/all-book");
            Swal.fire({
              title: "Deleted!",
              text: "Book has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 md:px-10">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
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

        {/* Update & Delete Buttons */}
        <div className="flex flex-col sm:flex-row justify-end p-6 border-t border-gray-200 gap-4">
          <Link
            to={`/update-books/${book._id}`}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 text-center"
          >
            Update Book
          </Link>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 text-center cursor-pointer"
          >
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
