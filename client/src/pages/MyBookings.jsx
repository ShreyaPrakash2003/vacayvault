import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../context/AppProvider';

const MyBookings = () => {
  const { user } = UserData(); // Only user from context
  const [bookings, setBookings] = useState([]);

  const getToken = () => localStorage.getItem('token');

  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/user`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching bookings');
    }
  };

  useEffect(() => {
    if (user) fetchUserBookings();
  }, [user]);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place."
        align="left"
      />
      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        <div className="my-10">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
        >
          {/* Room Image & Details */}
          <div className="flex flex-col md:flex-row">
            <img
              className="min-md:w-44 rounded shadow object-cover"
              src={booking.room?.images?.[0] || '/placeholder.jpg'}
              alt="hotel-img"
            />
            <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
              <p className="font-playfair text-2xl">
                {booking.hotel?.name || 'Unknown Hotel'}
                <span className="font-inter text-sm">
                  {' '}
                  ({booking.room?.roomType || 'Room'})
                </span>
              </p>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{booking.hotel?.address || 'No address'}</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <img src={assets.guestsIcon} alt="guests-icon" />
                <span>Guests: {booking.guests || 1}</span>
              </div>

              <p className="text-base">
                Total: ₹{booking.totalPrice || '0.00'}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
            <div>
              <p>Check-In:</p>
              <p className="text-gray-500 text-sm">
                {booking.checkInDate
                  ? new Date(booking.checkInDate).toDateString()
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p>Check-Out:</p>
              <p className="text-gray-500 text-sm">
                {booking.checkOutDate
                  ? new Date(booking.checkOutDate).toDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>

          {/* Payment Status */}
          <div className="flex items-center pt-3 gap-2">
            <div
              className={`h-3 w-3 rounded-full ${
                booking.isPaid ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></div>
            <p
              className={`text-sm ${
                booking.isPaid ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {booking.isPaid ? 'Paid' : 'Unpaid'}
            </p>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default MyBookings;
