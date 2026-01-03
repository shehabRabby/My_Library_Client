const Newsletter = () => {
  return (
    <section className="py-20 px-6 bg-base-100 transition-colors duration-300">
      {/* Container: Uses brand-primary (Purple) 
         Text: Always white here for contrast against the dark purple 
      */}
      <div className="max-w-7xl mx-auto bg-brand-primary p-12 md:p-20 rounded-[3.5rem] text-white flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
        
        {/* Decorative background circle for depth */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
            Don't Miss a <br/><span className="text-brand-secondary">New Edition.</span>
          </h2>
          <p className="text-lg font-medium mb-10 text-white/70 max-w-sm mx-auto">
            Join 8,000+ readers receiving our weekly curated list of sanctuary highlights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            {/* Input: Transparent with white border to look premium */}
            <input 
              type="email" 
              placeholder="Email Address" 
              className="input input-lg flex-1 bg-white/10 border-white/20 focus:border-brand-secondary text-white placeholder:text-white/40 rounded-2xl transition-all" 
            />
            {/* Button: Brand Secondary (Lime) to catch the eye */}
            <button className="btn btn-lg bg-brand-secondary text-black hover:bg-white border-none rounded-2xl px-10 font-black uppercase tracking-widest text-xs transition-transform active:scale-95 shadow-lg shadow-brand-secondary/20">
              Subscribe
            </button>
          </div>
          
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            Secure & Private • Unsubscribe anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;