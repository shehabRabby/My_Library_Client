import React, { useState, useContext } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { 
  FaThLarge, 
  FaPlus, 
  FaBook, 
  FaUserCircle, 
  FaHome, 
  FaSignOutAlt, 
  FaChevronLeft, 
  FaChevronRight
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

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
      
      {/* --- Glassmorphic Sidebar --- */}
      <aside 
        className={`bg-[#0F172A] text-white transition-all duration-500 ease-in-out ${isSidebarOpen ? "w-72" : "w-24"} flex flex-col relative z-50 shadow-[20px_0_50px_rgba(0,0,0,0.1)]`}
      >
        {/* Sidebar Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-10 bg-brand-secondary text-black w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F8FAFC] hover:scale-110 transition-transform z-[60]"
        >
          {isSidebarOpen ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
        </button>

        {/* Logo Section */}
        <div className="p-8 mb-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-secondary to-lime-400 rounded-xl flex items-center justify-center shadow-lg shadow-brand-secondary/20 shrink-0">
              <FaBook className="text-black text-xl" />
            </div>
            {isSidebarOpen && (
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
              {isSidebarOpen && (
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
            {isSidebarOpen && <span className="text-[10px] font-bold uppercase tracking-widest">Exit to Site</span>}
          </Link>
          <button 
            onClick={onLogout} 
            className="flex items-center gap-4 p-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-left group"
          >
            <FaSignOutAlt size={18} className="group-hover:translate-x-1 transition-transform" /> 
            {isSidebarOpen && <span className="text-[10px] font-bold uppercase tracking-widest">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* --- Content Area --- */}
      <div className="flex-grow flex flex-col min-w-0 bg-[#F1F5F9]">
        
        {/* Simple & Clean Top Header */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-10 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">
              Curator Workspace
            </h2>
            <p className="text-xs font-bold text-slate-600 italic">Welcome back, {user?.displayName?.split(' ')[0] || "User"}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Minimalist Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-3 hover:bg-white p-1.5 pr-4 rounded-2xl border border-transparent hover:border-slate-200 transition-all cursor-pointer">
                <div className="avatar">
                  <div className="w-10 rounded-xl ring-2 ring-brand-secondary ring-offset-2">
                    <img src={user?.photoURL || "https://i.pravatar.cc/150"} alt="User" />
                  </div>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black text-slate-900 leading-none mb-1">
                    {user?.displayName || "Curator"}
                  </p>
                  <p className="text-[8px] font-black text-brand-primary uppercase tracking-[0.1em]">Verified Profile</p>
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content mt-4 z-[1] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white rounded-[2rem] w-64 border border-slate-100 animate-fadeIn">
                <div className="px-4 py-4 mb-2 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                    <p className="text-[9px] font-black opacity-40 uppercase tracking-[0.2em] mb-1">Authenticated ID</p>
                    <p className="text-[9px] font-mono font-bold truncate opacity-60">{user?.uid}</p>
                </div>
                <li><Link to="/dashboard/my-profile" className="py-3 px-4 font-bold rounded-xl hover:bg-slate-50">View Account</Link></li>
                <li><Link to="/dashboard" className="py-3 px-4 font-bold rounded-xl hover:bg-slate-50">Main Settings</Link></li>
                <div className="divider my-1 px-4"></div>
                <li><button onClick={onLogout} className="py-3 px-4 text-red-500 font-bold rounded-xl hover:bg-red-50">Logout Session</button></li>
              </ul>
            </div>
          </div>
        </header>

        {/* Scrollable Main Section */}
        <main className="flex-grow overflow-y-auto relative scroll-smooth">
          {/* Subtle Decorative Background Element */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          
          <div className="max-w-[1600px] mx-auto p-8 md:p-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;