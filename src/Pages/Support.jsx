import React from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle, FaBookMedical, FaUserShield, FaEnvelopeOpenText, FaHeadset, FaPaperPlane } from "react-icons/fa";

const Support = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const helpCategories = [
    {
      title: "Account & Access",
      icon: <FaUserShield />,
      desc: "Issues with logging in, password resets, or managing your curator profile.",
    },
    {
      title: "Archiving Books",
      icon: <FaBookMedical />,
      desc: "Guidelines on how to properly add volumes and images to the sanctuary.",
    },
    {
      title: "Borrowing Rules",
      icon: <FaQuestionCircle />,
      desc: "Information regarding time limits, borrowing caps, and book returns.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 overflow-x-hidden transition-colors duration-300">
      
      {/* 1. HERO SECTION - Floating & Gradient */}
      <section className="relative bg-brand-primary py-24 px-6 overflow-hidden">
        {/* Animated Background Circles */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6"
          >
            How can we <span className="text-brand-secondary italic">help?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Find answers to common questions about the Book Haven archive or reach out to Shehab directly.
          </motion.p>
        </div>
      </section>

      {/* 2. HELP CATEGORIES - Staggered Slide Up */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 -mt-12 mb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {helpCategories.map((cat, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              className="bg-base-100 border border-base-content/5 p-10 rounded-[3rem] shadow-xl group transition-all"
            >
              <div className="text-5xl mb-6 text-brand-primary group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{cat.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed font-medium">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. CONTACT SECTION - Magnetic Form Effect */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-base-200/50 rounded-[4rem] mb-20 border border-base-content/5">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="md:w-1/2 space-y-8"
          >
            <h2 className="text-5xl font-black tracking-tighter leading-none">
              Still have <br/><span className="text-brand-primary">unanswered questions?</span>
            </h2>
            <p className="text-lg opacity-70 font-medium">Our curator team is just one message away from helping you build your sanctuary.</p>
            
            <div className="space-y-6">
              <motion.div whileHover={{ x: 10 }} className="flex items-center gap-5">
                <div className="w-14 h-14 bg-brand-secondary rounded-2xl flex items-center justify-center text-black shadow-lg">
                  <FaEnvelopeOpenText size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Email Shehab</p>
                  <p className="font-bold text-lg">shehabrabby764@gmail.com</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 10 }} className="flex items-center gap-5">
                <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/30">
                  <FaHeadset size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Call or WhatsApp</p>
                  <p className="font-bold text-lg">+880 1773-562177</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="md:w-1/2 w-full bg-base-100 p-10 rounded-[4rem] shadow-2xl border border-base-content/5 relative"
          >
            <form className="space-y-5">
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase ml-2 opacity-50">Full Name</label>
                 <input type="text" placeholder="John Doe" className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-brand-primary transition-all" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase ml-2 opacity-50">Email Address</label>
                 <input type="email" placeholder="john@example.com" className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-brand-primary transition-all" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase ml-2 opacity-50">Your Message</label>
                 <textarea placeholder="Tell us what you need..." className="textarea textarea-bordered w-full rounded-2xl bg-base-200 border-none h-40 focus:ring-2 focus:ring-brand-primary transition-all"></textarea>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn bg-brand-primary text-white w-full rounded-2xl border-none h-16 text-lg font-black hover:bg-brand-primary/90 flex items-center gap-3 shadow-xl shadow-brand-primary/20"
              >
                SEND TO SHEHAB <FaPaperPlane />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Support;