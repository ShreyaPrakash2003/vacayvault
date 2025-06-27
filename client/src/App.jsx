import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'
import HotelReg from './components/HotelReg'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import Footer from './components/Footer'
import MyBookings from './pages/MyBookings'
import Loader from './components/Loader'
import RegisterForm from './pages/Register'
import LoginForm from './pages/Login'


const App = () => {
  const [showHotelReg, setShowHotelReg] = useState(false);

  return (
    <div className='font-inter'>
      <Navbar onHotelRegClick={() => setShowHotelReg(true)} />
      
      {showHotelReg && (
        <HotelReg
          onClose={() => setShowHotelReg(false)}
          onSuccess={() => setShowHotelReg(false)}
        />
      )}

      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path="/loader/:nextUrl" element={<Loader />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
             <Route path="add-hotel" element={<HotelReg/>} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
