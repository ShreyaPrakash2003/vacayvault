import React, { useEffect, useState } from 'react';
import { assets, roomCommonData } from '../assets/assets';
import { UserData } from '../context/AppProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import StarRating from '../components/StarRating';
import ChatPopup from '../components/Chatpopup';




// Local amenities-to-icon map
const facilityIcons = {
  "Free WiFi": assets.freeWifiIcon,
  "Free Breakfast": assets.freeBreakfastIcon,
  "Room Service": assets.roomServiceIcon,
  "Mountain View": assets.mountainIcon,
  "Pool Access": assets.poolIcon,
};

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms } = UserData();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // Find room on mount
  useEffect(() => {
    const foundRoom = rooms.find(r => r._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [rooms, id]);

  // Check if room is available
  const checkAvailability = async () => {
    if (checkInDate >= checkOutDate) {
      toast.error("Check-In Date should be less than Check-Out Date");
      return;
    }
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/check-availability`, {
        room: id,
        checkInDate,
        checkOutDate,
      });
      if (data.success) {
        setIsAvailable(data.isAvailable);
        toast[data.isAvailable ? "success" : "error"](data.isAvailable ? "Room is available" : "Room is not available");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Check failed");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isAvailable) {
      return checkAvailability();
    }
    try {
      const { data } = await axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/bookings/book`,
  {
    room: id,
    checkInDate,
    checkOutDate,
    guests,
    paymentMethod: "Pay At Hotel"
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);

      if (data.success) {
        toast.success(data.message);
        navigate('/my-bookings');
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (!room) return null;

  return (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Header */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-playfair'>
          {room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span>
        </h1>
        <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
      </div>
      <div className='flex items-center gap-1 mt-2'>
        <StarRating />
        <p className='ml-2'>200+ reviews</p>
      </div>
      <div className='flex items-center gap-1 text-gray-500 mt-2'>
        <img src={assets.locationIcon} alt='location-icon' />
        <span>{room.hotel.address}</span>
      </div>

      {/* Images */}
      <div className='flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
          <img className='w-full rounded-xl shadow-lg object-cover' src={mainImage} alt='Main Room' />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
          {room.images?.map((img, i) => (
            <img key={i} onClick={() => setMainImage(img)} src={img}
              className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === img ? 'outline-3 outline-orange-500' : ''}`}
              alt='Room Thumbnail' />
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className='flex flex-col md:flex-row md:justify-between mt-10'>
        <div>
          <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
          <div className='flex flex-wrap mt-3 mb-6 gap-4'>
            {room.amenities?.map((item, i) => (
              <div key={i} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                <p className='text-xs'>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p className='text-2xl font-medium'>₹{room.pricePerNight}/night</p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmitHandler} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
        <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
          <div>
            <label className='font-medium'>Check-In</label>
            <input type='date' min={new Date().toISOString().split('T')[0]} onChange={(e) => setCheckInDate(e.target.value)} required className='w-full border border-gray-300 rounded px-3 py-2 mt-1.5' />
          </div>
          <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
          <div>
            <label className='font-medium'>Check-Out</label>
            <input type='date' min={checkInDate} onChange={(e) => setCheckOutDate(e.target.value)} required disabled={!checkInDate} className='w-full border border-gray-300 rounded px-3 py-2 mt-1.5' />
          </div>
          <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
          <div>
            <label className='font-medium'>Guests</label>
            <input type='number' value={guests} onChange={(e) => setGuests(e.target.value)} min={1} className='max-w-20 border border-gray-300 rounded px-3 py-2 mt-1.5' />
          </div>
        </div>
        <button type='submit' className='bg-primary hover:bg-primary-dull text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base'>
          {isAvailable ? 'Book Now' : 'Check Availability'}
        </button>
      </form>

      {/* Common Specs */}
      <div className='mt-25 space-y-4'>
        {roomCommonData.map((spec, i) => (
          <div key={i} className='flex items-start gap-2'>
            <img className='w-6.5' src={spec.icon} alt={`${spec.title}-icon`} />
            <div>
              <p className='text-base'>{spec.title}</p>
              <p className='text-gray-500'>{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Host Info */}
      <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
        <p>
          Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment with a true city feeling.
        </p>
      </div>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex gap-4'>
          <img className='h-14 w-14 md:h-18 md:w-18 rounded-full' src={room.hotel.owner.image} alt='Host' />
          <div>
            <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
            <div className='flex items-center mt-1'>
              <StarRating />
              <p className='ml-2'>200+ reviews</p>
            </div>
          </div>
        </div>
        <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>
          Contact Now
        </button>
      </div>
      <ChatPopup/>
    </div>
  );
};

export default RoomDetails;
