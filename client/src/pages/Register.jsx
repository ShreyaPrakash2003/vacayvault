import React, { useState, useEffect } from 'react';
import { UserData } from '../context/AppProvider';
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaRegBuilding,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

const RegisterForm = () => {
  const { register } = UserData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isHotelOwner: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.isHotelOwner ? 'hotelOwner' : 'user',
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-28 flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200 transition-all">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 pl-10 pr-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Hotel Owner */}
          <label className="flex items-center text-gray-700 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="isHotelOwner"
              checked={formData.isHotelOwner}
              onChange={handleChange}
              className="mr-2 accent-blue-600 w-4 h-4"
            />
            <FaRegBuilding className="mr-2 text-gray-500" />
            I am a <span className="font-semibold ml-1">Hotel Owner</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md text-lg shadow-md hover:bg-blue-700 hover:scale-[1.03] transition-transform duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
