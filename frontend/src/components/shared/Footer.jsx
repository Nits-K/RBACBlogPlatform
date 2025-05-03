import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Make sure to import the useSelector hook

const Footer = () => {
  const { user } = useSelector((state) => state.auth); // Get user info from the redux store

  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-700 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          {/* Left section */}
          <div className="text-center sm:text-left">
            <Link to={user?.role === "admin" ? "/admin" : "/"}>
              <h2 className="text-3xl font-semibold text-white">
                Blog<span className="text-yellow-400">Village</span>
              </h2>
            </Link>
            <p className="text-sm opacity-75 mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Middle section - Links */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium">Quick Links</p>
            <ul className="space-y-2 mt-2">
              <li>
                <Link
                  to={user?.role === "admin" ? "/admin" : "/"}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Right section - Social Media Icons */}
          <div className="flex justify-center sm:justify-end space-x-6 mt-4 sm:mt-0">
            <a
              href="https://facebook.com"
              className="text-white hover:text-yellow-400 transition-colors duration-300"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.588l-.467 3.622h-3.121V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="text-white hover:text-yellow-400 transition-colors duration-300"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337 3.1a9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.15 4.916 4.916 0 003.195 9.72 4.9 4.9 0 01.964 9.1v.062a4.919 4.919 0 003.946 4.827 4.902 4.902 0 01-2.212.084 4.918 4.918 0 004.59 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              className="text-white hover:text-yellow-400 transition-colors duration-300"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452H17.21v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667h-3.233V9h3.105v1.561h.045c.434-.82 1.494-1.684 3.073-1.684 3.29 0 3.894 2.164 3.894 4.977v6.598zM5.337 7.433a1.872 1.872 0 110-3.744 1.872 1.872 0 010 3.744zM6.857 20.452H3.815V9h3.042v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
