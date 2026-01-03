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

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://my-library-orpin.vercel.app/my-book?email=${user.email}`)
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "This record will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6D28D9",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete It",
      customClass: {
        popup: 'rounded-3xl',
        title: 'font-black'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-library-orpin.vercel.app/books/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setBooks((prev) => prev.filter((book) => book._id !== id));
            toast.success("Archive Entry Removed");
          })
          .catch((err) => {
            console.error(err);
            toast.error("Deletion failed");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center space-y-4">
        <span className="loading loading-ring loading-lg text-brand-primary"></span>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary animate-pulse text-center px-4">Syncing Database...</p>
      </div>
    );
  }

  const booksWithTooltips = books.map((book) => ({
    ...book,
    title: (
      <div className="flex items-center gap-2 md:gap-3">
        <img 
          src={book.coverImage || book.image || book.imageURL} 
          alt="cover" 
          className="w-8 h-10 md:w-10 md:h-14 object-cover rounded-md shadow-sm border border-base-300" 
          onError={(e) => { e.target.src = "https://placehold.co/400x600/6D28D9/FFFFFF/png?text=No+Cover" }}
        />
        <div className="flex flex-col">
            <span
              data-tooltip-id={`tooltip-${book._id}`}
              className="cursor-help font-bold text-xs md:text-sm hover:text-brand-primary transition-colors line-clamp-1"
            >
              {book.title}
            </span>
            <span className="text-[9px] uppercase font-black opacity-40 md:hidden">{book.category}</span>
        </div>
        <Tooltip 
            id={`tooltip-${book._id}`} 
            place="top" 
            className="hidden md:block"
            render={() => (
                <div className="p-1">
                    <img src={book.coverImage || book.image || book.imageURL} alt="preview" className="w-24 h-36 object-cover rounded-lg" />
                </div>
            )}
            style={{ backgroundColor: "#1e1e1e", borderRadius: "12px", zIndex: 100 }}
        />
      </div>
    ),
    actions: (
      <div className="flex justify-start gap-1.5 md:gap-2">
        <Link
          to={`/dashboard/update-books/${book._id}`}
          className="btn btn-square btn-xs md:btn-sm bg-brand-primary/10 text-brand-primary border-none hover:bg-brand-primary hover:text-white"
        >
          <FaEdit size={12}/>
        </Link>
        <button
          onClick={() => handleDelete(book._id)}
          className="btn btn-square btn-xs md:btn-sm bg-red-50 text-red-600 border-none hover:bg-red-600 hover:text-white"
        >
          <FaTrashAlt size={12}/>
        </button>
      </div>
    ),
  }));

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn px-2 md:px-0 pb-10">
      {/* 1. HEADER SECTION - Fully Responsive Stacking */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase">
            Managed <span className="text-brand-primary">Archives</span>
          </h1>
          <p className="text-xs md:text-sm font-medium opacity-50 mt-1">Manage, edit, or remove your personal contributions.</p>
        </div>
        
        <div className="flex flex-row items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
            <div className="stats shadow-sm bg-base-100 border border-base-200 rounded-xl md:rounded-2xl px-3 md:px-4">
                <div className="stat py-1 md:py-2 px-0 flex items-center gap-2 md:gap-3">
                    <div className="stat-title uppercase font-black text-[9px] md:text-[10px] tracking-widest">Total</div>
                    <div className="stat-value text-lg md:text-xl text-brand-primary">{books.length}</div>
                </div>
            </div>
            <Link to="/dashboard/add-books" className="btn btn-sm md:btn-md bg-brand-primary text-white border-none rounded-xl md:rounded-2xl px-4 md:px-6 flex-1 lg:flex-none">
                <FaPlusCircle /> <span className="text-[10px] md:text-xs">Add Book</span>
            </Link>
        </div>
      </div>

      {/* 2. TABLE CONTAINER - Dynamic Rounding & Horizontal Scroll fix */}
      <div className="bg-base-100 rounded-2xl md:rounded-[2.5rem] border border-base-300 shadow-sm overflow-hidden">
        {books.length > 0 ? (
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-base-300">
                <div className="min-w-[600px] md:min-w-full">
                  <AllBooksTable user={user} books={booksWithTooltips} loading={loading} />
                </div>
            </div>
        ) : (
            <div className="text-center py-16 md:py-24 px-6">
                <div className="bg-base-200 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaBookReader size={24} className="text-brand-primary opacity-20" />
                </div>
                <h3 className="text-lg md:text-xl font-black tracking-tight">No Records Found</h3>
                <p className="text-xs md:text-sm opacity-50 mb-8 max-w-xs mx-auto leading-relaxed">Your personal collection is currently empty. Start by adding a book.</p>
                <Link to="/dashboard/add-books" className="btn btn-wide bg-brand-secondary text-black border-none rounded-xl md:rounded-2xl font-black uppercase text-[10px] tracking-widest">
                    Create First Entry
                </Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyBook;