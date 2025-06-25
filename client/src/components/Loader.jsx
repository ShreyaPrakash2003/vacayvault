import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loader = () => {
  const navigate = useNavigate();
  const { nextUrl } = useParams();

  useEffect(() => {
    if (nextUrl) {
      const timeout = setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 8000); // Delay navigation by 8 seconds

      return () => clearTimeout(timeout); // Clear timeout on unmount
    }
  }, [nextUrl, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-blue-500"></div>
    </div>
  );
};

export default Loader;
