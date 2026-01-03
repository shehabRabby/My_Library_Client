const FaqSection = () => {
  return (
    <section className="py-24 max-w-4xl mx-auto px-6 bg-base-100 transition-colors duration-300">
      {/* Heading with Brand Primary color */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
          Common <span className="text-brand-primary">Questions</span>
        </h2>
        <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">
          Everything you need to know about the archive
        </p>
      </div>

      {/* Accordion Container */}
      <div className="join join-vertical w-full bg-base-200/50 rounded-[2.5rem] border border-base-content/5 overflow-hidden shadow-sm">
        
        {/* Question 1 */}
        <div className="collapse collapse-arrow join-item border-b border-base-content/5">
          <input type="radio" name="faq-accordion" defaultChecked /> 
          <div className="collapse-title text-xl font-bold py-6 px-8 text-brand-primary">
            How do I add a new book to the sanctuary?
          </div>
          <div className="collapse-content px-8 pb-6">
            <p className="text-sm leading-relaxed opacity-70 font-medium">
              As an authenticated curator, simply navigate to the <span className="font-bold">Add Books</span> section in the main menu. Provide the book's title, author, and description to share it with our global community of readers.
            </p>
          </div>
        </div>

        {/* Question 2 */}
        <div className="collapse collapse-arrow join-item border-b border-base-content/5">
          <input type="radio" name="faq-accordion" /> 
          <div className="collapse-title text-xl font-bold py-6 px-8 hover:text-brand-primary transition-colors">
            What are the borrowing limits for members?
          </div>
          <div className="collapse-content px-8 pb-6">
            <p className="text-sm leading-relaxed opacity-70 font-medium">
              To ensure all residents have access to the archives, curators may borrow up to <span className="text-brand-primary font-bold">5 volumes</span> simultaneously for a period of <span className="text-brand-primary font-bold">14 days</span>.
            </p>
          </div>
        </div>

        {/* Question 3 */}
        <div className="collapse collapse-arrow join-item">
          <input type="radio" name="faq-accordion" /> 
          <div className="collapse-title text-xl font-bold py-6 px-8 hover:text-brand-primary transition-colors">
            Can I edit a book I have already archived?
          </div>
          <div className="collapse-content px-8 pb-6">
            <p className="text-sm leading-relaxed opacity-70 font-medium">
              Yes. You can access your previously submitted entries via the <span className="font-bold">My Books</span> tab. From there, you can refine details or update availability status.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;