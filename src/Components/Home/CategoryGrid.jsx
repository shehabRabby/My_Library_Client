import { FaGhost, FaRocket, FaUserTie, FaLandmark, FaFeather, FaGraduationCap } from "react-icons/fa";

const CategoryGrid = () => {
  const categories = [
    { name: "Fiction", icon: <FaGhost /> },
    { name: "Sci-Fi", icon: <FaRocket /> },
    { name: "Biography", icon: <FaUserTie /> },
    { name: "History", icon: <FaLandmark /> },
    { name: "Poetry", icon: <FaFeather /> },
    { name: "Academic", icon: <FaGraduationCap /> },
  ];
  
  return (
    <section className="py-24 bg-base-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-1">
        
        {/* Header with entrance animation */}
        <div className="mb-16 text-center lg:text-left animate-fadeIn">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-2">The Collection</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Browse by <span className="text-brand-primary">Genre</span>
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <div 
              key={cat.name} 
              // Custom delay for staggered animation effect
              style={{ animationDelay: `${index * 100}ms` }}
              className="group cursor-pointer bg-base-200 p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:bg-brand-secondary hover:-translate-y-3 hover:shadow-2xl hover:shadow-brand-secondary/20 animate-fadeInUp"
            >
              {/* Icon Container */}
              <div className="text-3xl text-brand-primary group-hover:text-black group-hover:scale-110 transition-all duration-500">
                {cat.icon}
              </div>

              {/* Text */}
              <p className="font-black uppercase tracking-widest text-[10px] group-hover:text-black transition-colors">
                {cat.name}
              </p>

              {/* Subtle Decorative Line */}
              <div className="w-0 group-hover:w-8 h-[2px] bg-black transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;