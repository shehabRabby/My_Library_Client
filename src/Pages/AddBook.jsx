import React, { use, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const AddBook = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Add New Book
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Book title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Author</label>
            <input
              type="text"
              placeholder="Author Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Genre</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
              step="0.1"
              max="5"
              min="0"
              placeholder="Rating out of 5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Summary</label>
            <textarea
              rows={5}
              placeholder="Write a short summary (3-5 lines)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Cover Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">User Email</label>
              <input
                type="email"
                placeholder="user@example.com"
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">User Name</label>
              <input
                type="text"
                placeholder="User Name"
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
