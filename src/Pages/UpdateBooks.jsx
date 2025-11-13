import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";

const UpdateBooks = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  // console.log(user);
  const book = data.result || data;

  const handleUpdateBook = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      author: e.target.author.value,
      genre: e.target.genre.value,
      rating: parseFloat(e.target.rating.value) || 0,
      summary: e.target.summary.value,
      coverImage: e.target.photo.value,
      userEmail: e.target.email.value,
      userName: e.target.name.value,
    };

    fetch(`http://localhost:3000/books/${book._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast("Good Job Successfully Updated!", {
          icon: "👏",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border-violet-500 border-1 mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Update Book
        </h2>

        <form onSubmit={handleUpdateBook} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={book?.title}
              placeholder="Book title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Author</label>
            <input
              type="text"
              name="author"
              defaultValue={book?.author}
              placeholder="Author Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Genre</label>
            <select
              name="genre"
              defaultValue={book?.genre}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Select Genre</option>
              <option>Fantasy</option>
              <option>Science Fiction</option>
              <option>Romance</option>
              <option>Mystery</option>
              <option>Action</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Rating</label>
            <input
              type="number"
              name="rating"
              step="0.1"
              max="5"
              min="0"
              defaultValue={book?.rating}
              placeholder="Rating out of 5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Summary</label>
            <textarea
              rows={5}
              name="summary"
              defaultValue={book?.summary}
              placeholder="Write a short summary (3–5 lines)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Cover Image URL</label>
            <input
              type="url"
              name="photo"
              defaultValue={book?.coverImage}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">User Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                readOnly
              />
            </div>

            <div>
              <label className="block font-medium mb-1">User Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                readOnly
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 cursor-pointer"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBooks;
