import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import AllBooksTable from "../Components/AllBooksTable";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaBookReader, FaTrashAlt, FaEdit, FaPlusCircle, FaSearch } from "react-icons/fa";

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
      text: "This record will be permanently removed from your archive.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6D28D9",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete It",
      background: "#fff",
      borderRadius: "24px",
      customClass: {
        title: 'font-black tracking-tight text-xl',
        popup: 'rounded-[2rem]'
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
      <div className="h-96 flex flex-col justify-center items-center space-y-4">
        <span className="loading loading-ring loading-lg text-brand-primary"></span>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary animate-pulse">Syncing Database...</p>
      </div>
    );
  }

  const booksWithTooltips = books.map((book) => ({
    ...book,
    title: (
      <div className="flex items-center gap-3">
        <img 
          src={book.coverImage} 
          alt="cover" 
          className="w-8 h-12 object-cover rounded-md shadow-sm border border-base-300" 
        />
        <span
          data-tooltip-id={`tooltip-${book._id}`}
          className="cursor-help font-bold text-sm hover:text-brand-primary transition-colors line-clamp-1"
        >
          {book.title}
        </span>
        <Tooltip 
            id={`tooltip-${book._id}`} 
            place="right" 
            render={() => (
                <div className="p-2">
                    <img src={book.coverImage} alt="preview" className="w-32 h-48 object-cover rounded-xl" />
                    <p className="mt-2 text-center font-bold text-xs">Preview Cover</p>
                </div>
            )}
            style={{ backgroundColor: "#1e1e1e", borderRadius: "16px", zIndex: 100 }}
        />
      </div>
    ),
    actions: (
      <div className="flex justify-start gap-2">
        <Link
          to={`/dashboard/update-books/${book._id}`}
          className="btn btn-square btn-sm bg-brand-primary/10 text-brand-primary border-none hover:bg-brand-primary hover:text-white"
        >
          <FaEdit size={14}/>
        </Link>

        <button
          onClick={() => handleDelete(book._id)}
          className="btn btn-square btn-sm bg-red-50 text-red-600 border-none hover:bg-red-600 hover:text-white"
        >
          <FaTrashAlt size={14}/>
        </button>
      </div>
    ),
  }));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Dashboard Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">Managed <span className="text-brand-primary">Archives</span></h1>
          <p className="text-sm font-medium opacity-50">Manage, edit, or remove your personal contributions.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="stats shadow-sm bg-base-100 border border-base-200 rounded-2xl px-4">
                <div className="stat py-2 px-0 flex items-center gap-3">
                    <div className="stat-title uppercase font-black text-[10px] tracking-widest">Total</div>
                    <div className="stat-value text-xl text-brand-primary">{books.length}</div>
                </div>
            </div>
            <Link to="/dashboard/add-books" className="btn bg-brand-primary text-white border-none rounded-2xl px-6">
                <FaPlusCircle /> Add Book
            </Link>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-300 shadow-sm overflow-hidden">
        {books.length > 0 ? (
            <div className="overflow-x-auto">
                <AllBooksTable user={user} books={booksWithTooltips} loading={loading} />
            </div>
        ) : (
            <div className="text-center py-24">
                <div className="bg-base-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaBookReader size={30} className="text-brand-primary opacity-20" />
                </div>
                <h3 className="text-xl font-black tracking-tight">No Records Found</h3>
                <p className="text-sm opacity-50 mb-8 max-w-xs mx-auto">Your personal collection is currently empty. Start by adding a book.</p>
                <Link to="/dashboard/add-books" className="btn bg-brand-secondary text-black border-none px-10 rounded-2xl font-black uppercase text-xs tracking-widest">
                    Create First Entry
                </Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyBook;