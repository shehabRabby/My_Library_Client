import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  FaBookOpen, 
  FaPlusCircle, 
  FaStar, 
  FaLayerGroup,
  FaHistory,
  FaArrowRight
} from "react-icons/fa";
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis,
  CartesianGrid 
} from "recharts";
import { Link } from "react-router";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [allBooks, setAllBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch Real Backend Data ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [booksRes, latestRes] = await Promise.all([
          axios.get("http://localhost:3000/books"),
          axios.get("http://localhost:3000/latest-books")
        ]);
        setAllBooks(booksRes.data);
        setLatestBooks(latestRes.data);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Dynamic Logic based on backend data
  const totalBooks = allBooks.length;
  const topRatedCount = allBooks.filter(book => Number(book.rating) >= 4.5).length;
  const myBooksCount = allBooks.filter(book => book.userEmail === user?.email).length;

  const chartData = [
    { name: "Archive", count: totalBooks },
    { name: "Yours", count: myBooksCount },
    { name: "Top", count: topRatedCount },
    { name: "Latest", count: latestBooks.length },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  if (loading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Loading Archive...</p>
    </div>
  );

  return (
    <motion.div 
      initial="hidden" animate="visible" variants={containerVariants}
      className="space-y-10 pb-10"
    >
      {/* 1. HERO SECTION */}
      <motion.div variants={itemVariants} className="relative overflow-hidden bg-[#0F172A] rounded-[3rem] p-8 md:p-14 text-white shadow-2xl border border-white/5">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.span 
               initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
               className="bg-brand-secondary/10 text-brand-secondary text-[10px] font-black uppercase tracking-[0.4em] px-5 py-2.5 rounded-full border border-brand-secondary/20 mb-8 inline-block"
            >
              Cloud System Status: Active
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
              Hello, <span className="text-brand-secondary">{user?.displayName?.split(' ')[0] || "Curator"}</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg mb-10 max-w-lg leading-relaxed">
              Your library dashboard is synced with the cloud. You have indexed <span className="text-white font-bold">{totalBooks} volumes</span> across all categories.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              <Link to="/add-book" className="bg-brand-secondary text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-brand-secondary/20">
                <FaPlusCircle /> Add New Book
              </Link>
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="hidden lg:flex w-72 h-72 bg-gradient-to-tr from-brand-secondary to-lime-300 rounded-[4rem] shadow-2xl items-center justify-center relative overflow-hidden group"
          >
            <FaBookOpen size={110} className="text-black/80 -rotate-12 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px]"></div>
      </motion.div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Total Archive", value: totalBooks, icon: <FaLayerGroup />, color: "bg-blue-600" },
          { label: "Your Contributions", value: myBooksCount, icon: <FaBookOpen />, color: "bg-brand-primary" },
          { label: "Top Quality", value: topRatedCount, icon: <FaStar />, color: "bg-orange-500" },
        ].map((stat, idx) => (
          <motion.div key={idx} variants={itemVariants} whileHover={{ y: -8 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 flex items-center gap-6 group">
            <div className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. CHART & LATEST IMAGES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div variants={itemVariants} className="lg:col-span-7 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Collection Insights</h4>
            <div className="flex gap-2">
               <span className="w-3 h-3 rounded-full bg-brand-primary"></span>
               <span className="w-3 h-3 rounded-full bg-brand-secondary"></span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6D28D9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="count" stroke="#6D28D9" strokeWidth={5} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-5 bg-[#F8FAFC] p-8 rounded-[3.5rem] border border-slate-200">
          <h4 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-2">
            <FaHistory className="text-brand-primary" /> Recently Added
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {latestBooks.map((book) => {
              // Robust image field checking
              const bookCover = book.image || book.imageURL || book.img || book.cover;

              return (
                <motion.div 
                  key={book._id} 
                  whileHover={{ x: 5 }}
                  className="group flex items-center gap-5 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-200 border border-slate-100 shadow-inner flex items-center justify-center">
                    {bookCover ? (
                      <img 
                        src={bookCover} 
                        alt={book.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = "https://placehold.co/400x600/6D28D9/FFFFFF/png?text=No+Cover";
                        }}
                      />
                    ) : (
                      <FaBookOpen className="text-slate-400" size={20} />
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <p className="text-sm font-black text-slate-800 truncate leading-none mb-1">{book.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{book.category || 'Archived'}</p>
                  </div>

                  <div className="ml-auto flex items-center gap-1.5 bg-orange-50 text-orange-500 px-3 py-1.5 rounded-full font-black text-[10px]">
                    <FaStar size={10} /> {book.rating}
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <Link to="/all-book" className="flex items-center justify-center gap-3 w-full mt-8 py-4 bg-slate-900 text-white hover:bg-brand-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg">
            View All Archive <FaArrowRight size={10} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;