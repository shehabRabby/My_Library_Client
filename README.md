<!-- import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0d1117] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide flex items-center gap-2"
        >
          <span className="h-9 w-9 rounded-full border-white border-1 bg-white">
            🎮
          </span>{" "}
          <span className="text-[#58a6ff]">GameZone</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 hover:text-[#58a6ff] ${
                  isActive ? "text-[#58a6ff]" : "text-gray-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 hover:text-[#58a6ff] ${
                  isActive ? "text-[#58a6ff]" : "text-gray-300"
                }`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 hover:text-[#58a6ff] ${
                  isActive ? "text-[#58a6ff]" : "text-gray-300"
                }`
              }
            >
              Registration
            </NavLink>
          </>
        </div>

        <button
          className="md:hidden text-gray-300 hover:text-[#58a6ff] transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar; -->
 <!-- || "https://i.pravatar.cc/100" -->