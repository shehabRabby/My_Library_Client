import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import AllBooksTable from "../Components/AllBooksTable";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaBookReader, FaTrashAlt, FaEdit, FaPlusCircle } from "react-icons/fa";

const MyBook = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's books (Functionality Unchanged)
  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://my-library-orpin.vercel.app/my-book?email=${user.email}`, {
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

  // Book delete (Functionality Unchanged - Updated Brand Color for Swal)
  const handleDelete = (id) => {
    Swal.fire({
      title: "Discard from Collection?",
      text: "This action will permanently remove this record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#581C87", // Brand Primary
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      background: "#fff",
      customClass: {
        title: 'font-black tracking-tight',
        confirmButton: 'rounded-xl px-6 py-3',
        cancelButton: 'rounded-xl px-6 py-3'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-library-orpin.vercel.app/books/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete");
            return res.json();
          })
          .then(() => {
            setBooks((prev) => prev.filter((book) => book._id !== id));
            Swal.fire({
              title: "Removed!",
              text: "Book has been cleared from your sanctuary.",
              icon: "success",
              confirmButtonColor: "#581C87",
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
      <div className="min-h-[60vh] flex flex-col justify-center items-center space-y-4">
        <div className="flex space-x-2">
            <div className="w-4 h-4 bg-brand-primary rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-brand-primary rounded-full animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 bg-brand-primary rounded-full animate-bounce [animation-delay:-.5s]"></div>
        </div>
        <p className="text-xs font-black uppercase tracking-widest text-brand-primary animate-pulse">Accessing Archives...</p>
      </div>
    );
  }

  // Add tooltip + buttons (Functional Logic Maintained)
  const booksWithTooltips = books.map((book) => ({
    ...book,
    title: (
      <>
        <span
          data-tooltip-id={`tooltip-${book._id}`}
          data-tooltip-content="Preview Cover"
          className="cursor-pointer underline decoration-brand-secondary underline-offset-4 hover:text-brand-primary font-bold transition-colors"
        >
          {book.title}
        </span>
        <Tooltip 
            id={`tooltip-${book._id}`} 
            place="top" 
            render={() => (
                <img src={book.coverImage} alt="cover" className="w-24 h-36 object-cover rounded-lg shadow-xl border-2 border-white" />
            )}
            style={{ backgroundColor: "transparent", padding: 0 }}
        />
      </>
    ),
    actions: (
      <div className="flex justify-center gap-3">
        <Link
          to={`/update-books/${book._id}`}
          className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl hover:bg-brand-primary hover:text-white transition-all duration-300 flex items-center gap-2 group shadow-sm border border-brand-primary/10"
        >
          <FaEdit className="group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black uppercase tracking-tight">Update</span>
        </Link>

        <button
          onClick={() => handleDelete(book._id)}
          className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center gap-2 group shadow-sm border border-red-100 cursor-pointer"
        >
          <FaTrashAlt className="group-hover:shake" />
          <span className="text-xs font-black uppercase tracking-tight">Delete</span>
        </button>
      </div>
    ),
  }));

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-500 pb-20">
      {/* Header Profile Section */}
      <div className="bg-gradient-to-r from-brand-primary to-purple-900 py-16 px-6 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
                <span className="bg-brand-secondary text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-brand-secondary/20">
                    Personal Archive
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                   My <span className="text-brand-secondary">Sanctuary.</span>
                </h2>
                <p className="text-white/60 font-medium max-w-md">
                    Managing your contributions to the global library of Book Haven. 
                </p>
            </div>
            
            {/* Quick Stats Overlay */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 flex gap-8">
                <div className="text-center">
                    <p className="text-3xl font-black text-brand-secondary">{books.length}</p>
                    <p className="text-[10px] text-white/50 uppercase font-black">Entries</p>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <Link to="/add-books" className="flex flex-col items-center group">
                    <div className="p-2 bg-brand-secondary rounded-full group-hover:scale-110 transition-transform">
                        <FaPlusCircle className="text-brand-primary text-xl" />
                    </div>
                    <p className="text-[10px] text-white/50 uppercase font-black mt-1">Add New</p>
                </Link>
            </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4 md:p-6 animate-fadeIn">
        {books.length > 0 ? (
            <div className="rounded-[2.5rem] border border-base-300 overflow-hidden shadow-2xl">
                 <AllBooksTable user={user} books={booksWithTooltips} loading={loading} />
            </div>
        ) : (
            <div className="text-center py-20 bg-base-200 rounded-[3rem] border-2 border-dashed border-base-300">
                <FaBookReader size={60} className="mx-auto text-brand-primary/20 mb-4" />
                <h3 className="text-2xl font-black">Your Sanctuary is Empty</h3>
                <p className="text-base-content/50 mt-2 mb-8">Start your legacy by adding your first book.</p>
                <Link to="/add-books" className="btn bg-brand-primary text-white border-none px-8 rounded-2xl hover:bg-brand-dark">
                    Contribute Now
                </Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyBook;