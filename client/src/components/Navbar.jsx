import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with real login logic

  useEffect(() => {
    setIsScrolled(location.pathname !== "/");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((navLink, index) => (
          <NavLink key={index} to={navLink.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`} onClick={() => scrollTo(0, 0)}>
            {navLink.name}
            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
          </NavLink>
        ))}
        {isLoggedIn && (
          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? "text-black" : "text-white"} transition-all`}
            onClick={() => navigate("/owner")}
          >
            Dashboard
          </button>
        )}
      </div>

      {/* Desktop Auth Icons */}
      <div className="hidden md:flex items-center gap-4">
        <img src={assets.searchIcon} alt="search" className={`${isScrolled && "invert"} h-7 transition-all duration-500`} />
        {isLoggedIn ? (
          <button
            onClick={() => navigate("/my-bookings")}
            className="text-sm px-4 py-2 border rounded-full hover:bg-gray-100"
          >
            My Bookings
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex items-center gap-3 md:hidden">
        <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="menu" className={`${isScrolled && "invert"} h-4 cursor-pointer`} />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col md:hidden items-center justify-center gap-6 text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
          <img src={assets.closeMenu} alt="close-menu" className="h-6.5" />
        </button>

        {navLinks.map((navLink) => (
          <NavLink key={navLink.name} to={navLink.path} onClick={() => setIsMenuOpen(false)}>
            {navLink.name}
          </NavLink>
        ))}

        {isLoggedIn && (
          <>
            <NavLink to="/my-bookings" onClick={() => setIsMenuOpen(false)}>
              My Bookings
            </NavLink>
            <button
              className="border px-4 py-1 text-sm font-light rounded-full"
              onClick={() => navigate("/owner")}
            >
              Dashboard
            </button>
          </>
        )}

        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-8 py-2.5 rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
