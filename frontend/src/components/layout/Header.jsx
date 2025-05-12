import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faUser,
  faHeart,
  faShoppingCart,
  faSearch,
  faArrowLeft,
  faThLarge,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import wireframeImage1 from "../../assets/6010836baf4234067228f982_6002086f72b7278bf001d3fc_wireframe.jpeg";
import wireframeImage2 from "../../assets/Wireframes.png";
import "./Header.css";

const Header = ({ isLoginOpen, handleLoginToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFirstImage, setIsFirstImage] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstImage((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="relative">
      {isMobile ? (
        <div>
          <nav className="navbar h-[80px] shadow-sm font-quicksand relative z-20 transform transition-transform duration-700 px-4">
            <div className="flex-1 flex items-center justify-between">
              {isSearchOpen && (
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-lg cursor-pointer"
                  onClick={handleSearchToggle}
                />
              )}
              {!isSearchOpen && <span className="text-lg">mpStationery</span>}
              <div className="flex-grow flex justify-end">
                {isSearchOpen && (
                  <label className="input flex items-center w-[85%]">
                    <svg
                      className="h-[1em] opacity-50 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </g>
                    </svg>
                    <input
                      type="search"
                      required
                      placeholder="Search for products, categories, etc."
                      aria-label="Search"
                      className="font-quicksand text-sm bg-transparent text-gray-900 dark:text-black-100 w-full px-1 py-1"
                    />
                  </label>
                )}
              </div>
              {!isSearchOpen && (
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-lg text-gray-600 cursor-pointer"
                  onClick={handleSearchToggle}
                />
              )}
            </div>
          </nav>

          <section className="w-full h-[300px] md:h-[568px] relative">
            <img
              src={wireframeImage1}
              alt="Wireframe 1"
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                isFirstImage ? "opacity-100" : "opacity-0"
              }`}
              style={{ filter: "brightness(0.8)" }}
            />
            <img
              src={wireframeImage2}
              alt="Wireframe 2"
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                isFirstImage ? "opacity-0" : "opacity-100"
              }`}
              style={{ filter: "brightness(0.8)" }}
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
              <div
                className={`w-[30px] md:w-[40px] h-[10px] md:h-[15px] rounded-[10px] transition-all duration-500 ${
                  isFirstImage ? "bg-[#F3F3F3]" : "bg-[#979999]"
                }`}
              ></div>
              <div
                className={`w-[30px] md:w-[40px] h-[10px] md:h-[15px] rounded-[10px] transition-all duration-500 ${
                  isFirstImage ? "bg-[#979999]" : "bg-[#F3F3F3]"
                }`}
              ></div>
            </div>
          </section>
        </div>
      ) : (
        <>
          <nav className="navbar h-[80px] shadow-sm font-quicksand relative z-20 transform transition-transform duration-700 px-4 md:px-8">
            <div className="flex-1">
              <a className="btn btn-ghost text-lg md:text-xl">mpStationery</a>
            </div>
            <div className="flex justify-center flex-1">
              <label className="input flex items-center w-full max-w-[400px] md:max-w-[700px]">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="search"
                  required
                  placeholder="Search for products, categories, etc."
                  aria-label="Search"
                  className="font-quicksand text-sm md:text-base bg-transparent text-gray-900 dark:text-black-100"
                />
              </label>
            </div>
            <div className="flex-1 flex justify-end items-center gap-4 md:gap-10">
              {[
                {
                  icon: faUser,
                  title: "Profile",
                  hoverColor: "hover:text-black",
                  onClick: handleLoginToggle, // Trigger login toggle
                },
                {
                  icon: faHeart,
                  title: "Wishlist",
                  hoverColor: "hover:text-red-500",
                },
                {
                  icon: faShoppingCart,
                  title: "Cart",
                  hoverColor: "hover:text-green-500",
                },
              ].map((item, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={item.icon}
                  className={`text-lg md:text-xl text-gray-600 cursor-pointer ${
                    item.hoverColor
                  } transition-opacity duration-500 delay-${index * 200}`}
                  title={item.title}
                  aria-label={item.title}
                  onClick={item.onClick}
                />
              ))}
            </div>
          </nav>

          <div
            className={`${
              isExpanded ? "h-[80px]" : "h-[13px]"
            } bg-[#141B3E] absolute top-[80px] left-0 w-full transition-all duration-300 shadow-lg z-10`}
          >
            <div
              className={`${
                isExpanded ? "flex" : "hidden"
              } justify-center items-center h-full text-white text-sm md:text-lg gap-6 md:gap-10`}
            >
              {[
                "Books",
                "Arts and Crafts",
                "Stationery",
                "Classroom Supplies",
                "Gifting",
                "Sports",
              ].map((item, index) => (
                <Link
                  key={index}
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:underline"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div
              className="absolute bottom-[-13px] left-1/2 transform -translate-x-1/2 w-[26px] h-[26px] bg-[#141B3E] rounded-full flex justify-center items-center cursor-pointer shadow-lg"
              onClick={handleToggle}
            >
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`text-white text-md relative top-[2px] transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          <section className="w-full h-[300px] md:h-[568px] relative">
            <img
              src={wireframeImage1}
              alt="Wireframe 1"
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                isFirstImage ? "opacity-100" : "opacity-0"
              }`}
              style={{ filter: "brightness(0.8)" }}
            />
            <img
              src={wireframeImage2}
              alt="Wireframe 2"
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                isFirstImage ? "opacity-0" : "opacity-100"
              }`}
              style={{ filter: "brightness(0.8)" }}
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
              <div
                className={`w-[30px] md:w-[40px] h-[10px] md:h-[15px] rounded-[10px] transition-all duration-500 ${
                  isFirstImage ? "bg-[#F3F3F3]" : "bg-[#979999]"
                }`}
              ></div>
              <div
                className={`w-[30px] md:w-[40px] h-[10px] md:h-[15px] rounded-[10px] transition-all duration-500 ${
                  isFirstImage ? "bg-[#979999]" : "bg-[#F3F3F3]"
                }`}
              ></div>
            </div>
          </section>
        </>
      )}
      {/* Pass handleLoginToggle to MobileMenu */}
      {isMobile && <MobileMenu handleLoginToggle={handleLoginToggle} />}
    </div>
  );
};

const MobileMenu = ({ handleLoginToggle }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 p-2">
      <div className="flex justify-around py-2">
        <div
          onClick={handleLoginToggle}
          className="flex flex-col items-center cursor-pointer"
        >
          <FontAwesomeIcon icon={faUser} className="text-lg text-gray-600" />
          <span className="text-xs text-gray-600">Profile</span>
        </div>
        <Link to="/categories" className="flex flex-col items-center">
          <FontAwesomeIcon icon={faThLarge} className="text-lg text-gray-600" />
          <span className="text-xs text-gray-600">Categories</span>
        </Link>
        <Link to="/" className="flex flex-col items-center">
          <FontAwesomeIcon icon={faHome} className="text-lg text-gray-600" />
          <span className="text-xs text-gray-600">Home</span>
        </Link>
        <Link to="/wishlist" className="flex flex-col items-center">
          <FontAwesomeIcon icon={faHeart} className="text-lg text-gray-600" />
          <span className="text-xs text-gray-600">Wishlist</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-lg text-gray-600"
          />
          <span className="text-xs text-gray-600">My cart</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
