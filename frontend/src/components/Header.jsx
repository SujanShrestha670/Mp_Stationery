import { useState, useEffect } from "react";
import { CiShoppingCart, CiHeart, CiSearch, CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as necessary

const Header = ({ handleLoginToggle }) => {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Search...");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (isAuthenticated === null) return; // still loading
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      handleLoginToggle();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPlaceholder("Search...");
      } else if (window.innerWidth < 768) {
        setPlaceholder("Search products...");
      } else {
        setPlaceholder("Search for products, categories, etc.");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <nav className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-[60px] sm:h-[70px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center pr-3 sm:pr-4 border-r mr-2">
            <p className="text-lg sm:text-xl font-bold">MpStationery</p>
          </div>

          {/* Search Bar */}
          <div className="flex-1 px-1">
            <div className="relative w-full max-w-full md:max-w-[400px] mx-auto">
              <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg sm:text-xl" />
              <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-1.5 border rounded-md text-sm sm:text-base 
                  focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-xs sm:placeholder:text-sm"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-8 pl-3">
            <CiUser
              onClick={handleUserIconClick}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer text-xl"
              title="Profile"
            />
            <CiHeart
              onClick={() => navigate("/wishlist")} // Redirect to wishlist
              className="text-gray-600 hover:text-red-500 transition-colors duration-200 cursor-pointer text-xl"
              title="Wishlist"
            />
            <CiShoppingCart
              onClick={() => navigate("/addtocart")} // Redirect to cart
              className="text-gray-600 hover:text-green-600 transition-colors duration-200 cursor-pointer text-xl"
              title="Cart"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
