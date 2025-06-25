import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <Link to="/">
        <img
          className="h-9 invert opacity-80"
          src={assets.logo}
          alt="QuickStay logo"
        />
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-medium hover:text-gray-600">Login</Link>
        <Link to="/register" className="text-sm font-medium hover:text-gray-600">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
