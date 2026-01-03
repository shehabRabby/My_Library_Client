import React from "react";
import { Link } from "react-router";
import { FaBookOpen, FaUsers, FaGlobe, FaHeart } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-base-100 min-h-screen transition-colors duration-500 overflow-hidden pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-brand-primary/10 to-transparent -z-10"></div>
        <div className="max-w-4xl mx-auto space-y-6 animate-fadeInUp">
          <h1 className="text-6xl md:text-8xl font-black text-base-content tracking-tighter leading-none">
            Beyond <span className="text-brand-primary">Pages.</span>
          </h1>
          <p className="text-base-content/70 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
            Book Haven is a digital sanctuary where literature meets community. 
            Discover thousands of stories and contribute your own.
          </p>
        </div>
      </section>

      {/* 2. BENTO STATS & STORY */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 bg-base-200 p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row gap-10 items-center border border-base-300">
            <div className="w-full md:w-1/2 overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000"
                  alt="Library Interior"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-4xl font-black text-brand-primary">Our Legacy</h2>
              <p className="text-base-content/80 text-lg">
                Founded in 2024, we set out to solve a simple problem: making the world's 
                best literature searchable, sortable, and shareable.
              </p>
              <div className="flex gap-4 pt-4">
                 <div className="text-center">
                    <p className="text-2xl font-black text-brand-primary">24/7</p>
                    <p className="text-[10px] uppercase font-bold opacity-50">Access</p>
                 </div>
                 <div className="w-px h-10 bg-base-300"></div>
                 <div className="text-center">
                    <p className="text-2xl font-black text-brand-primary">100%</p>
                    <p className="text-[10px] uppercase font-bold opacity-50">Free</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-primary p-8 rounded-[3rem] text-white flex flex-col justify-between items-center text-center group">
             <div className="bg-white/20 p-4 rounded-full animate-bounce">
                <FaHeart size={30} />
             </div>
             <p className="text-xl font-bold leading-tight">Built by Readers, For Readers.</p>
             <Link to="/add-books" className="w-full py-3 bg-brand-secondary text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition">
                Join Us
             </Link>
          </div>
        </div>
      </section>

      {/* 3. THE USER JOURNEY (Timeline) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-3xl md:text-5xl font-black mb-16 italic">How it works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-dashed bg-base-300 -z-10"></div>
            {[
                { title: "Discover", desc: "Browse our curated latest books on the home page.", icon: <FaGlobe /> },
                { title: "Refine", desc: "Use our smart search and sort to find specific genres or ratings.", icon: <FaBookOpen /> },
                { title: "Expand", desc: "Share your own library by adding new books to the collection.", icon: <FaUsers /> }
            ].map((step, idx) => (
                <div key={idx} className="bg-base-100 p-8 rounded-3xl border border-base-200 text-center space-y-4 hover:shadow-2xl transition-all">
                    <div className="w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-lg shadow-brand-primary/30">
                        {step.icon}
                    </div>
                    <h3 className="text-xl font-black">{step.title}</h3>
                    <p className="text-base-content/60 text-sm">{step.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* 4. VALUES GRID */}
      <section className="bg-base-200 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-4xl md:text-6xl font-black max-w-md tracking-tighter">Why Choose Book Haven?</h2>
            <p className="text-base-content/50 max-w-sm text-right">We prioritize user experience, accessibility, and the preservation of digital literature.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-10 bg-base-100 rounded-[2rem] border border-base-300 space-y-4">
                <div className="text-brand-secondary text-4xl">✦</div>
                <h4 className="text-2xl font-bold">Lightning Fast</h4>
                <p className="text-base-content/70">Optimized search queries and sorting algorithms to get you your book in milliseconds.</p>
            </div>
            <div className="p-10 bg-brand-secondary rounded-[2rem] text-black space-y-4">
                <div className="text-black text-4xl">✦</div>
                <h4 className="text-2xl font-bold">Community Driven</h4>
                <p className="text-black/70">Every user has the power to grow our global library by contributing high-quality data.</p>
            </div>
            <div className="p-10 bg-base-100 rounded-[2rem] border border-base-300 space-y-4">
                <div className="text-brand-primary text-4xl">✦</div>
                <h4 className="text-2xl font-bold">Always Modern</h4>
                <p className="text-base-content/70">A responsive design that looks stunning on mobile, tablet, and desktop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION (Accordion) */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-center text-3xl font-black mb-12">Common Questions</h2>
        <div className="join join-vertical w-full bg-base-100 border border-base-300">
          <div className="collapse collapse-arrow join-item border-b border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked /> 
            <div className="collapse-title text-xl font-bold text-brand-primary">How do I add a new book?</div>
            <div className="collapse-content"> 
              <p className="text-base-content/70">Navigate to the "Add Books" page, fill in the details including the cover image URL, and click submit. It will immediately appear in our library!</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-b border-base-300">
            <input type="radio" name="my-accordion-4" /> 
            <div className="collapse-title text-xl font-bold text-brand-primary">Is there a cost to use Book Haven?</div>
            <div className="collapse-content"> 
              <p className="text-base-content/70">Absolutely not. Book Haven is a free community project dedicated to the love of reading.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item">
            <input type="radio" name="my-accordion-4" /> 
            <div className="collapse-title text-xl font-bold text-brand-primary">Can I sort books by rating?</div>
            <div className="collapse-content"> 
              <p className="text-base-content/70">Yes! Go to the "All Books" page and use the dropdown menu to sort by high or low ratings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <div className="text-center py-20 px-6">
          <h2 className="text-4xl font-black mb-6">Ready to dive in?</h2>
          <Link to="/all-book" className="btn btn-lg bg-brand-primary text-white border-none px-12 rounded-2xl shadow-2xl hover:bg-brand-dark">
            Explore the Library
          </Link>
      </div>
    </div>
  );
};

export default AboutUs;