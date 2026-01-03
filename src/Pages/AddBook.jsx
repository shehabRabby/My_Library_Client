import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import { FaPlus, FaStar, FaPenNib, FaUserCircle, FaEnvelope } from "react-icons/fa";

const AddBook = () => {
  const { user } = useContext(AuthContext);
  
  // Local state for live preview (Now with Dynamic Rating)
  const [preview, setPreview] = useState({
    title: "Book Title",
    author: "Author Name",
    photo: "https://via.placeholder.com/300x450?text=Cover+Preview",
    rating: "0.0"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreview(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      title: form.title.value,
      author: form.author.value,
      genre: form.genre.value,
      rating: parseFloat(form.rating.value) || 0,
      summary: form.summary.value,
      coverImage: form.photo.value,
      userEmail: user?.email, // Directly from context
      userName: user?.displayName, // Directly from context
    };

    fetch("https://my-library-orpin.vercel.app/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "The book has been added to the sanctuary.",
          icon: "success",
          confirmButtonColor: "#581C87",
        });
        form.reset();
        setPreview({ title: "Book Title", author: "Author Name", photo: "", rating: "0.0" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left Side: The Interactive Form */}
        <div className="w-full lg:w-2/3 bg-base-200 p-8 md:p-12 rounded-[3rem] border border-base-300 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 bg-brand-primary rounded-2xl text-white shadow-lg shadow-brand-primary/30">
              <FaPlus size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-base-content tracking-tighter">Add to Collection</h2>
              <p className="text-base-content/50 text-xs font-bold uppercase tracking-widest">Global Library Contribution</p>
            </div>
          </div>

          <form onSubmit={handleAddBook} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-brand-primary ml-2">Title</label>
                <input type="text" name="title" onChange={handleInputChange} required className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:border-brand-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-brand-primary ml-2">Author</label>
                <input type="text" name="author" onChange={handleInputChange} required className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:border-brand-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-brand-primary ml-2">Genre</label>
                <select name="genre" required className="select select-bordered w-full rounded-2xl bg-base-100 border-base-300 font-medium">
                  <option disabled selected value="">Select Genre</option>
                  <option>Fantasy</option><option>Science Fiction</option><option>Romance</option><option>Mystery</option><option>Action</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-brand-primary ml-2">Rating (0-5)</label>
                <input type="number" name="rating" step="0.1" max="5" min="0" onChange={handleInputChange} required className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-brand-primary ml-2">Cover Photo URL</label>
              <input type="url" name="photo" onChange={handleInputChange} required className="input input-bordered w-full rounded-2xl bg-base-100 border-base-300" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-brand-primary ml-2">Brief Summary</label>
              <textarea name="summary" rows={3} className="textarea textarea-bordered w-full rounded-2xl bg-base-100 border-base-300 resize-none font-medium" required placeholder="Describe the story..."></textarea>
            </div>

            {/* Non-Editable User Info Section */}
            <div className="p-6 bg-base-300/50 rounded-3xl border border-dashed border-base-300 space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Contributor Identity</p>
               <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3 bg-base-100 px-4 py-3 rounded-xl flex-1 border border-base-300 shadow-sm">
                    <FaUserCircle className="text-brand-primary" size={20} />
                    <div>
                        <p className="text-[10px] uppercase font-bold text-base-content/50 leading-none mb-1">Name</p>
                        <p className="font-bold text-sm text-base-content">{user?.displayName || "Reader"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-base-100 px-4 py-3 rounded-xl flex-1 border border-base-300 shadow-sm">
                    <FaEnvelope className="text-brand-primary" size={18} />
                    <div>
                        <p className="text-[10px] uppercase font-bold text-base-content/50 leading-none mb-1">Email</p>
                        <p className="font-bold text-sm text-base-content">{user?.email}</p>
                    </div>
                  </div>
               </div>
            </div>

            <button type="submit" className="btn w-full rounded-2xl bg-brand-primary hover:bg-brand-dark text-white border-none font-black uppercase tracking-widest h-16 shadow-lg shadow-brand-primary/20 transition-all hover:scale-[1.01] active:scale-95">
              Publish to Library
            </button>
          </form>
        </div>

        {/* Right Side: Unique Live Preview Card */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-24 space-y-6">
          <p className="text-center font-black uppercase tracking-widest text-base-content/40 text-xs">Visual Preview</p>
          <div className="relative group mx-auto w-72 h-[450px] bg-base-200 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-base-300 transform lg:rotate-2 hover:rotate-0 transition-all duration-500">
            <img 
              src={preview.photo || "https://via.placeholder.com/300x450?text=No+Cover"} 
              className="w-full h-full object-cover transition duration-500"
              alt="Preview"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 p-8 w-full text-white">
               <span className="bg-brand-secondary text-black text-[10px] px-2 py-1 rounded font-black mb-2 inline-block shadow-sm">LIVE PREVIEW</span>
               <h3 className="text-2xl font-black truncate leading-tight">{preview.title || "Untitled Book"}</h3>
               <p className="text-white/70 italic text-sm mb-4">by {preview.author || "Unknown Author"}</p>
               <div className="flex items-center gap-2 text-brand-secondary">
                  <FaStar size={14} className="mb-1" /> 
                  <span className="font-black text-lg">{preview.rating || "0.0"}</span>
               </div>
            </div>
          </div>
          
          <div className="bg-brand-secondary/10 border border-brand-secondary/20 p-6 rounded-3xl">
             <div className="flex gap-4 items-center">
                <div className="text-brand-primary shrink-0"><FaPenNib size={20}/></div>
                <p className="text-xs font-bold text-base-content/70 italic leading-relaxed">"Fill your house with books, in all the crannies and all the nooks."</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddBook;