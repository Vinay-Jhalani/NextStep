import { Link } from "react-router-dom";
import { GraduationCap, Menu, X, User, LogOut } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">NextStep</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/quiz"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Career Quiz
            </Link>
            <Link
              to="/programs"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Programs
            </Link>
            <Link
              to="/colleges"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Colleges
            </Link>
            <Link
              to="/alerts"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Alerts
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-primary-600 font-medium transition"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/quiz"
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md"
            >
              Career Quiz
            </Link>
            <Link
              to="/programs"
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md"
            >
              Programs
            </Link>
            <Link
              to="/colleges"
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md"
            >
              Colleges
            </Link>
            <Link
              to="/alerts"
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md"
            >
              Alerts
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-white bg-primary-600 rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
