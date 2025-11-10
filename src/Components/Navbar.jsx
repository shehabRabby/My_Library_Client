import { NavLink } from "react-router";
import logo from "../assets/logo.png"; // adjust path if needed

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 hover:text-violet-300 ${
      isActive
        ? "text-yellow-300 font-semibold underline underline-offset-4"
        : ""
    }`;

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/all-book" className={navLinkClass}>
        All Books
      </NavLink>
      <NavLink to="/add-books" className={navLinkClass}>
        Add Books
      </NavLink>
      <NavLink to="/about-us" className={navLinkClass}>
        About Us
      </NavLink>
      <NavLink to="/sign-in" className={navLinkClass}>
        Login
      </NavLink>
      <NavLink to="/sign-up" className={navLinkClass}>
        Register
      </NavLink>
    </>
  );

  return (
    <div className="bg-violet-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto navbar px-4">
        {/* Left Section */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost text-white">
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
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-violet-700 rounded-box z-[1] mt-3 w-52 p-3 shadow text-white space-y-2"
            >
              {links}
            </ul>
          </div>

          {/* Logo + Name */}
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-14 sm:h-16 sm:w-16 lg:h-25 lg:w-25 rounded-full object-cover"
            />
            <span className="hidden xl:inline font-bold text-2xl tracking-wide">
              Book Haven
            </span>
          </NavLink>
        </div>

        {/* Center Section (hidden on mobile) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6 text-base font-medium">
            {links}
          </ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end flex items-center gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full border-2 border-white overflow-hidden">
            <img
              src="https://i.pravatar.cc/100"
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
          <button className="btn bg-white text-violet-700 border-none hover:bg-violet-100 font-semibold">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
