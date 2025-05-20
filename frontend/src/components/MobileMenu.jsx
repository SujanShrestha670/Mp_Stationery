import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faThLarge,
  faHome,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const MobileMenu = ({ handleLoginToggle, animateMenu }) => {
  const controls = useAnimation();

  useEffect(() => {
    const transitionConfig = {
      type: "spring",
      stiffness: 300, // higher stiffness for snappier animation
      damping: 30, // balanced damping for smooth stop
    };

    if (animateMenu) {
      controls.start({
        y: 30,
        opacity: 0,
        transition: transitionConfig,
      });
    } else {
      controls.start({
        y: 0,
        opacity: 1,
        transition: transitionConfig,
      });
    }
  }, [animateMenu, controls]);

  const menuItems = [
    {
      label: "Profile",
      icon: faUser,
      onClick: handleLoginToggle,
      isLink: false,
    },
    { label: "Categories", icon: faThLarge, to: "/categories", isLink: true },
    { label: "Home", icon: faHome, to: "/", isLink: true },
    { label: "Wishlist", icon: faHeart, to: "/wishlist", isLink: true },
    { label: "My cart", icon: faShoppingCart, to: "/addtocart", isLink: true },
  ];

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={controls}
      className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 p-2 md:hidden"
      style={{ pointerEvents: animateMenu ? "none" : "auto" }}
    >
      <div className="flex justify-around py-2">
        {menuItems.map((item, index) =>
          item.isLink ? (
            <Link
              to={item.to}
              key={index}
              className="flex flex-col items-center flex-1"
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-lg sm:text-xl text-gray-600"
              />
              <span className="text-[10px] sm:text-xs text-gray-600 mt-1">
                {item.label}
              </span>
            </Link>
          ) : (
            <div
              key={index}
              onClick={item.onClick}
              className="flex flex-col items-center flex-1 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-lg sm:text-xl text-gray-600"
              />
              <span className="text-[10px] sm:text-xs text-gray-600 mt-1">
                {item.label}
              </span>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
