import React from 'react';
import { assets } from '../../assets/assets';
import Title from '../../components/Title';

const Dashboard = () => {
    return (
        <div>
            <Title
                align='left'
                font='outfit'
                title='Dashboard'
                subTitle='Monitor your room listings, track bookings and analyze revenue—all in one place.'
            />

            <div className='flex gap-4 my-8'>
                <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                    <img className='max-sm:hidden h-10' src={assets.totalBookingIcon} alt="" />
                    <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-blue-500 text-lg'>Total Bookings</p>
                        <p className='text-neutral-400 text-base'>123</p>
                    </div>
                </div>
                <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                    <img className='max-sm:hidden h-10' src={assets.totalRevenueIcon} alt="" />
                    <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-blue-500 text-lg'>Total Revenue</p>
                        <p className='text-neutral-400 text-base'>₹99,000</p>
                    </div>
                </div>
            </div>

            <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>

            <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
                            <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
                            <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
                            <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        <tr>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>John Doe</td>
                            <td className='py-3 px-4 text-gray-400 border-t border-gray-300 max-sm:hidden'>Luxury Room</td>
                            <td className='py-3 px-4 text-gray-400 border-t border-gray-300 text-center'>₹8,000</td>
                            <td className='py-3 px-4 border-t border-gray-300 flex'>
                                <button className='py-1 px-3 text-xs rounded-full mx-auto bg-green-200 text-green-600'>
                                    Completed
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>Jane Smith</td>
                            <td className='py-3 px-4 text-gray-400 border-t border-gray-300 max-sm:hidden'>Double Bed</td>
                            <td className='py-3 px-4 text-gray-400 border-t border-gray-300 text-center'>₹6,500</td>
                            <td className='py-3 px-4 border-t border-gray-300 flex'>
                                <button className='py-1 px-3 text-xs rounded-full mx-auto bg-amber-200 text-yellow-600'>
                                    Pending
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
