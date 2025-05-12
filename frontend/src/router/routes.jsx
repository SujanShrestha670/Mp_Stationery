import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AppRoutes = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [showSignupToast, setShowSignupToast] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 500);
  }, []);

  // Effect to disable/enable scrolling when either Login or Signup is open
  useEffect(() => {
    if (isLoginOpen || isSignupOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }

    // Cleanup to ensure scrolling is re-enabled if component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoginOpen, isSignupOpen]);

  const handleLoginToggle = () => {
    setIsLoginOpen((prev) => !prev);
    setIsSignupOpen(false); // Ensure Signup is closed when Login toggles
  };

  const handleSwitchToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const handleClose = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    setShowSignupToast(false);
    setShowLoginToast(false); // Close any toast if open
  };

  const handleShowSignupToast = () => {
    setShowSignupToast(true);
    // Auto-close toast and switch to Login after 3 seconds
    setTimeout(() => {
      setShowSignupToast(false);
      handleSwitchToLogin();
    }, 3000);
  };

  const handleShowLoginToast = () => {
    setShowLoginToast(true);
    // Auto-close toast after 3 seconds (no form switch needed)
    setTimeout(() => {
      setShowLoginToast(false);
      handleClose(); // Close the modal after login toast
    }, 3000);
  };

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Router>
        {/* Apply blur effect instantly with smooth transition */}
        <div
          className={`${
            isLoginOpen || isSignupOpen ? "blur-sm" : ""
          } transition duration-300`}
        >
          <Header
            isLoginOpen={isLoginOpen}
            handleLoginToggle={handleLoginToggle}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
          <Footer
            title="mpStationery"
            description="A stationery shop for all your needs"
          />
        </div>
        {/* Login/Signup Overlay with smooth animation */}
        {(isLoginOpen || isSignupOpen) && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="transform transition-all duration-300 ease-in-out"
              style={{
                opacity: isLoginOpen || isSignupOpen ? 1 : 0,
                scale: isLoginOpen || isSignupOpen ? 1 : 0.95,
              }}
            >
              {isLoginOpen && (
                <Login
                  onClose={handleClose}
                  onSwitchToSignup={handleSwitchToSignup}
                  onLoginSuccess={handleShowLoginToast} // Pass login toast trigger
                />
              )}
              {isSignupOpen && (
                <Signup
                  onClose={handleClose}
                  onSwitchToLogin={handleSwitchToLogin}
                  onSignupSuccess={handleShowSignupToast}
                />
              )}
            </div>
          </div>
        )}
        {/* Signup Toast Notification */}
        {showSignupToast && (
          <div className="toast toast-end toast-bottom z-50 fixed">
            <div className="alert alert-success flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Registration successful, thank you for joining MpStationery!
                logging in.
              </span>
              <button
                onClick={() => {
                  setShowSignupToast(false);
                  handleSwitchToLogin(); // Manually close toast and switch to Login
                }}
                className="btn btn-sm btn-ghost"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )}
        {/* Login Toast Notification */}
        {showLoginToast && (
          <div className="toast toast-end toast-bottom z-50 fixed">
            <div className="alert alert-success flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Logged in successfully!</span>
              <button
                onClick={() => {
                  setShowLoginToast(false);
                  handleClose(); // Manually close toast and modal
                }}
                className="btn btn-sm btn-ghost"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )}
      </Router>
    </div>
  );
};

export default AppRoutes;
