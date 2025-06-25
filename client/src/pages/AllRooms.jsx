import React from 'react'
import { assets } from '../assets/assets'
import StarRating from '../components/StarRating'

const AllRooms = () => {
    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            <div>
                {/* Main Title */}
                <div className="flex flex-col items-start text-left">
                    <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
                        Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                    </p>
                </div>

                {/* Example Room Block */}
                <div className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
                    <img src={assets.uploadArea} alt="hotel-img" className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer' />
                    <div className='md:w-1/2 flex flex-col gap-2'>
                        <p className='text-gray-500'>City Name</p>
                        <p className='text-gray-800 text-3xl font-playfair cursor-pointer'>Hotel Name</p>
                        <div className='flex items-center'>
                            <StarRating />
                            <p className='ml-2'>200+ reviews</p>
                        </div>
                        <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                            <img src={assets.locationIcon} alt="location-icon" />
                            <span>Hotel Address</span>
                        </div>
                        <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                            <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                                <img src={assets.wifiIcon} alt="amenity" className='w-5 h-5' />
                                <p className='text-xs'>Free WiFi</p>
                            </div>
                        </div>
                        <p className='text-xl font-medium text-gray-700'>$100 /night</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
                <div className='flex items-center justify-between px-5 py-2.5 border-b border-gray-300'>
                    <p className='text-base font-medium text-gray-800'>FILTERS</p>
                    <div className='text-xs cursor-pointer'>CLEAR</div>
                </div>
                <div className='px-5 pt-5'>
                    <p className='font-medium text-gray-800 pb-2'>Popular filters</p>
                    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
                        <input type="checkbox" checked readOnly />
                        <span className='font-light select-none'>Double Bed</span>
                    </label>
                </div>
                <div className='px-5 pt-5'>
                    <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
                        <input type="checkbox" checked readOnly />
                        <span className='font-light select-none'>$500 to $1000</span>
                    </label>
                </div>
                <div className="px-5 pt-5 pb-7">
                    <p className="font-medium text-gray-800 pb-2">Sort By</p>
                    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
                        <input type="radio" name="sortOption" checked readOnly />
                        <span className="font-light select-none">Price Low to High</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default AllRooms;
