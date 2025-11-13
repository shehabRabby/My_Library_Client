import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../Context/AuthProvider";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const storageKey = `comments_${id}`; // unique key for each book

  // Fetch book data
  useEffect(() => {
    fetch(`https://my-library-orpin.vercel.app/books/${id}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBook(data.result);
        setLoading(false);
      });
  }, [id, user]);

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(storageKey)) || [];
    setComments(savedComments);
  }, [storageKey]);

  // Handle comment submission
  const handleComment = (e) => {
    e.preventDefault();
    const commentText = e.target.comment.value.trim();
    if (!commentText) return;

    const newComment = {
      id: Date.now(),
      name: user?.displayName || "Anonymous",
      avatar: user?.photoURL || "https://i.ibb.co/3N1RzRj/default-user.png",
      text: commentText,
      time: new Date().toLocaleString(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));
    e.target.reset();
  };

  if (loading) {
    return <div>Loading..........</div>;
  }

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
                <span className="font-semibold text-gray-800">{book.author}</span>
              </p>
              <p className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {book.genre}
              </p>

              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-gray-700 font-medium">{book.rating}</span>
              </div>

              <p className="text-gray-700 text-base leading-relaxed">{book.summary}</p>
            </div>

            {/* Email / Extra Info */}
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Added by:{" "}
                <span className="text-indigo-600 font-semibold">{book.userEmail}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Extra Book Info */}
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
      </div>

      {/* Comment Section */}
      <div className="mt-10 max-w-5xl w-full bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Comments
        </h2>

        {/* Comment Input Box */}
        <form onSubmit={handleComment}>
          <div className="flex items-start gap-3 mb-6">
            <img
              src={user?.photoURL || "https://i.ibb.co/3N1RzRj/default-user.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            />
            <div className="flex-1">
              <textarea
                name="comment"
                placeholder="Write your thoughts about this book..."
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows="3"
              ></textarea>
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-all"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments Display */}
        <div className="space-y-4">
          {comments.length === 0 && (
            <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
          )}
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl"
            >
              <img
                src={c.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{c.name}</h4>
                <p className="text-gray-600 text-sm mt-1">{c.text}</p>
                <p className="text-xs text-gray-400 mt-1">{c.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
