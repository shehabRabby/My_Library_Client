import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { FaStar, FaUserEdit, FaGlobe, FaLanguage, FaCommentDots, FaQuoteLeft, FaHistory } from "react-icons/fa";
import { AuthContext } from "../Context/AuthProvider";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const storageKey = `comments_${id}`;

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

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(storageKey)) || [];
    setComments(savedComments);
  }, [storageKey]);

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
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-base-100">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-brand-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-brand-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 font-black uppercase tracking-[0.3em] text-brand-primary animate-pulse">Opening Archives</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 md:px-10 transition-colors duration-500 overflow-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-5 transition-opacity duration-1000">
         <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-primary rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-secondary rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-20">
          
          {/* IMAGE PREVIEW  */}
          <div className="w-full lg:w-1/2 flex justify-center animate-fadeInRight">
             <div className="relative group perspective-1000">
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-base-300 p-4 rounded-[2.5rem] shadow-2xl transition-transform duration-700 hover:rotate-y-12">
                   <img
                     src={book.coverImage}
                     alt={book.title}
                     className="w-full max-w-[400px] h-[550px] object-cover rounded-2xl shadow-inner"
                   />
                   <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-md p-3 rounded-2xl text-white">
                      <div className="flex items-center gap-1 font-black text-brand-secondary">
                        <FaStar size={12}/> {book.rating}
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* BOOK TEXT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-8 animate-fadeInLeft">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">{book.genre}</span>
             </div>

             <h1 className="text-5xl md:text-8xl font-black text-base-content tracking-tighter leading-[0.9] drop-shadow-sm">
               {book.title}
             </h1>

             <div className="flex items-center gap-4 border-l-4 border-brand-secondary pl-6 py-2">
                <div className="space-y-1">
                   <p className="text-xs uppercase font-black text-base-content/40 tracking-widest">Master Author</p>
                   <p className="text-2xl font-bold text-brand-primary">{book.author}</p>
                </div>
             </div>

             <div className="relative">
                <FaQuoteLeft className="absolute -top-4 -left-6 text-brand-primary/10 text-6xl" />
                <p className="text-lg md:text-xl text-base-content/70 leading-relaxed italic relative z-10 font-medium">
                  {book.summary}
                </p>
             </div>

             {/* STATS ROW */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <FaGlobe />, label: "Region", val: "Global" },
                  { icon: <FaLanguage />, label: "Language", val: "English" },
                  { icon: <FaHistory />, label: "Year", val: "2024" },
                  { icon: <FaStar className="text-brand-secondary"/>, label: "Score", val: book.rating }
                ].map((item, i) => (
                  <div key={i} className="bg-base-200/50 backdrop-blur-sm p-4 rounded-2xl border border-base-300 flex flex-col items-center text-center hover:bg-base-200 transition-all">
                     <span className="text-brand-primary mb-1">{item.icon}</span>
                     <span className="text-[9px] font-black uppercase text-base-content/30 tracking-widest">{item.label}</span>
                     <span className="font-bold text-sm">{item.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/*  COMMENT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
           
           {/* COMMENT FORM  */}
           <div className="lg:col-span-1 lg:sticky lg:top-24 bg-brand-primary p-8 rounded-[3rem] shadow-2xl text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="flex items-center gap-4 mb-8">
                 <FaCommentDots size={30} className="text-brand-secondary" />
                 <h3 className="text-2xl font-black tracking-tighter leading-none">Public<br/>Reflection</h3>
              </div>

              <form onSubmit={handleComment} className="space-y-4">
                 <textarea
                   name="comment"
                   placeholder="Your thoughts..."
                   className="w-full h-40 bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-white/40 focus:bg-white/20 outline-none transition-all resize-none"
                   required
                 ></textarea>
                 <button type="submit" className="w-full bg-brand-secondary text-black font-black uppercase py-4 rounded-2xl tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all">
                    Submit Entry
                 </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3">
                 <img src={user?.photoURL || "https://i.ibb.co/3N1RzRj/default-user.png"} className="w-10 h-10 rounded-full border-2 border-brand-secondary" alt="user" />
                 <div>
                    <p className="text-[10px] font-black uppercase opacity-50 tracking-widest">Active Curator</p>
                    <p className="text-xs font-bold truncate max-w-[150px]">{user?.displayName}</p>
                 </div>
              </div>
           </div>

           {/* COMMENTS LIST (RIGHT SCROLL) */}
           <div className="lg:col-span-2 space-y-6">
              <h3 className="text-3xl font-black mb-8 flex items-center gap-4">
                Recent Contributions <div className="h-px flex-1 bg-base-300"></div>
              </h3>

              {comments.length === 0 ? (
                <div className="p-20 text-center border-2 border-dashed border-base-300 rounded-[3rem] opacity-40">
                   <p className="font-bold italic">This volume has no notes in the margins yet...</p>
                </div>
              ) : (
                <div className="space-y-6">
                   {comments.map((c, idx) => (
                      <div 
                        key={c.id} 
                        className="bg-base-100 p-6 rounded-[2rem] border border-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-6 animate-fadeInUp"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                         <img src={c.avatar} className="w-12 h-12 rounded-2xl border-2 border-brand-primary/10 object-cover" alt="user" />
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <h4 className="font-black text-brand-primary">{c.name}</h4>
                               <span className="text-[9px] font-bold text-base-content/30 uppercase tracking-widest">{c.time}</span>
                            </div>
                            <p className="text-base-content/70 leading-relaxed font-medium">{c.text}</p>
                         </div>
                      </div>
                   ))}
                </div>
              )}
           </div>
        </div>
      </div>

      {/* CUSTOM CSS FOR ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-12 { transform: rotateY(-12deg); }
      `}} />
    </div>
  );
};

export default BookDetails;