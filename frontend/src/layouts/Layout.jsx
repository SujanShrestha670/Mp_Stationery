import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExpandableMenu from "../components/ExpandableMenu";
import MobileMenu from "../components/MobileMenu.jsx";
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Verify from "../pages/auth/Verify.jsx";

const Layout = ({ children }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const modalRef = useRef(null);
  const [signupEmail, setSignupEmail] = useState(null);

  const handleLoginToggle = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
  };

  const closeModal = () => {
    setShowAuthModal(false);
  };

  const onOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (showAuthModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showAuthModal]);

  return (
    <>
      {/* Main content with optional blur */}
      <div
        className={`transition-filter duration-300 ${
          showAuthModal ? "filter blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <Header handleLoginToggle={handleLoginToggle} />
        <ExpandableMenu />
        <main>{children}</main>
        <Footer />
      </div>

      {/* MobileMenu always rendered, animate only on auth modal toggle */}
      <MobileMenu
        handleLoginToggle={handleLoginToggle}
        animateMenu={showAuthModal}
      />

      {/* Auth modal */}
      {showAuthModal && (
        <div
          onClick={onOverlayClick}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        >
          {authMode === "login" ? (
            <Login
              ref={modalRef}
              onSwitch={switchAuthMode}
              closeModal={closeModal}
            />
          ) : authMode === "signup" ? (
            <Signup
              ref={modalRef}
              onSwitch={switchAuthMode}
              closeModal={closeModal}
              onSignupSuccess={(email) => {
                setSignupEmail(email);
                setAuthMode("verify");
              }}
            />
          ) : (
            <Verify
              email={signupEmail}
              onVerifySuccess={() => {
                setAuthMode("login");
                setSignupEmail(null);
              }}
              closeModal={closeModal}
              onSwitch={switchAuthMode}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Layout;
