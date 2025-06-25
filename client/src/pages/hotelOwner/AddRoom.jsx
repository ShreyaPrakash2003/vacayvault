import React from 'react';
import { assets } from '../../assets/assets';
import Title from '../../components/Title';

const AddRoom = () => {
    return (
        <form>
            <Title
                align='left'
                font='outfit'
                title='Add Room'
                subTitle='Fill in the details carefully to enhance the booking experience.'
            />

            {/* Upload Area For Images */}
            <p className='text-gray-800 mt-10'>Images</p>
            <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
                {[1, 2, 3, 4].map((key) => (
                    <label key={key} htmlFor={`roomImage${key}`}>
                        <img
                            className='max-h-13 cursor-pointer opacity-80'
                            src={assets.uploadArea}
                            alt=""
                        />
                        <input
                            type="file"
                            accept='image/*'
                            id={`roomImage${key}`}
                            hidden
                        />
                    </label>
                ))}
            </div>

            {/* Room Type & Price */}
            <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
                <div className='flex-1 max-w-48'>
                    <p className='text-gray-800 mt-4'>Room Type</p>
                    <select className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                        <option value=''>Select Room Type</option>
                        <option value='Single Bed'>Single Bed</option>
                        <option value='Double Bed'>Double Bed</option>
                        <option value='Luxury Room'>Luxury Room</option>
                        <option value='Family Suite'>Family Suite</option>
                    </select>
                </div>

                <div>
                    <p className='mt-4 text-gray-800'>Price <span className='text-xs'>/night</span></p>
                    <input
                        type="number"
                        placeholder='0'
                        className='border border-gray-300 mt-1 rounded p-2 w-24'
                    />
                </div>
            </div>

            {/* Amenities */}
            <p className='text-gray-800 mt-4'>Amenities</p>
            <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
                {['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access'].map((amenity, index) => (
                    <div key={index}>
                        <input type='checkbox' id={`amenities${index + 1}`} />
                        <label htmlFor={`amenities${index + 1}`}> {amenity} </label>
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <button className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer'>
                Add Room
            </button>
        </form>
    );
};

export default AddRoom;
