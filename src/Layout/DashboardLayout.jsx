import React, { useState, useContext, useEffect } from "react";
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { 
  FaThLarge, 
  FaPlus, 
  FaBook, 
  FaUserCircle, 
  FaHome, 
  FaSignOutAlt, 
  FaChevronLeft, 
  FaChevronRight,
  FaBars,
  FaTimes
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu 
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const onLogout = async () => {
    await handleLogout();
    navigate("/");
  };

  const menuItems = [
    { name: "Overview", path: "/dashboard", icon: <FaThLarge /> },
    { name: "Add New Book", path: "/dashboard/add-books", icon: <FaPlus /> },
    { name: "My Books", path: "/dashboard/my-books", icon: <FaBook /> },
    { name: "My Profile", path: "/dashboard/my-profile", icon: <FaUserCircle /> },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-700">
      
      {/*  Responsive Sidebar  */}
      <aside 
        className={`
          bg-[#0F172A] text-white fixed lg:relative h-full transition-all duration-500 ease-in-out z-[60] shadow-[20px_0_50px_rgba(0,0,0,0.1)]
          ${isSidebarOpen ? "w-72" : "w-24"} 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Desktop Sidebar Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden lg:flex absolute -right-3 top-10 bg-brand-secondary text-black w-7 h-7 rounded-full items-center justify-center shadow-lg border-4 border-[#F8FAFC] hover:scale-110 transition-transform z-[70]"
        >
          {isSidebarOpen ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
        </button>

        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute right-4 top-6 text-slate-400 hover:text-white"
        >
          <FaTimes size={24} />
        </button>

        {/* Logo Section */}
        <div className="p-8 mb-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-secondary to-lime-400 rounded-xl flex items-center justify-center shadow-lg shadow-brand-secondary/20 shrink-0">
              <FaBook className="text-black text-xl" />
            </div>
            {(isSidebarOpen || isMobileMenuOpen) && (
              <span className="font-black text-xl tracking-tighter uppercase italic">
                HAVEN<span className="text-brand-secondary">.</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow px-4 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) => 
                `flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-gradient-to-r from-brand-secondary to-lime-400 text-black font-black shadow-xl shadow-brand-secondary/20" 
                    : "hover:bg-white/5 text-slate-400 hover:text-white"
                }`
              }
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              {(isSidebarOpen || isMobileMenuOpen) && (
                <span className="text-[11px] uppercase font-black tracking-[0.15em]">
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Area */}
        <div className="p-6 mt-auto border-t border-white/5 bg-white/5 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white mb-2">
            <FaHome size={18} /> 
            {(isSidebarOpen || isMobileMenuOpen) && <span className="text-[10px] font-bold uppercase tracking-widest">Exit to Site</span>}
          </Link>
          <button 
            onClick={onLogout} 
            className="flex items-center gap-4 p-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-left group"
          >
            <FaSignOutAlt size={18} className="group-hover:translate-x-1 transition-transform" /> 
            {(isSidebarOpen || isMobileMenuOpen) && <span className="text-[10px] font-bold uppercase tracking-widest">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/*  Content Area  */}
      <div className="flex-grow flex flex-col min-w-0 bg-[#F1F5F9] w-full">
        
        {/* Top Header */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-4 md:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <FaBars size={20} />
            </button>
            
            <div className="hidden sm:block">
              <h2 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">
                Curator Workspace
              </h2>
              <p className="text-[10px] md:text-xs font-bold text-slate-600 italic leading-none">
                Welcome back, {user?.displayName?.split(' ')[0] || "User"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-2 md:gap-3 hover:bg-white p-1 md:p-1.5 md:pr-4 rounded-2xl border border-transparent hover:border-slate-200 transition-all cursor-pointer">
                <div className="avatar">
                  <div className="w-8 md:w-10 rounded-xl ring-2 ring-brand-secondary ring-offset-2">
                    <img src={user?.photoURL || "https://i.pravatar.cc/150"} alt="User" />
                  </div>
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-black text-slate-900 leading-none mb-1 truncate max-w-[100px]">
                    {user?.displayName || "Curator"}
                  </p>
                  <p className="text-[8px] font-black text-brand-primary uppercase tracking-[0.1em]">Verified</p>
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-white rounded-[1.5rem] md:rounded-[2rem] w-56 md:w-64 border border-slate-100 animate-fadeIn">
                <div className="px-4 py-4 mb-2 bg-slate-50 rounded-[1rem] md:rounded-[1.5rem] border border-slate-100">
                    <p className="text-[8px] md:text-[9px] font-black opacity-40 uppercase tracking-[0.2em] mb-1">Authenticated ID</p>
                    <p className="text-[8px] md:text-[9px] font-mono font-bold truncate opacity-60">{user?.uid}</p>
                </div>
                <li><Link to="/dashboard/my-profile" className="py-2 md:py-3 px-4 font-bold rounded-xl text-xs md:text-sm hover:bg-slate-50">View Account</Link></li>
                <li><button onClick={onLogout} className="py-2 md:py-3 px-4 text-red-500 font-bold rounded-xl text-xs md:text-sm hover:bg-red-50">Logout Session</button></li>
              </ul>
            </div>
          </div>
        </header>

        {/* Scrollable Main Section */}
        <main className="flex-grow overflow-y-auto relative scroll-smooth overflow-x-hidden">
          {/* Background */}
          <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-brand-primary/5 rounded-full blur-[60px] md:blur-[100px] -z-10 pointer-events-none"></div>
          
          <div className="max-w-[1600px] mx-auto p-4 md:p-8 lg:p-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;