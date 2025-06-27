import React, { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../context/AppProvider';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UserData();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    if (token && !user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  useEffect(() => {
    console.log('User from context:', user);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload(); // to fully reset app state if needed
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <img
        onClick={() => navigate('/')}
        className="h-9 invert opacity-80 cursor-pointer"
        src={assets.logo}
        alt="QuickStay logo"
      />

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <button onClick={() => navigate('/login')} className="text-sm font-medium hover:text-gray-600">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="text-sm font-medium hover:text-gray-600">
              Register
            </button>
          </>
        ) : (
          <button onClick={handleLogout} className="text-sm font-medium hover:text-gray-600">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
