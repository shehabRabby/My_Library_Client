import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  const handleTheme = (checked) => {
    const html = document.querySelector("html");
    if (checked) {
      html.setAttribute("data-theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
    }
  };

  if (loading) return null;

  return (
    <div className="bg-violet-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto navbar px-4">
        {/* Logo and Hamburger */}
        <div className="navbar-start flex items-center gap-3">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-16 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-full object-cover"
            />
            <span className="hidden xl:inline font-bold text-2xl tracking-wide">
              Book Haven
            </span>
          </NavLink>

          {/* Hamburger */}
          <div className="lg:hidden ml-2">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-violet-700 rounded-box w-52 gap-2"
              >
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/all-book" className={navLinkClass}>
                  All Books
                </NavLink>
                <NavLink to="/about-us" className={navLinkClass}>
                  About-us
                </NavLink>
                <NavLink to="/add-books" className={navLinkClass}>
                  Add Books
                </NavLink>
                <NavLink to="/my-books" className={navLinkClass}>
                  My Books
                </NavLink>
                {user ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-right text-violet-200 hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <NavLink to="/sign-in" className={navLinkClass}>
                      Login
                    </NavLink>
                    <NavLink to="/sign-up" className={navLinkClass}>
                      Register
                    </NavLink>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6 text-base font-medium">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/all-book" className={navLinkClass}>
              All Books
            </NavLink>
            <NavLink to="/about-us" className={navLinkClass}>
              About-us
            </NavLink>
            <NavLink to="/add-books" className={navLinkClass}>
              Add Books
            </NavLink>
            <NavLink to="/my-books" className={navLinkClass}>
              My Books
            </NavLink>
            {user ? null : (
              <>
                <NavLink to="/sign-in" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/sign-up" className={navLinkClass}>
                  Register
                </NavLink>
              </>
            )}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-3">
          {/* Theme toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="hidden sm:inline text-white text-sm">
              Change Theme
            </span>
            <input
              type="checkbox"
              defaultChecked={localStorage.getItem("theme") === "dark"}
              onChange={(e) => handleTheme(e.target.checked)}
              className="toggle toggle-sm"
            />
          </label>

          {user ? (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/100"}
                  alt={user.displayName}
                  className="h-12 w-12 rounded-full object-cover border-2 border-white"
                />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 text-sm whitespace-nowrap">
                  {user.displayName || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn bg-white text-violet-700 border-none hover:bg-violet-100 font-semibold"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
