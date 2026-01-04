import React, { useContext, useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { FaEdit, FaMagic, FaStar, FaUserShield, FaImage, FaArrowLeft } from "react-icons/fa";

const UpdateBooks = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  
  const book = data.result || data;

  // Local state for live visual feedback
  const [currentTitle, setCurrentTitle] = useState(book?.title || "");
  const [currentPhoto, setCurrentPhoto] = useState(book?.coverImage || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateBook = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = {
      title: e.target.title.value,
      author: e.target.author.value,
      genre: e.target.genre.value,
      rating: parseFloat(e.target.rating.value) || 0,
      summary: e.target.summary.value,
      coverImage: e.target.photo.value,
      // Fixed: Getting values directly from context to avoid "undefined" error
      userEmail: user?.email,
      userName: user?.displayName,
    };

    fetch(`https://my-library-orpin.vercel.app/books/${book._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsUpdating(false);
        toast.success("Archives Successfully Updated!", {
          icon: "🪄",
          style: {
            borderRadius: '15px',
            background: '#581C87',
            color: '#fff',
            fontWeight: 'bold'
          },
        });
      })
      .catch((err) => {
        setIsUpdating(false);
        console.error(err);
        toast.error("Failed to update the archives.");
      });
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 transition-colors duration-500">
      <Toaster position="top-center" />
      
      <div className="max-w-6xl mx-auto">
        {/* NAVIGATION & HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="flex items-center gap-5">
                <button 
                  onClick={() => navigate(-1)} 
                  className="p-4 bg-base-200 hover:bg-brand-primary hover:text-white rounded-2xl transition-all cursor-pointer border border-base-300 shadow-sm"
                >
                    <FaArrowLeft />
                </button>
                <div>
                    <h2 className="text-4xl font-black text-base-content tracking-tighter">Edit Manuscript</h2>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary opacity-60">
                        Record Reference: {book._id?.slice(-10)}
                    </p>
                </div>
            </div>
            
            {/*  PREVIEW BADGE */}
            <div className="flex items-center gap-4 bg-base-200 p-3 pr-6 rounded-full border border-base-300 shadow-sm animate-pulse-slow">
                <img 
                    src={currentPhoto || "https://via.placeholder.com/150"} 
                    alt="preview" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-secondary shadow-md" 
                />
                <div>
                    <p className="text-[10px] font-black uppercase opacity-40 leading-none">Live Syncing</p>
                    <p className="font-bold text-sm truncate max-w-[150px]">{currentTitle || "Untitled"}</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <form onSubmit={handleUpdateBook} className="lg:col-span-2 space-y-6 bg-base-200 p-8 md:p-12 rounded-[3rem] border border-base-300 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary ml-2">Book Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={book?.title}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                  required
                  className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:border-brand-primary font-bold transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary ml-2">Author Name</label>
                <input
                  type="text"
                  name="author"
                  defaultValue={book?.author}
                  required
                  className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:border-brand-primary font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary ml-2">Genre Category</label>
                <select
                  name="genre"
                  defaultValue={book?.genre}
                  className="select select-bordered w-full rounded-2xl bg-base-100 border-base-300 font-bold"
                >
                  <option>Fantasy</option>
                  <option>Science Fiction</option>
                  <option>Romance</option>
                  <option>Mystery</option>
                  <option>Action</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary ml-2">Reader Rating (0-5)</label>
                <div className="relative">
                    <input
                      type="number"
                      name="rating"
                      step="0.1"
                      max="5"
                      min="0"
                      defaultValue={book?.rating}
                      className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 font-bold"
                    />
                    <FaStar className="absolute right-4 top-4 text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary ml-2">Cover Artwork URL</label>
              <div className="relative">
                  <input
                    type="url"
                    name="photo"
                    defaultValue={book?.coverImage}
                    onChange={(e) => setCurrentPhoto(e.target.value)}
                    required
                    className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 font-bold pr-12"
                  />
                  <FaImage className="absolute right-4 top-4 opacity-20" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary ml-2">Manuscript Summary</label>
              <textarea
                rows={4}
                name="summary"
                defaultValue={book?.summary}
                required
                className="textarea textarea-bordered w-full rounded-2xl bg-base-100 border-base-300 resize-none font-medium p-4 focus:border-brand-primary"
              />
            </div>

            {/* ACTION BUTTON WITH LOADING STATE */}
            <button
              type="submit"
              disabled={isUpdating}
              className={`btn w-full h-16 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white border-none font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-primary/20 group transition-all ${isUpdating ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isUpdating ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <FaMagic className="group-hover:rotate-12 transition-transform" />
                  Finalize Changes
                </>
              )}
            </button>
          </form>

          {/* RIGHT COLUMN: IDENTITY & SECURITY */}
          <div className="space-y-6">
             <div className="bg-brand-primary p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <FaUserShield className="absolute -bottom-4 -right-4 text-white/10 text-9xl group-hover:scale-110 transition-transform duration-700" />
                <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                    Curator Identity
                </h4>
                <div className="space-y-4 relative z-10">
                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all hover:bg-white/20">
                        <p className="text-[9px] uppercase font-black opacity-50 tracking-widest mb-1">Authenticated Name</p>
                        <p className="font-bold text-brand-secondary text-sm">{user?.displayName || "Reader"}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all hover:bg-white/20">
                        <p className="text-[9px] uppercase font-black opacity-50 tracking-widest mb-1">System Email</p>
                        <p className="font-bold text-brand-secondary text-sm">{user?.email}</p>
                    </div>
                </div>
                <p className="mt-8 text-[10px] italic opacity-60 leading-relaxed border-t border-white/10 pt-4">
                   * Security Notice: Identity metadata is non-transferable and remains linked to this archive entry.
                </p>
             </div>

             {/* DECORATIVE TIP BOX */}
             <div className="bg-brand-secondary/10 border-2 border-dashed border-brand-secondary/30 p-8 rounded-[3rem] flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-brand-secondary/20 rounded-full flex items-center justify-center text-brand-primary mb-4 group-hover:scale-110 transition-transform">
                    <FaStar size={24} />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-2">Editor's Note</p>
                <p className="text-sm italic text-base-content/60 leading-relaxed">
                    "Precision in metadata ensures your contribution is easily discovered in the Grand Library."
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UpdateBooks;