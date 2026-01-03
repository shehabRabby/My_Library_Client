import { Link, NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import logo from "../assets/logo.png";
import { FaUserCircle, FaSignOutAlt, FaBook } from "react-icons/fa";

const Navbar = () => {
  const { user, handleLogout, theme, toggleTheme } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `font-black uppercase tracking-widest text-[11px] px-4 py-2 rounded-xl transition-all duration-300 ${
      isActive 
      ? "bg-brand-secondary text-black shadow-lg shadow-brand-secondary/20" 
      : "text-white/70 hover:text-white hover:bg-white/10"
    }`;

  const onLogout = async () => {
    try {
      await handleLogout();
      navigate("/sign-in");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="sticky top-0 z-[100] w-full bg-brand-primary border-b border-white/5 shadow-2xl backdrop-blur-lg">
      <div className="max-w-7xl mx-auto navbar px-4 py-3">
        
        {/* START */}
        <div className="navbar-start flex items-center gap-4">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle text-brand-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-4 shadow-2xl bg-brand-primary border border-white/10 rounded-[2rem] w-64 gap-2 z-50">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/all-book" className={navLinkClass}>All Books</NavLink>
              <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
              <NavLink to="/support-us" className={navLinkClass}>Support Us</NavLink>
              {user && (
                <>
                  <div className="divider opacity-10 my-0"></div>
                  <NavLink to="/add-books" className={navLinkClass}>Add Books</NavLink>
                  <NavLink to="/my-books" className={navLinkClass}>My Books</NavLink>
                </>
              )}
            </ul>
          </div>

          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-2xl border border-white/10 shadow-inner" />
            <span className="hidden sm:inline font-black text-xl tracking-tighter text-white">
              HAVEN<span className="text-brand-secondary">.</span>
            </span>
          </NavLink>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/all-book" className={navLinkClass}>All Books</NavLink>
            <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
              <NavLink to="/support-us" className={navLinkClass}>Support Us</NavLink>

            {user && (
              <>
                <NavLink to="/add-books" className={navLinkClass}>Add Books</NavLink>
                <NavLink to="/my-books" className={navLinkClass}>My Books</NavLink>
              </>
            )}
          </ul>
        </div>

        {/* END */}
        <div className="navbar-end flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-3 bg-white/5 rounded-2xl border border-white/10 text-brand-secondary hover:bg-white/10 transition-all active:scale-90"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                <div className="w-12 rounded-2xl border-2 border-brand-secondary shadow-lg">
                  <img src={user?.photoURL || "https://i.pravatar.cc/150"} alt="User Avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-4 z-[1] p-4 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-3xl w-60 border border-base-content/10">
                <div className="px-4 py-3 mb-2 bg-base-200 rounded-2xl">
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Curator</p>
                    <p className="font-bold truncate">{user?.displayName || "Reader"}</p>
                </div>
                <li><Link to="/my-profile" className="py-3 font-bold hover:text-brand-primary transition-colors"><FaUserCircle /> My Profile</Link></li>
                <div className="divider my-1 opacity-10"></div>
                <li>
                  <button 
                    onClick={onLogout}
                    className="py-3 bg-error/10 text-error font-black hover:bg-error hover:text-error-content transition-all rounded-xl"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink to="/sign-in" className="btn btn-ghost btn-sm text-white font-bold px-6">Login</NavLink>
              <NavLink to="/sign-up" className="btn bg-brand-secondary text-black hover:bg-white border-none btn-sm px-6 font-black rounded-xl transition-all shadow-lg shadow-brand-secondary/20">Join</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;