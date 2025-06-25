import React from 'react';
import Title from '../../components/Title';

const ListRoom = () => {
    return (
        <div>
            <Title
                align='left'
                font='outfit'
                title='Room Listings'
                subTitle='View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.'
            />

            <p className='text-gray-500 mt-8'>Total Hotels</p>

            <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                            <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Price / night</th>
                            <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        <tr>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>Double Bed</td>
                            <td className='py-3 px-4 text-gray-400 border-t border-gray-300 max-sm:hidden'>Free WiFi, Pool Access</td>
                            <td className='py-3 px-4 text-gray-400 border-t border-gray-300'>2000</td>
                            <td className='py-3 px-4 border-t border-gray-300 text-center text-sm text-red-500'>
                                <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                </label>
                            </td>
                        </tr>
                        {/* You can duplicate or manually add static rows here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListRoom;
