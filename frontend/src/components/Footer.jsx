import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white px-4 pt-10 pb-6 mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm bg-gray-700 rounded-lg p-6">
        <div>
          <h3 className="text-base font-semibold mb-3">Connect with us</h3>
          <div className="flex space-x-4">
            <FaFacebook className="text-2xl cursor-pointer hover:text-blue-500" />
            <FaInstagram className="text-2xl cursor-pointer hover:text-pink-500" />
            <FaWhatsapp className="text-2xl cursor-pointer hover:text-green-500" />
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-3">Reach Us</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <FaPhoneAlt className="text-lg" />
              <span>+977 9855038599</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaPhoneAlt className="text-lg" />
              <span>+977 9811197979</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-lg" />
              <span>mpbook123@gmail.com</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-3">Categories</h3>
          <ul className="space-y-1">
            <li>Books</li>
            <li>Stationery</li>
            <li>Gifts</li>
            <li>Sports</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-3">Helpdesk</h3>
          <ul className="space-y-1">
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms and Condition</li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-800 text-center text-xs text-gray-400 py-4">
        &copy; {new Date().getFullYear()} MpStationery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
