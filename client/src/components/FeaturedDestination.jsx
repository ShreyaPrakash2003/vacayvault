import React, { useEffect } from 'react';
import Title from './Title';
import HotelCard from './HotelCard';
import { UserData } from '../context/AppProvider';

const FeaturedDestination = () => {
  const { fetchRooms, rooms } = UserData();

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <section className="bg-slate-50 py-20 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Title */}
      <Title
        title="Featured Destination"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      {/* Room Cards */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-stretch">
        {rooms.length === 0 ? (
          <p className="col-span-full text-gray-500 text-center">No rooms found.</p>
        ) : (
          rooms.map((room) => <HotelCard key={room._id} room={room} />)
        )}
      </div>

      {/* CTA Button */}
      <div className="mt-20 text-center">
        <button
          className="px-6 py-3 text-base font-semibold text-white bg-black rounded-full shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
        >
          View All Destinations
        </button>
      </div>
    </section>
  );
};

export default FeaturedDestination;
