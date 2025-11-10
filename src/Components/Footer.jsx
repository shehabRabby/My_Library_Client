import React from "react";

const Footer = () => {
  return (
    <div className="bg-violet-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <footer className="footer p-6 md:p-10 rounded flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Link Section */}
          <nav className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-4 md:mb-0">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>

          {/* Social Icons */}
          <nav className="flex gap-4 mb-4 md:mb-0">
            <a className="hover:text-gray-300 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 ..."></path>
              </svg>
            </a>
            <a className="hover:text-gray-300 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0 ..."></path>
              </svg>
            </a>
            <a className="hover:text-gray-300 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </nav>

          {/* Copyright */}
          <aside className="text-center md:text-right text-sm">
            <p>
              © {new Date().getFullYear()} ACME Industries Ltd. All rights
              reserved.
            </p>
          </aside>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
