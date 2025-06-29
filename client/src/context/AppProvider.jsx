import React, { createContext, useContext, useState ,useEffect} from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { server } from "../main";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const navigate= useNavigate();
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
 const[rooms,setRooms]=useState([])

 
 

  const register = async (formData) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, formData);
      if (data.success) {
        toast.success("Registered successfully! Please log in.");
        navigate('/login')
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration error");
    }
  };



 const fetchUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setUser(null); // No token means definitely not logged in
    return;
  }

  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(data.user); // Valid user
  } catch (error) {
    console.log("Token invalid or expired");
    localStorage.removeItem("token");
    setUser(null); // <== Important: Clear user state if fetch fails
    console.log(error);
  }
};



 const login = async (formData) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, formData);
    if (data.success) {
      toast.success("Login successful!");
      localStorage.setItem("token", data.token);        // Save token
      setUser(data.user);                               // Set user state
      navigate("/");                                     // Redirect
    } else {
      toast.error(data.message || "Login failed");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login error");
  }
};


 useEffect(() => {
   fetchUser();
  }, []);

const fetchRooms = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`);
    setRooms(data.rooms);
  } catch (error) {
    toast.error("Failed to fetch rooms",error);
    
  }
};


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        register,
        login,
        fetchUser,
        rooms,
        fetchRooms,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);