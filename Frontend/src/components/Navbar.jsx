import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-black py-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-xl">
            WBC
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-gold focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-gold transition-colors"
            >
              HOME
            </Link>
            <Link
              to="/marketplace"
              className="text-white hover:text-gold transition-colors"
            >
              PRODUCTS
            </Link>
            <Link
              to="/about-us"
              className="text-white hover:text-gold transition-colors"
            >
              ABOUT
            </Link>
            <Link
              to="/contact-us"
              className="text-white hover:text-gold transition-colors"
            >
              CONTACT
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated() ? (
              <>
                <Link
                  to="/login"
                  className="bg-gold text-black px-4 py-2 rounded-md hover:bg-gold-dark transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/seller-dashboard"
                  className="border-2 border-gold text-gold px-4 py-2 rounded-md hover:bg-gold hover:text-black transition-colors"
                >
                  Become a Seller
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden mt-4`}>
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-gold transition-colors"
            >
              HOME
            </Link>
            <Link
              to="/marketplace"
              className="text-white hover:text-gold transition-colors"
            >
              PRODUCTS
            </Link>
            <Link
              to="/about-us"
              className="text-white hover:text-gold transition-colors"
            >
              ABOUT
            </Link>
            <Link
              to="/contact-us"
              className="text-white hover:text-gold transition-colors"
            >
              CONTACT
            </Link>
            {!isAuthenticated() ? (
              <>
                <Link
                  to="/login"
                  className="bg-gold text-black px-4 py-2 rounded-md hover:bg-gold-dark transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  to="/seller-dashboard"
                  className="border-2 border-gold text-gold px-4 py-2 rounded-md hover:bg-gold hover:text-black transition-colors text-center"
                >
                  Become a Seller
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
