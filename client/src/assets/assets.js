import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";


export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
}

export const cities = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Udaipur",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
  
];



export const exclusiveOffers = [
    {
        _id: 1,
        title: "Monsoon Madness Offer",
        description: "Stay for 3 nights, pay for 2 – plus complimentary breakfast in select Goa resorts!",
        priceOff: 33,
        expiryDate: "Jul 31",
        image: exclusiveOfferCardImg1
    },
    {
        _id: 2,
        title: "Couples Retreat in Udaipur",
        description: "Romantic lakefront dinner + spa package for couples",
        priceOff: 20,
        expiryDate: "Aug 15",
        image: exclusiveOfferCardImg2
    },
    {
        _id: 3,
        title: "Himalayan Hideaway Deal",
        description: "Book early and save big on luxury stays in Shimla & Manali",
        priceOff: 30,
        expiryDate: "Sep 10",
        image: exclusiveOfferCardImg3
    }
];


// Testimonials Dummy Data
export const testimonials = [
    {
        id: 1,
        name: "Aarav Mehta",
        address: "Ahmedabad, India",
        image: "https://ui-avatars.com/api/?name=Aarav+Mehta&background=0D8ABC&color=fff",
        rating: 5,
        review: "QuickStay made our family trip to Kerala effortless and affordable. Loved the service!"
    },
    {
        id: 2,
        name: "Priya Ramesh",
        address: "Chennai, India",
        image: "https://ui-avatars.com/api/?name=Priya+Ramesh&background=AB47BC&color=fff",
        rating: 4,
        review: "The best platform for quick hotel bookings in India. Clean UI and great offers!"
    },
    {
        id: 3,
        name: "Kabir Khan",
        address: "Delhi, India",
        image: "https://ui-avatars.com/api/?name=Kabir+Khan&background=F57C00&color=fff",
        rating: 5,
        review: "I used QuickStay for a last-minute business trip to Mumbai – smooth and reliable experience!"
    }
];



// Facility Icon
export const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: assets.badgeIcon, title: "Enhanced Cleaning", description: "This host follows Staybnb's strict cleaning standards." },
    { icon: assets.locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: assets.heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Shreya Prakash",
    "email": "shreya.prakash@example.in",
    "image": "https://randomuser.me/api/portraits/women/44.jpg",
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": ["Goa"]
};


// Hotel Dummy Data
export const hotelDummyData = {
    "_id": "hotel_ind_001",
    "name": "Taj Gateway Resort",
    "address": "MG Road, Near City Palace, Jaipur, Rajasthan",
    "contact": "+91 9876543210",
    "owner": userDummyData,
    "city": "Jaipur",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
};


// Rooms Dummy Data
export const roomsDummyData = [
    {
        "_id": "room_ind_001",
        "hotel": hotelDummyData,
        "roomType": "Deluxe Suite",
        "pricePerNight": 5999,
        "amenities": ["Free WiFi", "Free Breakfast", "Pool Access"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "room_ind_002",
        "hotel": hotelDummyData,
        "roomType": "Executive Room",
        "pricePerNight": 4499,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:25:22.593Z",
        "updatedAt": "2025-04-10T06:25:22.593Z",
        "__v": 0
    },
    {
        "_id": "room_ind_003",
        "hotel": hotelDummyData,
        "roomType": "Premium Room",
        "pricePerNight": 3499,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "room_ind_004",
        "hotel": hotelDummyData,
        "roomType": "Standard Room",
        "pricePerNight": 2499,
        "amenities": ["Free WiFi", "Room Service"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    }
];


// User Bookings Dummy Data
export const userBookingsDummyData = [
    {
        "_id": "booking_ind_001",
        "user": userDummyData,
        "room": roomsDummyData[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-06-15T00:00:00.000Z",
        "checkOutDate": "2025-06-17T00:00:00.000Z",
        "totalPrice": 1998,
        "guests": 2,
        "status": "confirmed",
        "paymentMethod": "UPI",
        "isPaid": true,
        "createdAt": "2025-06-01T06:42:01.529Z",
        "updatedAt": "2025-06-02T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "booking_ind_002",
        "user": userDummyData,
        "room": roomsDummyData[2],
        "hotel": hotelDummyData,
        "checkInDate": "2025-06-10T00:00:00.000Z",
        "checkOutDate": "2025-06-11T00:00:00.000Z",
        "totalPrice": 1499,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Cash at Hotel",
        "isPaid": false,
        "createdAt": "2025-06-01T06:41:45.873Z",
        "updatedAt": "2025-06-01T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "booking_ind_003",
        "user": userDummyData,
        "room": roomsDummyData[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-05-30T00:00:00.000Z",
        "checkOutDate": "2025-05-31T00:00:00.000Z",
        "totalPrice": 2499,
        "guests": 2,
        "status": "completed",
        "paymentMethod": "Credit Card",
        "isPaid": true,
        "createdAt": "2025-05-20T06:41:20.501Z",
        "updatedAt": "2025-05-30T06:41:20.501Z",
        "__v": 0
    }
];


export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": 17996, // 11998 + 3499 + 2499
    "bookings": userBookingsDummyData
};

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/