import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 1. Initialize theme state from localStorage
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Apply theme to <html> tag whenever 'theme' state changes
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((err) => console.log(err));
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 hover:text-violet-300 ${
      isActive
        ? "text-yellow-300 font-semibold underline underline-offset-4"
        : ""
    }`;

  // 3. Toggle function
  const toggleTheme = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  if (loading) return null;

  return (
    <div className="sticky top-0 z-[100] bg-brand-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto navbar px-4">
        {/* Logo and Hamburger */}
        <div className="navbar-start flex items-center gap-3">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-16 lg:h-20 lg:w-20 rounded-full object-cover border-2 border-white/20"
            />
            <span className="hidden xl:inline font-bold text-2xl tracking-wide">
              Book Haven
            </span>
          </NavLink>

          {/* Hamburger (Mobile) */}
          <div className="lg:hidden ml-2">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-brand-primary rounded-box w-52 gap-2 z-50">
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                <NavLink to="/all-book" className={navLinkClass}>All Books</NavLink>
                <NavLink to="/about-us" className={navLinkClass}>About-us</NavLink>
                <NavLink to="/add-books" className={navLinkClass}>Add Books</NavLink>
                <NavLink to="/my-books" className={navLinkClass}>My Books</NavLink>
                {!user && (
                   <>
                    <NavLink to="/sign-in" className={navLinkClass}>Login</NavLink>
                    <NavLink to="/sign-up" className={navLinkClass}>Register</NavLink>
                   </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6 text-base font-medium">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/all-book" className={navLinkClass}>All Books</NavLink>
            <NavLink to="/about-us" className={navLinkClass}>About-us</NavLink>
            <NavLink to="/add-books" className={navLinkClass}>Add Books</NavLink>
            <NavLink to="/my-books" className={navLinkClass}>My Books</NavLink>
            {!user && (
              <>
                <NavLink to="/sign-in" className={navLinkClass}>Login</NavLink>
                <NavLink to="/sign-up" className={navLinkClass}>Register</NavLink>
              </>
            )}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          {/* Enhanced Theme Toggle */}
          <div className="flex items-center gap-2">
            <label className="swap swap-rotate text-white hover:text-brand-secondary transition-colors">
              <input 
                type="checkbox" 
                onChange={toggleTheme} 
                checked={theme === "dark"} 
              />
              {/* Sun Icon (Visible in Dark Mode) */}
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              {/* Moon Icon (Visible in Light Mode) */}
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.71Z"/></svg>
            </label>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/100"}
                  alt={user.displayName}
                  className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover border-2 border-brand-secondary"
                />
                <span className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap z-50">
                  {user.displayName || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm lg:btn-md bg-white text-brand-primary border-none hover:bg-brand-secondary hover:text-black font-bold"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;