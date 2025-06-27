import React, { useState } from 'react';
import { UserData } from '../context/AppProvider';


const RegisterForm = () => {
    const {register}= UserData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isHotelOwner: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form Data Submitted:", formData);

  register({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    role: formData.isHotelOwner ? 'hotelOwner' : 'user'
  });
};


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="isHotelOwner"
            checked={formData.isHotelOwner}
            onChange={handleChange}
            className="mr-2"
          />
          Are you a <span className="font-semibold ml-1">Hotel Owner?</span>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
