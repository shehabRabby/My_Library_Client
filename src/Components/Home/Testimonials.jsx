import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  return (
    <section className="py-24 bg-base-200 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Header Section */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-4 block">
              Testimonials
            </span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
              What Our <br/>
              <span className="text-brand-primary">Curators</span> Say
            </h2>
            <p className="text-sm font-medium opacity-50 max-w-xs mx-auto lg:mx-0">
              Real stories from our global community of readers and archive guardians.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1 */}
            <div className="bg-base-100 p-10 rounded-[3rem] shadow-2xl shadow-black/5 border border-base-content/5 relative group hover:-translate-y-2 transition-all duration-500">
              <div className="text-brand-secondary mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                <FaQuoteLeft size={32} />
              </div>
              <p className="italic text-xl mb-8 leading-relaxed font-medium">
                "Book Haven transformed my messy shelf into a digital sanctuary. The UI is simply breathtaking."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center font-black text-brand-primary text-xs">
                  SJ
                </div>
                <p className="font-black text-[10px] uppercase tracking-widest text-brand-primary">
                  — Sarah Jenkins
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-base-100 p-10 rounded-[3rem] shadow-2xl shadow-black/5 border border-base-content/5 relative group hover:-translate-y-2 transition-all duration-500">
              <div className="text-brand-secondary mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                <FaQuoteLeft size={32} />
              </div>
              <p className="italic text-xl mb-8 leading-relaxed font-medium">
                "Finally, a library app that cares about aesthetics as much as the books themselves."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center font-black text-brand-primary text-xs">
                  MV
                </div>
                <p className="font-black text-[10px] uppercase tracking-widest text-brand-primary">
                  — Marcus Vought
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;