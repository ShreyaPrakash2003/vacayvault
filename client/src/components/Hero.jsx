import React, { useState } from 'react';
import { assets, cities } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`);
    console.log("Recent searched destination:", destination);
  };

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className='bg-[#49B9FF]/50 px-4 py-1 rounded-full mt-20 text-sm font-medium tracking-wide'>
        The Ultimate Hotel Experience
      </p>

      <h1 className='font-playfair text-3xl md:text-5xl font-extrabold max-w-2xl mt-5 leading-tight'>
        Discover Your Perfect Gateway Destination
      </h1>

      <p className='max-w-xl mt-3 text-base md:text-lg text-white/90 font-light'>
        Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
      </p>

      {/* Search Form */}
      <form
        onSubmit={onSearch}
        className='bg-white text-gray-700 rounded-xl px-6 py-5 mt-10 w-full max-w-5xl flex flex-wrap gap-6 items-end shadow-lg'
      >
        {/* Destination */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label htmlFor="destinationInput" className="flex items-center gap-2 text-sm font-medium mb-1">
            <img src={assets.calenderIcon} alt="icon" className="h-4" />
            Destination
          </label>
          <select
            id="destinationInput"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            required
          >
            <option value="" disabled>Select a city</option>
            {cities.slice(0, 27).map((city, index) => (
              typeof city === 'string' ? (
                <option key={index} value={city}>{city}</option>
              ) : (
                <option key={index} value={city.name}>{city.name}</option>
              )
            ))}
          </select>
        </div>

        {/* Check-In */}
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label htmlFor="checkIn" className="flex items-center gap-2 text-sm font-medium mb-1">
            <img src={assets.calenderIcon} alt="icon" className="h-4" />
            Check In
          </label>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Check-Out */}
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label htmlFor="checkOut" className="flex items-center gap-2 text-sm font-medium mb-1">
            <img src={assets.calenderIcon} alt="icon" className="h-4" />
            Check Out
          </label>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col flex-1 min-w-[100px]">
          <label htmlFor="guests" className="text-sm font-medium mb-1">
            Guests
          </label>
          <input
            id="guests"
            type="number"
            min={1}
            max={4}
            placeholder="1"
            className="rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Search Button */}
        <div className="flex justify-end min-w-full md:min-w-[150px]">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full md:w-auto bg-black text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-900 transition-all"
          >
            <img src={assets.searchIcon} alt="search" className="h-5" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hero;
