import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ExpandableMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="hidden md:block">
      <div
        className={`${
          isExpanded ? "h-[80px]" : "h-[13px]"
        } bg-gray-800 absolute left-0 w-full transition-all duration-300 shadow-lg z-10`}
      >
        <div
          className={`${
            isExpanded ? "flex" : "hidden"
          } justify-center items-center h-full text-white text-xs sm:text-sm gap-4 sm:gap-6 md:gap-10`}
        >
          {["Books", "Stationery", "Gifts", "Sports"].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase()}`}
              className="hover:underline whitespace-nowrap"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Toggle Button */}
        <div
          className="absolute bottom-[-13px] left-1/2 transform -translate-x-1/2 w-[26px] h-[26px] bg-[#141B3E] rounded-full flex justify-center items-center cursor-pointer shadow-lg"
          onClick={handleToggle}
        >
          <FontAwesomeIcon
            icon={faCaretDown}
            className={`text-white text-sm relative top-[2px] transform transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpandableMenu;
