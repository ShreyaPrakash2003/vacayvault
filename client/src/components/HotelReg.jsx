import React, { useState } from 'react'
import { cities } from '../assets/assets'
import Title from '../components/Title'
import toast from 'react-hot-toast'
import axios from 'axios'

const AddHotel = () => {
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    name: '',
     contact: '',
    address: '',
    city: ''
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const { name, contact, address, city } = inputs

    if (!name || !contact || !address || !city) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      console.log(inputs)
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/hotels/register`,
        inputs,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (data.success) {
        toast.success(data.message)
        setInputs({ name: '',  contact: '', address: '', city: '' })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Title
        align='left'
        font='outfit'
        title='Register Your Hotel'
        subTitle='Provide your hotel’s details to get it listed on the platform.'
      />

      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-sm'>
          <p className='text-gray-800 mt-4'>Hotel Name</p>
          <input
            type='text'
            name='name'
            value={inputs.name}
            placeholder='Type here'
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            className='border border-gray-300 mt-1 rounded p-2 w-full'
          />
        </div>

        <div className='flex-1 max-w-sm'>
          <p className='text-gray-800 mt-4'>Contact</p>
          <input
            type='text'
            name='contact'
            value={inputs.contact}
            placeholder='Type here'
            onChange={(e) => setInputs({ ...inputs, contact: e.target.value })}
            className='border border-gray-300 mt-1 rounded p-2 w-full'
          />
        </div>
      </div>

      <div className='max-w-2xl mt-4'>
        <p className='text-gray-800'>Address</p>
        <textarea
          name='address'
          value={inputs.address}
          placeholder='Type here'
          rows={3}
          onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
          className='border border-gray-300 mt-1 rounded p-2 w-full resize-none'
        />
      </div>

      <div className='max-w-xs mt-4'>
        <p className='text-gray-800'>City</p>
        <select
          name='city'
          value={inputs.city}
          onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
          className='border border-gray-300 mt-1 rounded p-2 w-full'
        >
          <option value=''>Select City</option>
          {cities.map((cityName, index) => (
            <option key={index} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
      </div>

      <button
        className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer'
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register Hotel'}
      </button>
    </form>
  )
}

export default AddHotel
