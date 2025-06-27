import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserData } from '../../context/AppProvider';

const ListRoom = () => {
  const { user } = UserData();
  const [rooms, setRooms] = useState([]);

  // Fetch all rooms owned by the current user
  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/owner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Toggle availability of a room
  const toggleAvailability = async (roomId) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/toggle-availability`,
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchRooms(); // Refresh data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchRooms();
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />

      <p className="text-gray-500 mt-8">Total Rooms: {rooms.length}</p>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Facility</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Price / night</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">{item.hotel.name}</td>
                <td className="py-3 px-4 text-gray-400 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(', ')}
                </td>
                <td className="py-3 px-4 text-gray-400 border-t border-gray-300">
                  ₹{item.pricePerNight}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={() => toggleAvailability(item._id)}
                      checked={item.isAvailable}
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200" />
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
